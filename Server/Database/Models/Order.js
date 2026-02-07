const orderSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },

  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true
  },

  orderSessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderSession',
    required: true
  },

  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place',
    required: true
  },

  items: [{
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    name: String,          // snapshot
    size: String,
    qty: Number,
    price: Number
  }],

  status: {
    type: String,
    enum: [
      'PLACED',
      'ACCEPTED',
      'PREPARING',
      'READY',
      'SERVED',
      'CANCELLED'
    ],
    default: 'PLACED'
  }

}, { timestamps: true });

orderSchema.index({ restaurantId: 1, branchId: 1, createdAt: -1 });
orderSchema.index({ orderSessionId: 1 });
