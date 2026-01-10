  const mongoose = require('mongoose');

  const sectionSchema = new mongoose.Schema({
    sectionname: { type: String, required: true },
    sectionImage: { type: String },
    menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
  }, { timestamps: true });

  sectionSchema.index({ restaurantId: 1 });
  sectionSchema.index({ menuId: 1 });


  module.exports = mongoose.model('Section', sectionSchema);
