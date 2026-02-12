const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/User");
const Restaurant = require("../../database/models/Restaurant");
const Branch = require("../../database/models/Branch");

exports.registerRestaurant = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { restaurantName, ownerName, email, password } = req.body;

    // Check email
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      throw new Error("Email already registered");
    }

    // 1. Create Owner
    const owner = new User({
      name: ownerName,
      email,
      password,
      role: "OWNER",
      restaurantId: null,
      accessibleBranches: []
    });

    await owner.save({ session });

    // 2. Create Restaurant
    const restaurant = new Restaurant({
      name: restaurantName,
      owner: owner._id,
      plan: "FREE"
    });

    await restaurant.save({ session });

    // 3. Link owner → restaurant
    owner.restaurantId = restaurant._id;
    await owner.save({ session });

    await session.commitTransaction();

    res.status(201).json({
      message: "Owner & Restaurant registered successfully",
      ownerId: owner._id,
      restaurantId: restaurant._id
    });

  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({
      message: "Registration failed",
      error: err.message
    });
  } finally {
    session.endSession();
  }
};

exports.createBranch = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { name, city, address } = req.body;
    const user = req.user;

    if (user.role !== "OWNER") {
      throw new Error("Only owner can create branches");
    }

    const restaurant = await Restaurant.findById(user.restaurantId).session(session);
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    const branchCount = await Branch.countDocuments({
      restaurantId: restaurant._id
    }).session(session);

    if (branchCount >= restaurant.maxBranches) {
      throw new Error("Branch limit reached for your plan");
    }

    const branch = new Branch({
      restaurantId: restaurant._id,
      branchCode: `${restaurant._id}-BR${branchCount + 1}`,
      name,
      city,
      address
    });

    await branch.save({ session });

    await session.commitTransaction();

    res.status(201).json({
      message: "Branch created successfully",
      branch
    });

  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({
      message: "Branch creation failed",
      error: err.message
    });
  } finally {
    session.endSession();
  }
};

const MAX_ATTEMPTS = 6;
const LOCK_TIME = 5 * 60 * 1000; // 5 minutes

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      await delay(500); // fake delay to avoid user enumeration
      throw new Error("User Not Found");
    }

    // 🔒 Account locked?
    if (user.lockUntil && user.lockUntil > Date.now()) {
      return res.status(423).json({
        message: "Account temporarily locked. Try again later."
      });
    }

    const isMatch = await user.comparePassword(password);

    // ❌ Wrong password
    if (!isMatch) {
      user.loginAttempts += 1;

      // 🐢 Slow down on 4–5 attempts
      if (user.loginAttempts >= 4 && user.loginAttempts <= 5) {
        await delay(3000); // 3 sec delay
      }

      // 🔐 Lock on 6th attempt
      if (user.loginAttempts >= MAX_ATTEMPTS) {
        user.lockUntil = Date.now() + LOCK_TIME;
      }

      await user.save();

      throw new Error("Invalid credentials");
    }

    // ✅ Correct password → reset counters
    user.loginAttempts = 0;
    user.lockUntil = null;
    await user.save();


    const hasMultipleBranches = user.accessibleBranches.length > 1;
const selectedBranch =
  user.accessibleBranches.length === 1 ? user.accessibleBranches[0] : null;

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        restaurantId: user.restaurantId,
        branchId: selectedBranch // null if multiple
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );


    res.json({
      message: "Login successful",
      token,
      requiresBranchSelection: hasMultipleBranches,
      branches: user.accessibleBranches,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        restaurantId: user.restaurantId,
      }
    });

    console.log(user.accessibleBranches);

  } catch (err) {
    res.status(401).json({
      message: "Login failed",
      error: err.message
    });
  }
};


exports.createUser = async (req, res) => {
  console.log("Create user attempt:", req.body);
  try {
    const { name, email, password, role, branchIds } = req.body;
    const admin = req.user;

    if (!["OWNER", "SUPERADMIN", "MANAGER"].includes(admin.role)) {
      return res.status(403).json({ message: "Permission denied" });
    }

    if (admin.role !== "OWNER" && role === "OWNER") {
      return res.status(403).json({ message: "Cannot assign OWNER role" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const branches = await Branch.find({
      _id: { $in: branchIds },
      restaurantId: admin.restaurantId
    });

    if (branches.length !== branchIds.length) {
      return res.status(400).json({ message: "Invalid branch selection" });
    }

    const user = new User({
      restaurantId: admin.restaurantId,
      name,
      email,
      password,
      role,
      accessibleBranches: branchIds
    });

    await user.save();

    const createdUser = await User.findById(user._id)
  .select("-password")
  .populate("accessibleBranches", "name");

res.status(201).json({
  message: "User created successfully",
  user: createdUser
});


  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({
      message: "User creation failed",
      error: err.message
    });
  }
};

exports.registerSuperAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const superadmin = await User.create({
      name,
      email,
      password,
      role: "SUPERADMIN",
      isActive: true
    });

    res.status(201).json({ message: "Superadmin created", user: superadmin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
