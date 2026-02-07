const bcrypt = require("bcryptjs");
const Restaurant = require("../../database/models/Restaurent");
const User = require("../../database/models/User");
const Branch = require("../../database/models/Branch");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

exports.registerOwner = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { restaurantName, ownerName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Email already registered" });
    }

    // 1️⃣ Create Owner
    const owner = new User({
      name: ownerName,
      email,
      password,
      role: "OWNER",
      restaurantId: null,
      accessibleBranches: [],
    });
    await owner.save({ session });

    // 2️⃣ Create Restaurant
    const restaurant = new Restaurant({
      name: restaurantName,
      owner: owner._id,
      plan: "FREE",
    });
    await restaurant.save({ session });

    // 3️⃣ Link back
    owner.restaurantId = restaurant._id;
    await owner.save({ session });

    // 4️⃣ Commit
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Restaurant & Owner registered successfully",
      restaurantId: restaurant._id,
      ownerId: owner._id,
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
};

exports.createBranch = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, city, address } = req.body;
    const user = req.user;

    if (user.role !== "OWNER") {
      await session.abortTransaction();
      return res
        .status(403)
        .json({ message: "Only owner can create branches" });
    }

    const restaurant = await Restaurant.findById(user.restaurantId).session(
      session,
    );
    if (!restaurant) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const branchCount = await Branch.countDocuments({
      restaurantId: restaurant._id,
    }).session(session);

    if (branchCount >= restaurant.maxBranches) {
      await session.abortTransaction();
      return res.status(403).json({ message: "Branch limit reached" });
    }

    const branch = new Branch({
      restaurantId: restaurant._id,
      branchCode: `${restaurant._id}-BR${branchCount + 1}`,
      name,
      city,
      address,
    });

    await branch.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Branch created successfully",
      branch,
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res
      .status(500)
      .json({ message: "Failed to create branch", error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role, branchIds } = req.body;
    const admin = req.user;

    if (!["OWNER", "SUPERADMIN", "MANAGER"].includes(admin.role)) {
      return res.status(403).json({ message: "Permission denied" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Prevent role escalation
    if (admin.role !== "OWNER" && role === "OWNER") {
      return res.status(403).json({ message: "Cannot assign OWNER role" });
    }

    const branches = await Branch.find({
      _id: { $in: branchIds },
      restaurantId: admin.restaurantId,
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
      accessibleBranches: branchIds,
    });

    await user.save();

    res.status(201).json({
      message: "User created successfully",
      userId: user._id,
    });
  } catch (err) {
    res.status(500).json({ message: "User creation failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, isActive: true });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await user.comparePassword(password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        restaurantId: user.restaurantId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        role: user.role,
        restaurantId: user.restaurantId,
        branches: user.accessibleBranches,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};
