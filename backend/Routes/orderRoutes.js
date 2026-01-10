const express = require("express");
const {
  createOrder,
  getOrdersByRestaurantId,
  changeOrderStatus,
  getTablesWithSessions,
  getSessionWithOrders,
  closeSession,
  getOrdersForKitchenByRestaurantId,
  getOrdersForTable,
} = require("../Controllers/orderController");
const { authenticateToken } = require("../utils/tokenUtils");

const router = express.Router();

router.post("/create-order",  createOrder);
router.post("/create-orderByAdminItself", authenticateToken, createOrder);

router.get("/get-orders", authenticateToken, getOrdersByRestaurantId);
router.patch("/change-status", authenticateToken, changeOrderStatus);
router.post("/close-session", authenticateToken, closeSession);
router.get(
  "/kitchen-orders",
  authenticateToken,
  getOrdersForKitchenByRestaurantId
);

router.get("/:tableId", authenticateToken, getOrdersForTable);

module.exports = router;
