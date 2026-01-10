const mongoose = require("mongoose");
const Order = require("../Databases/Models/orderSchema"); // adjust the path as needed
const Item = require("../Databases/Models/itemSchema");
const OrderSession = require("../Databases/Models/orderSessionSchema"); // adjust the path as needed
const Restaurant = require("../Databases/Models/restaurantSchema"); // to get place details

exports.createOrder = async (req, res) => {
  try {
    const { placeId, items } = req.body;

   const restaurantId = req.admin?.restaurantId?._id || req.body.restaurantId;

    if (!restaurantId || !items || items.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });

    const place = restaurant.places.id(placeId);
    if (!place) return res.status(404).json({ message: "Place not found" });

    const floor = place.floor;
    const table = `${place.type} ${place.number}`;

    // Build detailed items & calculate total
    const detailedItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const itemDoc = await Item.findById(item.itemId);

      if (!itemDoc) {
        return res
          .status(404)
          .json({ message: `Item not found: ${item.itemId}` });
      }

      // Get price for selected size
      const priceObj = itemDoc.prices.find((p) => p.size === item.size);

      if (!priceObj) {
        return res
          .status(400)
          .json({
            message: `Size '${item.size}' not found for item '${itemDoc.itemname}'`,
          });
      }

      const itemTotal = priceObj.price * item.quantity;
      totalAmount += itemTotal;

      detailedItems.push({
        itemId: itemDoc._id,
        itemname: itemDoc.itemname,
        selectedSize: item.size,
        quantity: item.quantity,
        price: priceObj.price,
      });
    }

    // ✅ Step 1: Check for existing open session
    let session = await OrderSession.findOne({
      placeId,
      restaurantId,
      isClosed: false,
    });

    // ✅ Step 2: Create session if not found
    if (!session) {
      session = await OrderSession.create({
        placeId,
        restaurantId,
        billingAmount: 0,
      });
    }

    const newOrder = await Order.create({
      orderSessionId: session._id,
      placeId,
      floor,
      table,
      restaurantId,
      items: detailedItems,
      totalAmount,
    });


   session.billAmount = Number(session.billAmount || 0) + Number(totalAmount || 0);
    await session.save();

    // ✅ Emit to admins via Socket.IO
    const io = req.app.get("io");
    const roomName = `restaurant:${restaurantId}`;

    io.to(roomName).emit("newOrder", {
      _id: newOrder._id,
      floor,
      table,
      restaurantId,
      items: detailedItems,
      totalAmount,
      status: newOrder.status || "Pending",
      createdAt: newOrder.createdAt,
    });

    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    console.error("Creating order error", error);
    res.status(500).json({ message: "Server error while creating order" });
  }
};

exports.getOrdersByRestaurantId = async (req, res) => {
  try {
    const restaurantId = req.admin.restaurantId;
    const orders = await Order.find({ restaurantId });

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this restaurant" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("Get Orders Error:", error);
    res.status(500).json({ message: "Server error while fetching orders" });
  }
};

exports.getOrdersForKitchenByRestaurantId = async (req, res) => {
  try {
    const restaurantId = req.admin.restaurantId;
    const orders = await Order.find({
      restaurantId,
      status: { $in: ["Pending", "Accepted"] },
    });

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this restaurant" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("Get Orders Error:", error);
    res.status(500).json({ message: "Server error while fetching orders" });
  }
};

exports.changeOrderStatus = async (req, res) => {
  try {
    const { orderId, newStatus } = req.body;

    if (!orderId || !newStatus) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = newStatus;
    await order.save();

    // Emit status change to admins via Socket.IO
    const io = req.app.get("io");
    const roomName = `restaurant:${order.restaurantId}`;

    io.to(roomName).emit("orderStatusChanged", {
      _id: order._id,
      status: newStatus,
    });

    res.status(200).json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error("Change Order Status Error:", error);
    res
      .status(500)
      .json({ message: "Server error while changing order status" });
  }
};

exports.getOrdersForTable = async (req, res) => {
  try {
    const { tableId } = req.params;
    const restaurantId = req.admin.restaurantId;

    // Step 1: Find active session for that table
    const session = await OrderSession.findOne({
      placeId: tableId,
      restaurantId,
      isClosed: false,
    });

    if (!session) {
      return res
        .status(404)
        .json({ message: "No Current Session found" });
    }

    // Step 2: Fetch orders belonging to that session
    const orders = await Order.find({
      orderSessionId: session._id,
      status: { $in: ["Delivered"] },
    }); // optional populate for item details

    res.status(200).json({ orders, message: "Orders fetched successfully" });
  } catch (error) {
    console.error("Error fetching orders for table:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// controllers/orderController.js
exports.closeSession = async (req, res) => {
  try {
    const { placeId, paymentMode } = req.body;
    const session = await OrderSession.findOne({ placeId, isClosed: false });
    if (!session) {
      return res.status(404).json({ message: "No open session found" });
    }

    const orders = await Order.find({ orderSessionId: session._id });
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
