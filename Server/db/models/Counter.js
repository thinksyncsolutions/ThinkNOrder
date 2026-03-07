const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true
  },

  date: {
    type: String,
    required: true
  },

  orderCounter: {
    type: Number,
    default: 0
  }
});

counterSchema.index({ branchId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Counter", counterSchema);