const mongoose = require("mongoose");

const orderSessionSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
  },

  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true
  },

  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place",
    required: true
  },

  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date },

  isClosed: { type: Boolean, default: false },

  subtotal: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 }

}, { timestamps: true });

orderSessionSchema.index({ restaurantId: 1, branchId: 1, isClosed: 1 });

module.exports = mongoose.model("OrderSession", orderSessionSchema);