const mongoose = require("mongoose");

const orderSessionSchema = new mongoose.Schema({

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

  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },

  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date },

  isClosed: { type: Boolean, default: false, index: true },

  subtotal: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  billAmount: { type: Number, default: 0 },

  paymentMode: {
    type: String,
    enum: ["Cash", "UPI", "Card"]
  },

  paid: { type: Boolean, default: false }

}, { timestamps: true });

orderSessionSchema.index({ restaurantId: 1, branchId: 1, isClosed: 1 });

module.exports = mongoose.model("OrderSession", orderSessionSchema);