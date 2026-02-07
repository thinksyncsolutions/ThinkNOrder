// routes.js
const express = require("express");
const router = express.Router();

// const rateLimit = require("./middlewares/rateLimit");
const auth = require("./middleware/auth");

// module routes
const authRoutes = require("./modules/auth/auth.routes");
// const branchRoutes = require("./modules/branch/branch.routes");
// const orderRoutes = require("./modules/order/order.routes");
// const tableRoutes = require("./modules/table/table.routes");

// public
router.use("/auth", authRoutes);

// protected
// router.use("/branches", auth, branchRoutes);
// router.use("/orders", auth, orderRoutes);
// router.use("/tables", auth, tableRoutes);

module.exports = router;