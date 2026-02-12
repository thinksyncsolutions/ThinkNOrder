const Branch = require("../../database/models/Branch");
const User = require("../../database/models/User");

exports.fetchBranches = async (req, res) => {
    console.log("Fetching branches for restaurant:", req.user.restaurantId);
  try {
    const branches = await Branch.find({ restaurantId: req.user.restaurantId });
    res.json(branches);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to fetch branches" });
  }
};

exports.selectBranch = async (req, res) => {
  try {
    const { branchId } = req.body;
    const userId = req.user.id; // from auth middleware

    const user = await User.findById(userId);

    if (!user.accessibleBranches.includes(branchId)) {
      return res.status(403).json({ message: "Unauthorized branch" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        restaurantId: user.restaurantId,
        branchId: branchId
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Branch selected",
      token,
      branchId
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
