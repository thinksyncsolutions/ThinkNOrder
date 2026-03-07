const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({

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

  phone: {
    type: String,
    required: true,
    match: [/^[6-9]\d{9}$/, "Invalid phone number"]
  },

  name: {
    type: String,
    default: null
  },

  totalUdhar: {
    type: Number,
    default: 0
  },

  totalOrders: {
    type: Number,
    default: 0
  },

  totalSpent: {
    type: Number,
    default: 0
  },
  lastVisit: {
  type: Date,
  default: Date.now
}

}, { timestamps: true });


CustomerSchema.index(
  { branchId: 1, phone: 1 },
  { unique: true }
);

module.exports = mongoose.model("Customer", CustomerSchema);