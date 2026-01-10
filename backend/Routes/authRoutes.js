// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin } = require('../Controllers/authController');
const { authenticateToken } = require('../utils/tokenUtils');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

router.get('/me', authenticateToken, (req, res) => {
  res.status(200).json({ admin: req.admin });
});

router.post('/logout', (req, res) => {
  res.clearCookie('token'); // Or whatever cookie you use
  return res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
