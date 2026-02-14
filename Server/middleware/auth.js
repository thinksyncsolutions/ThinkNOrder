// middlewares/auth.js
const jwt = require("jsonwebtoken");
const User = require("../database/models/User");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Auth token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("role restaurantId isActive").lean();

    if (!user || !user.isActive) {
      return res.status(401).json({ message: "Invalid user" });
    }

    req.user = {
      id: user._id,
      role: user.role,
      restaurantId: user.restaurantId,
      branchId: decoded.branchId // from token, can be null
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};