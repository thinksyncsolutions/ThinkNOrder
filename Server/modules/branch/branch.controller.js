const Branch = require("../../db/models/Branch");
const User = require("../../db/models/User");
const jwt = require("jsonwebtoken");

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
    console.log(branchId)
    const userId = req.user.id;

    const user = await User.findById(userId).populate("restaurantId", "name");
    const branch = await Branch.findById(branchId);

    if (!user.accessibleBranches.includes(branchId)) {
      return res.status(403).json({ message: "Unauthorized branch" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        restaurantId: user.restaurantId,
        branchId: branchId,
        branchName: branch.name
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Branch selected",
      token,
      branchId,
      branchName: branch.name,
      restaurantName: user.restaurantId.name
    });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
