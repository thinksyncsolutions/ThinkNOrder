const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    default: null
  },

  accessibleBranches: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch"
  }],

  name: String,
  email: { type: String, required: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["OWNER", "SUPERADMIN", "MANAGER", "CASHIER", "WAITER", "KITCHEN", "GUARD"],
    required: true
  },

  isActive: { type: Boolean, default: true }
}, { timestamps: true });

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


UserSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);