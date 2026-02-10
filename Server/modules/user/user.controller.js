const User = require("../../database/models/User");

exports.fetchUsers = async (req, res) => {
  try {
    const users = await User.find({ restaurantId: req.user.restaurantId, role: { $ne: "OWNER" } }).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to fetch users" });
  }
};

exports.fetchUsersByBranch = async (req, res) => {
  const { branchId } = req.params;
    try {
        const users = await User.find({ restaurantId: req.user.restaurantId, accessibleBranches: branchId }).select("-password");
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message || "Failed to fetch users by branch" });
    }
};