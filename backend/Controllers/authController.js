// controllers/authController.js
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/tokenUtils');
const Admin = require('../Databases/Models/adminSchema');
const Restaurant = require('../Databases/Models/restaurantSchema');

// Register Controller
exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password, restaurantName, location, contactNumber } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists with this email" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword
    });

    // Create restaurant
    const restaurant = await Restaurant.create({
      name: restaurantName,
      location,
      contactNumber,
      adminId: admin._id
    });

    // Link restaurant to admin
    admin.restaurantId = restaurant._id;
    await admin.save();

    res.status(201).json({
      message: "Admin and Restaurant registered successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        restaurantId: restaurant._id
      }
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};



// Login Controller
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email }).populate('restaurantId', 'name');
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({ adminId: admin._id, restaurantId: admin.restaurantId });

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
    // secure: false,
      sameSite: 'None',
      maxAge: 2 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      message: "Login successful",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        restaurantId: admin.restaurantId._id,
        restaurantName: admin.restaurantId.name
      }
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
