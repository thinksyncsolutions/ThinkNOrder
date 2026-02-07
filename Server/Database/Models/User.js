const UserSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
  },

  accessibleBranches: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch"
  }],

  name: String,
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },

  role: {
    type: String,
    enum: ["OWNER", "SUPERADMIN", "MANAGER", "CASHIER", "WAITER", "KITCHEN", "GUARD"],
    required: true
  },

  isActive: { type: Boolean, default: true }
}, { timestamps: true });
