const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  restaurantId: mongoose.Schema.Types.ObjectId,
  branchId: mongoose.Schema.Types.ObjectId,

  itemName: String,
  unit: String,
  quantity: Number,
  minThreshold: Number
}, { timestamps: true });

InventorySchema.index({ restaurantId: 1, branchId: 1, itemName: 1 }, { unique: true });

module.exports = mongoose.model("Inventory", InventorySchema);
