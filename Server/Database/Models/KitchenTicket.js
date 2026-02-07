const kitchenTicketSchema = new mongoose.Schema({
  restaurantId: mongoose.Schema.Types.ObjectId,
  branchId: mongoose.Schema.Types.ObjectId,

  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true
  },

  orderSessionId: mongoose.Schema.Types.ObjectId,
  placeId: mongoose.Schema.Types.ObjectId,

  station: {
    type: String,
    enum: ["KITCHEN", "BAR", "DESSERT"]
  },

  items: [{
    itemId: mongoose.Schema.Types.ObjectId,
    name: String,
    qty: Number,
    size: String,
    notes: String
  }],

  status: {
    type: String,
    enum: ["PENDING", "ACCEPTED", "PREPARING", "READY", "SERVED"],
    default: "PENDING"
  }

}, { timestamps: true });
