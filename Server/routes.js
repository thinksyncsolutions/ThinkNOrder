// routes.js
const express = require("express");
const router = express.Router();

// const rateLimit = require("./middlewares/rateLimit");
const auth = require("./middleware/auth");


// public
router.use("/auth", require("./modules/auth/auth.routes"));

// protected
router.use("/", auth, require("./modules/branch/branch.routes"));
router.use("/", auth, require("./modules/user/user.route"));
router.use("/menu", auth, require("./modules/menu/menu.routes"));
router.use("/places", auth, require("./modules/place/place.routes"));
router.use("/orders", auth, require("./modules/orders/orders.routes"));
// router.use("/tables", auth, tableRoutes);

module.exports = router;