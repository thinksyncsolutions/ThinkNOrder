const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  restaurantId: mongoose.Schema.Types.ObjectId,
  branchId: mongoose.Schema.Types.ObjectId,
  orderSessionId: mongoose.Schema.Types.ObjectId,

  amount: Number,

  method: {
    type: String,
    enum: ['CASH', 'UPI', 'CARD']
  },

  status: {
    type: String,
    enum: ['PENDING', 'PAID', 'FAILED'],
    default: 'PENDING'
  },

  transactionId: String
}, { timestamps: true });

paymentSchema.index({ restaurantId: 1, branchId: 1, orderSessionId: 1 });

module.exports = mongoose.model("Payment", paymentSchema);
 