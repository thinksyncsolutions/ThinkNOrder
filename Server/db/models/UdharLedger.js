const UdharLedgerSchema = new mongoose.Schema({

  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
    index: true
  },

  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
    index: true
  },

  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
    index: true
  },

  orderSessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OrderSession",
    required: true,
    index: true
  },

  amount: {
    type: Number,
    required: true
  },

  paidAmount: {
    type: Number,
    default: 0
  },

  remainingAmount: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["Pending", "Partial", "Paid"],
    default: "Pending",
    index: true
  }

}, { timestamps: true });

UdharLedgerSchema.index({ restaurantId: 1, branchId: 1, status: 1 });

module.exports = mongoose.model("UdharLedger", UdharLedgerSchema);