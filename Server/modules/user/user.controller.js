const User = require("../../database/models/User");

exports.createUserByManager = async (req, res) => {
  const { name, email, role } = req.body;
  try {
    const user = new User({
      name,
      email,
      password:"123456789",
      role,
      accessibleBranches: req.user.branchId,
      restaurantId: req.user.restaurantId,
    });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message || "Failed to create user" });
  }
};

exports.fetchUsers = async (req, res) => {
  try {
    const users = await User.find({
      restaurantId: req.user.restaurantId,
      role: { $ne: "OWNER" },
    }).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to fetch users" });
  }
};

exports.fetchUsersByBranch = async (req, res) => {
  const { branchId } = req.params;
  try {
    const users = await User.find({
      restaurantId: req.user.restaurantId,
      accessibleBranches: branchId,
    }).select("-password");
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message || "Failed to fetch users by branch" });
  }
};

exports.fetchUsersByBranchManager = async (req, res) => {
  const branchId = req.user.branchId;
  try {
    const users = await User.find({
      restaurantId: req.user.restaurantId,
      accessibleBranches: branchId,
      role: { $ne: "MANAGER" },
    }).select("-password");
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message || "Failed to fetch users by branch" });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role, branchIds, isActive } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, role, accessibleBranches: branchIds, isActive },
      { new: true },
    ).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to update user" });
  }
};

exports.updateUserByManager = async (req, res) => {
  const { id } = req.params;
  const { name, email, role, isActive } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { _id: id, restaurantId: req.user.restaurantId },
      { name, email, role, isActive },
      { new: true },
    ).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to update user" });
  }
};

exports.deleteUserByManager = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOneAndDelete({ _id: id, restaurantId: req.user.restaurantId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to delete user" });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to delete user" });
  }
};
