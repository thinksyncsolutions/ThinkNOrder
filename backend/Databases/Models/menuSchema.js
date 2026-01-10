const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }]
}, { timestamps: true });

menuSchema.index({ restaurantId: 1 });

module.exports = mongoose.model('Menu', menuSchema);
