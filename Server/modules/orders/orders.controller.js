const mongoose = require("mongoose");
const Order = require("../../db/models/Order"); // adjust the path as needed
const Item = require("../../db/models/Item"); // to get item details
const OrderSession = require("../../db/models/OrderSession"); // adjust the path as needed
const Restaurant = require("../../db/models/Restaurant"); // to get place details
const Branch = require("../../db/models/Branch"); // to get branch details

const getBranchRoom = (restaurantId, branchId) => `restaurant:${restaurantId}:branch:${branchId}`;

exports.createOrder = async (req, res) => {
  console.log("Create Order Request Body:", req.body); // Debug log
  console.log("Authenticated User:", req.user); // Debug log
  try {
    const { placeId, items } = req.body;
    const { restaurantId, branchId } = req.user || req.body;

    if (!restaurantId || !branchId || !placeId || !items?.length) {
      console.warn("Missing required fields:", { restaurantId, branchId, placeId, items });
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 1️⃣ Find or create active session for THAT branch
    let session = await OrderSession.findOne({
      restaurantId,
      branchId,
      placeId,
      isClosed: false
    });


    if (!session) {
      session = await OrderSession.create({
        restaurantId,
        branchId,
        placeId
      });
    }

    let totalAmount = 0;
    const detailedItems = [];

    const itemIds = items.map(i => i.itemId);

const itemDocs = await Item.find({ _id: { $in: itemIds } });

const itemMap = {};
itemDocs.forEach(doc => {
  itemMap[doc._id.toString()] = doc;
});

    for (const item of items) {
      const itemDoc = itemMap[item.itemId];
      if (!itemDoc) {
        return res.status(404).json({ message: "Item not found" });
      }

      const priceObj = itemDoc.prices.find(p => p.label === item.size);
      if (!priceObj) {
        return res.status(400).json({ message: "Invalid size selected" });
      }

      const itemTotal = priceObj.price * item.quantity;
      totalAmount += itemTotal;

      detailedItems.push({
        itemId: itemDoc._id,
        itemname: itemDoc.name,
        selectedSize: item.size,
        quantity: item.quantity,
        price: priceObj.price
      });

    }

    const order = await Order.create({
      restaurantId,
      branchId,
      orderSessionId: session._id,
      placeId,
      items: detailedItems,
      totalAmount
    });

    // Update session totals
    session.subtotal += totalAmount;
    session.billAmount = session.subtotal + session.tax - session.discount;
    await session.save();

    // 🔥 Emit only to THAT branch
    const io = req.app.get("io");
    io.to(getBranchRoom(restaurantId, branchId))
      .emit("newOrder", order);

    res.status(201).json({
      message: "Order created successfully",
      order
    });
console.log("Order created successfully:", order); // Debug log
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while creating order" });
  }
};

exports.getOrdersByBranch = async (req, res) => {
  try {
    const { restaurantId, branchId } = req.user;

    const orders = await Order.find({
      restaurantId,
      branchId
    }).sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    res.status(500).json({ message: "Server error while fetching orders" });
  }
};

exports.getOrdersForKitchen = async (req, res) => {
  try {
    const restaurantId = req.user.restaurantId;
    const branchId = req.user.branchId;


    const orders = await Order.find({
      restaurantId,
      branchId,
      status: { $in: ["Pending", "Accepted", "Preparing", "Ready", "Cancelled"] }
    }).sort({ createdAt: 1 });

    // 🔥 Important: do NOT return 404 for empty list
    // Kitchen dashboard should receive []

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching orders"
    });
  }
};

exports.changeOrderStatus = async (req, res) => {
  console.log("Change Order Status Request Body:", req.body); // Debug log
  try {
    const { orderId, newStatus } = req.body;

    const restaurantId = req.user.restaurantId;
    const branchId = req.user.branchId;

    if (!orderId || !newStatus) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    const allowedStatuses = [
      "Pending",
      "Accepted",
      "Preparing",
      "Ready",
      "Served",
      "Cancelled"
    ];

    if (!allowedStatuses.includes(newStatus)) {
      return res.status(400).json({
        message: "Invalid status value"
      });
    }

    // 🔥 Branch + restaurant validation
    const order = await Order.findOne({
      _id: orderId,
      restaurantId,
      branchId
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    order.status = newStatus;
    await order.save();

    // 🔥 Emit only to THAT branch
    const io = req.app.get("io");

    const roomName = getBranchRoom(restaurantId, branchId);

    // io.to(roomName).emit("orderStatusChanged", {
    //   _id: order._id,
    //   status: newStatus
    // });

    io.to(roomName).emit("orderStatusChanged", order);

    res.status(200).json({
      message: "Order status updated successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error while changing order status"
    });
  }
};


exports.getOrdersForTable = async (req, res) => {
  try {
    const { tableId } = req.params;

    const restaurantId = req.user.restaurantId;
    const branchId = req.user.branchId;

    // 1️⃣ Find active session for this branch + table
    const session = await OrderSession.findOne({
      placeId: tableId,
      restaurantId,
      branchId,
      isClosed: false
    });

    if (!session) {
      return res.status(200).json({
        orders: [],
        message: "No active session"
      });
    }

    // 2️⃣ Get served orders for billing view
    const orders = await Order.find({
      orderSessionId: session._id,
      restaurantId,
      branchId,
      status: "Served"
    }).sort({ createdAt: 1 });

    console.log(`Fetched ${orders.length} orders for table ${tableId}`); // Debug log

    res.status(200).json({
      orders,
      message: "Orders fetched successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal server error"
    });
  }
};

// controllers/orderController.js
exports.closeSession = async (req, res) => {
  try {
    const { restaurantId, branchId } = req.user;
    const { placeId, paymentMode } = req.body;
    const session = await OrderSession.findOne({ placeId, restaurantId, branchId, isClosed: false });
    if (!session) {
      return res.status(404).json({ message: "No open session found" });
    }

    const orders = await Order.find({ orderSessionId: session._id, status: "Served", restaurantId, branchId });
    const billAmount = orders.reduce((sum, o) => sum + o.totalAmount, 0);

    session.billAmount = billAmount;
    session.isClosed = true;
    session.endedAt = new Date();
    session.paid = true;
    session.paymentMode = paymentMode;

    await session.save();

    res.status(200).json({ message: "Session closed", session });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
