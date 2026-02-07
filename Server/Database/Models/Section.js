const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
  },

  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch" // null = shared across branches
  },

  name: { type: String, required: true },
  image: String,

  order: Number, // for sorting
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

sectionSchema.index({ restaurantId: 1, branchId: 1 });

module.exports = mongoose.model("Section", sectionSchema);
