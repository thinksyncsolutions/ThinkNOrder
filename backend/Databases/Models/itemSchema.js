const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemname: { type: String, required: true },
  image: { type: String },
  prices: [
    {
      size: { type: String, required: true, default: 'default' },  // e.g., "regular", "medium", "full","half"
      price: { type: Number, required: true }
    }
  ],
  sectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true },
  menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true }
}, { timestamps: true });

itemSchema.index({ restaurantId: 1 });
itemSchema.index({ menuId: 1 });
itemSchema.index({ sectionId: 1 });

module.exports = mongoose.model('Item', itemSchema);



