// middlewares/checkRole.js
exports.checkOwner = (req, res, next) => {
  if (req.user.role !== "OWNER") {
    return res.status(403).json({ message: "Owner access only" });
  }
  next();
};

exports.checkManagerOrOwner = (req, res, next) => {
  if (!["OWNER", "MANAGER"].includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

exports.checkStaff = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Permission denied" });
    }
    next();
  };
};