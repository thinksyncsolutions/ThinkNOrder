const InventorySchema = new mongoose.Schema({
  restaurantId: mongoose.Schema.Types.ObjectId,
  branchId: mongoose.Schema.Types.ObjectId,

  itemName: String,
  unit: String,
  quantity: Number,
  minThreshold: Number
}, { timestamps: true });
