// routes.js
const express = require("express");
const router = express.Router();

// const rateLimit = require("./middlewares/rateLimit");
const auth = require("./middleware/auth");


// public
router.use("/auth", require("./modules/auth/auth.routes"));

// protected
// router.use("/branches", auth, branchRoutes);
// router.use("/orders", auth, orderRoutes);
// router.use("/tables", auth, tableRoutes);

module.exports = router;