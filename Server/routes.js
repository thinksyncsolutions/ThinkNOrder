// routes.js
const express = require("express");
const router = express.Router();

// const rateLimit = require("./middlewares/rateLimit");
const auth = require("./middleware/auth");


// public
router.use("/auth", require("./modules/auth/auth.routes"));

// protected
router.use("/", require("./modules/branch/branch.routes"));
router.use("/", require("./modules/user/user.route"));
router.use("/menu", require("./modules/menu/menu.routes"));
router.use("/places", require("./modules/place/place.routes"));
router.use("/orders", require("./modules/orders/orders.routes"));
// router.use("/tables", auth, tableRoutes);

module.exports = router;