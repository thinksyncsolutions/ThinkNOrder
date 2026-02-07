// item.controller.js
const Item = require("../../database/models/Item");

exports.createItem = async (req, res, next) => {
  try {
    const { name, image, description, prices, sectionId, branchId, isVeg, preparationTime } = req.body;

    const item = new Item({
      name,
      image,
      description,
      prices,
      sectionId,
      branchId: branchId || null,
      isVeg,
      preparationTime,
      restaurantId: req.user.restaurantId
    });
    await item.save();

    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

exports.getItemsBySection = async (req, res, next) => {
  try {
    const { sectionId } = req.params;
    const { branchId } = req.query;

    const items = await Item.find({
      sectionId,
      isAvailable: true,
      $or: [{ branchId: null }, { branchId }]
    });

    res.json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
};

exports.updateItem = async (req, res, next) => {
  try {
    const item = await Item.findOneAndUpdate(
      {
        _id: req.params.id,
        restaurantId: req.user.restaurantId
      },
      req.body,
      { new: true }
    );

    if (!item) return res.status(404).json({ message: "Item not found" });

    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

exports.deleteItem = async (req, res, next) => {
  try {
    await Item.findByIdAndUpdate(req.params.id, { isAvailable: false });
    res.json({ success: true, message: "Item removed" });
  } catch (err) {
    next(err);
  }
};
