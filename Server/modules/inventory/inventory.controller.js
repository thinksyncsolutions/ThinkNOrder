const Inventory = require("../../database/models/Inventory");

exports.createInventoryItem = async (req, res, next) => {
  try {
    const { itemName, unit, quantity, minThreshold, branchId } = req.body;

    const item = new Inventory({
      itemName,
      unit,
      quantity,
      minThreshold,
      branchId,
      restaurantId: req.user.restaurantId
    });
    await item.save();

    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

exports.getInventory = async (req, res, next) => {
  try {
    const { branchId, lowStock } = req.query;

    const filter = { restaurantId: req.user.restaurantId };
    if (branchId) filter.branchId = branchId;

    const items = await Inventory.find(filter).sort({ itemName: 1 });

    const data = items.map(i => ({
      ...i.toObject(),
      isLowStock: i.quantity <= i.minThreshold
    }));

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.getInventoryItem = async (req, res, next) => {
  try {
    const item = await Inventory.findOne({
      _id: req.params.id,
      restaurantId: req.user.restaurantId
    });

    if (!item) return res.status(404).json({ message: "Item not found" });

    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};


exports.updateInventoryItem = async (req, res, next) => {
  try {
    const item = await Inventory.findOneAndUpdate(
      { _id: req.params.id, restaurantId: req.user.restaurantId },
      req.body,
      { new: true }
    );

    if (!item) return res.status(404).json({ message: "Item not found" });

    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

exports.deleteInventoryItem = async (req, res, next) => {
  try {
    await Inventory.findOneAndDelete({
      _id: req.params.id,
      restaurantId: req.user.restaurantId
    });

    res.json({ success: true, message: "Inventory item deleted" });
  } catch (err) {
    next(err);
  }
};

exports.addStock = async (req, res, next) => {
  try {
    const { amount } = req.body;

    const item = await Inventory.findOneAndUpdate(
      { _id: req.params.id, restaurantId: req.user.restaurantId },
      { $inc: { quantity: amount } },
      { new: true }
    );

    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

exports.reduceStock = async (req, res, next) => {
  try {
    const { amount } = req.body;

    const item = await Inventory.findOne({
      _id: req.params.id,
      restaurantId: req.user.restaurantId
    });

    if (!item) return res.status(404).json({ message: "Item not found" });
    if (item.quantity < amount)
      return res.status(400).json({ message: "Not enough stock" });

    item.quantity -= amount;
    await item.save();

    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};
