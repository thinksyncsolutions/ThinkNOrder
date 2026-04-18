const mongoose = require("mongoose");
const { getIO } = require("../../socket/socket"); // Import the helpe
const Order = require("../../db/models/Order"); // adjust the path as needed
const Item = require("../../db/models/Item"); // to get item details
const OrderSession = require("../../db/models/OrderSession"); // adjust the path as needed
const Restaurant = require("../../db/models/Restaurant"); // to get place details
const Branch = require("../../db/models/Branch"); // to get branch details
const Customer = require("../../db/models/Customer"); // to get customer details
const Counter = require("../../db/models/Counter"); // for order number generation
const Place = require("../../db/models/Place"); // to update place status

// Helper for rooms
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

       await Place.findOneAndUpdate(
    { _id: placeId, restaurantId, branchId },
    { status: "OCCUPIED" }
  );
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

    // Generate sequential order number
const today = new Date().toISOString().slice(0, 10);

const counter = await Counter.findOneAndUpdate(
  { branchId, date: today },
  { $inc: { orderCounter: 1 } },
  { new: true, upsert: true }
);

const orderNumber = counter.orderCounter;

    const order = await Order.create({
      restaurantId,
      orderNumber,
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
    const io = getIO();
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
    console.log("Order found for status change:", order); // Debug log

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    order.status = newStatus;
    await order.save();

    // 🔥 Emit only to THAT branch
    const io = getIO();

    const roomName = getBranchRoom(restaurantId, branchId);

    io.to(roomName).emit("orderStatusChanged", {
      orderId: order._id,
      status: order.status,
    });

    // io.to(roomName).emit("orderStatusChanged", order);
     console.log("✅ User joined room:", roomName);

    res.status(200).json({
      message: "Order status updated successfully"
    });

  } catch (error) {
    console.error(error);
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

exports.closeSession = async (req, res) => {
  try {
    const { restaurantId, branchId } = req.user;
    const { placeId, paymentMode, customerName, customerPhone } = req.body;

    // 1. Validation
    if (!customerPhone || !/^[6-9]\d{9}$/.test(customerPhone)) {
      return res.status(400).json({ message: "Valid 10-digit phone number is required" });
    }

    // 2. Find Active Session
    const session = await OrderSession.findOne({
      placeId,
      restaurantId,
      branchId,
      isClosed: false
    });

    if (!session) {
      return res.status(404).json({ message: "No open session found" });
    }

    // 3. Get all Served orders
    const orders = await Order.find({
      orderSessionId: session._id,
      status: "Served",
      restaurantId,
      branchId
    });

    // --- CALCULATION LOGIC (THE FIX) ---
    const subtotal = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const taxRate = 0.18; // You can also fetch this from branch settings later
    const tax = subtotal * taxRate;
    const finalBillAmount = subtotal + tax;
    // ------------------------------------

    // 4. Handle Customer Logic
    let customer = await Customer.findOne({ restaurantId, branchId, phone: customerPhone });

    if (!customer) {
      customer = await Customer.create({
        restaurantId,
        branchId,
        phone: customerPhone,
        name: customerName || null,
        totalOrders: 1,
        totalSpent: finalBillAmount,
      });
    } else {
      customer.totalOrders += 1;
      customer.totalSpent += finalBillAmount;
      customer.lastVisit = new Date();
      if (customerName && !customer.name) customer.name = customerName;
      await customer.save();
    }

    // 5. Update Session with separate Subtotal, Tax, and BillAmount
    session.customerId = customer._id;
    session.subtotal = subtotal;   // Added
    session.tax = tax;             // Added
    session.billAmount = finalBillAmount; 
    session.isClosed = true;
    session.endedAt = new Date();
    session.paid = paymentMode !== "Pay Later";
    session.paymentMode = paymentMode;

    await session.save();

    // 6. Reset Table Status
    await Place.findOneAndUpdate(
      { _id: placeId, restaurantId, branchId },
      { status: "AVAILABLE" }
    );

    res.status(200).json({
      message: "Session closed successfully",
      session,
      customer
    });

  } catch (err) {
    console.error("Close Session Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// exports.closeSession = async (req, res) => {
//   console.log("Close Session Request Body:", req.body); // Debug log
//   console.log(req.user);
//   try {
//     const { restaurantId, branchId } = req.user;
//     const { placeId, paymentMode, customerName, customerPhone } = req.body;

//     if (!customerPhone) {
//       return res.status(400).json({
//         message: "Customer phone number is required"
//       });
//     }

//     if (!/^[6-9]\d{9}$/.test(customerPhone)) {
//       return res.status(400).json({
//         message: "Invalid phone number"
//       });
//     }

//     const session = await OrderSession.findOne({
//       placeId,
//       restaurantId,
//       branchId,
//       isClosed: false
//     });

//     if (!session) {
//       return res.status(404).json({ message: "No open session found" });
//     }

//     const orders = await Order.find({
//       orderSessionId: session._id,
//       status: "Served",
//       restaurantId,
//       branchId
//     });

//     const billAmount = orders.reduce((sum, o) => sum + o.totalAmount, 0);

//     let customer = null;

//     // 🔹 Create or update customer
//     if (customerPhone) {
//       customer = await Customer.findOne({
//         restaurantId,
//         branchId,
//         phone: customerPhone
//       });

//       if (!customer) {
//         customer = await Customer.create({
//           restaurantId,
//           branchId,
//           phone: customerPhone,
//           name: customerName || null,
//           totalOrders: 1,
//           totalSpent: billAmount,
//         });
//       } else {
//         customer.totalOrders += 1;
//         customer.totalSpent += billAmount;
//         customer.lastVisit = new Date();

//         if (customerName && !customer.name) {
//           customer.name = customerName;
//         }

//         await customer.save();
//       }

//       // attach customer to session
//       session.customerId = customer._id;
//     }

//     session.billAmount = billAmount;
//     session.isClosed = true;
//     session.endedAt = new Date();
//     session.paid = true;
//     session.paymentMode = paymentMode;

//     await session.save();

//       await Place.findOneAndUpdate(
//     { _id: placeId, restaurantId, branchId },
//     { status: "AVAILABLE" }
//   );

//     res.status(200).json({
//       message: "Session closed",
//       session,
//       customer
//     });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.closeSession = async (req, res) => {
//   try {
//     const { restaurantId, branchId } = req.user;
//     const { placeId, paymentMode, customerName, customerPhone } = req.body;
//     const session = await OrderSession.findOne({ placeId, restaurantId, branchId, isClosed: false });
//     if (!session) {
//       return res.status(404).json({ message: "No open session found" });
//     }

//     const orders = await Order.find({ orderSessionId: session._id, status: "Served", restaurantId, branchId });
//     const billAmount = orders.reduce((sum, o) => sum + o.totalAmount, 0);

//     session.billAmount = billAmount;
//     session.isClosed = true;
//     session.endedAt = new Date();
//     session.paid = true;
//     session.paymentMode = paymentMode;

//     await session.save();

//     res.status(200).json({ message: "Session closed", session });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
