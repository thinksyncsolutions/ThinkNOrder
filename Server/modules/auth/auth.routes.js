// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const auth = require('../../middleware/auth');

router.post('/register-owner', authController.registerOwner);
router.post('/login', authController.login);
router.post('/create-branch',auth, authController.createBranch);
router.post('/create-user', authController.createUser);

module.exports = router;

    