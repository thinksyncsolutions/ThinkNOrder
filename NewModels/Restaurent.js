const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  logo: String,
  plan: {
    type: String,
    enum: ["FREE", "STARTER", "GROWTH", "ENTERPRISE"],
    default: "FREE"
  },
  
  maxBranches: { type: Number, default: 1 },

  isActive: { type: Boolean, default: true }
}, { timestamps: true });
