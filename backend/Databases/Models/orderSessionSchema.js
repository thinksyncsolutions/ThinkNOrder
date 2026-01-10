// models/OrderSession.js
const mongoose = require("mongoose");

const orderSessionSchema = new mongoose.Schema({
  placeId: { type: mongoose.Schema.Types.ObjectId },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date },
  isClosed: { type: Boolean, default: false },
  billAmount: Number,
  paymentMode: { type: String, enum: ["Cash", "UPI", "Card"], default: "Cash" },
  paid: { type: Boolean, default: false },
});

module.exports = mongoose.model("OrderSession", orderSessionSchema);
