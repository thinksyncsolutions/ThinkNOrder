const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "yoursecretkey";

// Generate Token
const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '2d' });
};

const authenticateToken = (req, res, next) => {
  const token =
    req.cookies?.token
    // ||
    // req.headers['authorization']?.split(' ')[1]; // ← extract token from "Bearer <token>"

  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = {
  generateToken,
  authenticateToken
};
