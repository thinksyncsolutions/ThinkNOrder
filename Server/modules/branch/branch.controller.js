const Branch = require("../../database/models/Branch");

exports.fetchBranches = async (req, res) => {
    console.log("Fetching branches for restaurant:", req.user.restaurantId);
  try {
    const branches = await Branch.find({ restaurantId: req.user.restaurantId });
    res.json(branches);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to fetch branches" });
  }
};