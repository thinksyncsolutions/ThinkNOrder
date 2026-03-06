const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
  },
  branchCode: { type: String, required: true }, // THINKNORDER123-BR1
  name: { type: String, required: true },
  city: String,
  address: String,
  coordinates: [Number], // [longitude, latitude]
  isOpen: { type: Boolean, default: true },
  timezone: { type: String, default: "Asia/Kolkata" },
  currency: { type: String, default: "INR" },

  isActive: { type: Boolean, default: true }
}, { timestamps: true });

BranchSchema.index({ restaurantId: 1, branchCode: 1 }, { unique: true });

module.exports = mongoose.model("Branch", BranchSchema);