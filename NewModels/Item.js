const itemSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
  },

  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch"
  },

  sectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section",
    required: true
  },

  name: { type: String, required: true },
  image: String,
  description: String,

  prices: [{
    label: { type: String, default: "default" }, // half/full/regular
    price: { type: Number, required: true }
  }],

  isVeg: Boolean,
  isAvailable: { type: Boolean, default: true },

  preparationTime: Number // minutes
}, { timestamps: true });

itemSchema.index({ restaurantId: 1, branchId: 1 });
itemSchema.index({ sectionId: 1 });
