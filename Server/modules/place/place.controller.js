const Place = require("../../database/models/Place");

// ➕ CREATE PLACE
exports.createPlace = async (req, res, next) => {
  try {
    const { type, number, floor, capacity } = req.body;
    const { branchId } = req.user; // optional branchId

    // already exist 
    const existingPlace = await Place.findOne({
      restaurantId: req.user.restaurantId,
      branchId: branchId,
      floor: floor,
      number: number
    });
    if (existingPlace) {
      return res.status(400).json({ message: "Place number already exists in this branch" });
    }

    const place = new Place({
      type,
      number,
      floor,
      capacity,
      branchId,
      restaurantId: req.user.restaurantId
    });
    await place.save();

    res.status(201).json({ success: true, data: place });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// 📖 GET ALL PLACES (branch-wise)
exports.getPlaces = async (req, res, next) => {
  console.log("Fetching places with query:", req.query, "for restaurant:", req.user.restaurantId);
  try {
    const { floor, status } = req.query;
    const { branchId } = req.user;

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
    const { branchId, restaurantId } = req.user;
    const place = await Place.findOne({
      _id: req.params.id,
      restaurantId: restaurantId,
      branchId: branchId
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
        restaurantId: req.user.restaurantId,
        branchId: req.user.branchId
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
    const { restaurantId, branchId } = req.user;
    await Place.findOneAndUpdate(
      { _id: req.params.id, restaurantId: restaurantId, branchId: branchId },
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
      { _id: req.params.id, restaurantId: req.user.restaurantId, branchId: req.user.branchId },
      { status },
      { new: true }
    );

    if (!place) return res.status(404).json({ message: "Place not found" });

    res.json({ success: true, data: place });
  } catch (err) {
    next(err);
  }
};


exports.getRunningTables = async (req, res) => {
  const restaurantId = req.user.restaurantId;

  const sessions = await OrderSession.find({
    restaurantId,
    branchId: req.user.branchId,
    isClosed: false,
  }).select("placeId startedAt");

  res.json(sessions);
};

