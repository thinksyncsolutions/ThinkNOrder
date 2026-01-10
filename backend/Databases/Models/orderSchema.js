const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
   orderSessionId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'OrderSession', 
    required: true 
  },
  placeId: { type: mongoose.Schema.Types.ObjectId },
  floor: { type: String }, // e.g., "Ground Floor"
  table: { type: String }, // e.g., "Table 1"
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  items: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true }, // for reference
      itemname: { type: String, required: true },     // snapshot
      selectedSize: { type: String, required: true }, // e.g., 'full', 'regular'
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }         // 💥 secure actual price from backend
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Accepted', 'Delivered'], 
    default: 'Pending' 
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
