const Place = require("../../database/models/Place");

// ➕ CREATE PLACE
exports.createPlace = async (req, res, next) => {
  try {
    const { type, number, floor, capacity, branchId } = req.body;

    const place = await Place.create({
      type,
      number,
      floor,
      capacity,
      branchId,
      restaurantId: req.user.restaurantId
    });

    res.status(201).json({ success: true, data: place });
  } catch (err) {
    next(err);
  }
};

// 📖 GET ALL PLACES (branch-wise)
exports.getPlaces = async (req, res, next) => {
  try {
    const { branchId, floor, status } = req.query;

    const filter = {
      restaurantId: req.user.restaurantId,
      isActive: true
    };

    if (branchId) filter.branchId = branchId;
    if (floor) filter.floor = floor;
    if (status) filter.status = status;

    const places = await Place.find(filter).sort({ floor: 1, number: 1 });

    res.json({ success: true, data: places });
  } catch (err) {
    next(err);
  }
};

// 📄 GET SINGLE PLACE
exports.getPlaceById = async (req, res, next) => {
  try {
    const place = await Place.findOne({
      _id: req.params.id,
      restaurantId: req.user.restaurantId
    });

    if (!place) return res.status(404).json({ message: "Place not found" });

    res.json({ success: true, data: place });
  } catch (err) {
    next(err);
  }
};

// ✏️ UPDATE PLACE
exports.updatePlace = async (req, res, next) => {
  try {
    const place = await Place.findOneAndUpdate(
      {
        _id: req.params.id,
        restaurantId: req.user.restaurantId
      },
      req.body,
      { new: true }
    );

    if (!place) return res.status(404).json({ message: "Place not found" });

    res.json({ success: true, data: place });
  } catch (err) {
    next(err);
  }
};

// ❌ DELETE PLACE (Soft Delete)
exports.deletePlace = async (req, res, next) => {
  try {
    await Place.findOneAndUpdate(
      { _id: req.params.id, restaurantId: req.user.restaurantId },
      { isActive: false }
    );

    res.json({ success: true, message: "Place removed" });
  } catch (err) {
    next(err);
  }
};

// 🔄 CHANGE STATUS (AVAILABLE / OCCUPIED / RESERVED)
exports.updatePlaceStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const place = await Place.findOneAndUpdate(
      { _id: req.params.id, restaurantId: req.user.restaurantId },
      { status },
      { new: true }
    );

    if (!place) return res.status(404).json({ message: "Place not found" });

    res.json({ success: true, data: place });
  } catch (err) {
    next(err);
  }
};
