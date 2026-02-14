const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
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

  type: {
    type: String,
    enum: ["TABLE", "ROOM", "COUNTER", "DOME"],
    required: true
  },

  number: { type: Number, required: true },

  floor: {
    type: String,
    enum: [
      "Ground Floor",
      "First Floor",
      "Second Floor",
      "Third Floor",
      "Fourth Floor",
      "Fifth Floor",
    ],
    required: true,
  },

  capacity: { type: Number, default: 4 },

  status: {
    type: String,
    enum: ["AVAILABLE", "OCCUPIED", "RESERVED"],
    default: "AVAILABLE",
  },

  qrCodeUrl: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

placeSchema.index({ restaurantId: 1, branchId: 1, floor: 1, type: 1, number: 1 }, { unique: true });

module.exports = mongoose.model("Place", placeSchema);
