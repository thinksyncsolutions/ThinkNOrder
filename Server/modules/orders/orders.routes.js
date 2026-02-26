const express = require("express");
const ctrl = require("./orders.controller");
const auth = require("../../middleware/auth");

const router = express.Router();

router.post("/create-order",  ctrl.createOrder);
router.post("/create-orderByAdminItself", auth, ctrl.createOrder);

router.get("/get-orders", auth, ctrl.getOrdersByBranch);
router.patch("/change-status", auth, ctrl.changeOrderStatus);
router.post("/close-session", auth, ctrl.closeSession);
router.get(
  "/kitchen-orders",
  auth,
  ctrl.getOrdersForKitchen
);

router.get("/:tableId", auth, ctrl.getOrdersForTable);

module.exports = router;
