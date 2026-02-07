// middlewares/checkBranchAccess.js
module.exports = (req, res, next) => {
  const branchId =
    req.params.branchId ||
    req.body.branchId ||
    req.query.branchId;

  if (!branchId) {
    return res.status(400).json({ message: "BranchId required" });
  }

  if (
    req.user.role !== "OWNER" &&
    !req.user.accessibleBranches
      .map(id => id.toString())
      .includes(branchId)
  ) {
    return res.status(403).json({ message: "No access to this branch" });
  }

  req.branchId = branchId;
  next();
};