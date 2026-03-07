const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
    index: true
  },

  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
    index: true
  },

   customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    default: null
  },

  orderSessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OrderSession",
    required: true,
    index: true
  },

  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },

  floor: String,
  table: String,

  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true
      },
      itemname: { type: String, required: true },
      selectedSize: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true, min: 0 },
//       status: {
//  type: String,
//  enum: ["Pending","Preparing","Ready","Served"],
//  default: "Pending"
// }
    }
  ],

  totalAmount: { type: Number, required: true },

  status: {
    type: String,
    enum: [
      "Pending",
      "Accepted",
      "Preparing",
      "Ready",
      "Served",
      "Cancelled"
    ],
    default: "Pending",
    index: true
  },
  orderNumber: {
  type: Number,
  required: true,
  index: true
},

}, { timestamps: true });

orderSchema.index({ restaurantId: 1, branchId: 1, createdAt: -1 });

module.exports = mongoose.model("Order", orderSchema);