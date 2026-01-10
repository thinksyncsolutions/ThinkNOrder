const mongoose = require('mongoose');

// Admi n schema for restaurant management
const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema);