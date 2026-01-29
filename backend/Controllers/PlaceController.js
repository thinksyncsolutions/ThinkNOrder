const Restaurant = require("../Databases/Models/restaurantSchema");
const OrderSession = require("../Databases/Models/orderSessionSchema");

exports.addPlace = async (req, res) => {
  try {
    const restaurantId = req.admin.restaurantId;
    const { type, number, floor, capacity, status } = req.body;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    restaurant.places.push({ type, number, floor, capacity, status });
    await restaurant.save();

    res.status(201).json({ message: "Place added successfully", restaurant });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPlaces = async (req, res) => {
  try {
    const restaurantId = req.admin.restaurantId;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json(restaurant.places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRunningTables = async (req, res) => {
  const restaurantId = req.admin.restaurantId;

  const sessions = await OrderSession.find({
    restaurantId,
    isClosed: false,
  }).select("placeId startedAt");

  res.json(sessions);
};


// exports.updatePlace = async (req, res) => {
//   try {
//     const { restaurantId, placeId } = req.admin.restaurantId;
//     const { type, number, floor, capacity, status } = req.body;

//     const restaurant = await Restaurant.findById(restaurantId);
//     if (!restaurant) {
//       return res.status(404).json({ message: "Restaurant not found" });
//     }

//     const place = restaurant.places.id(placeId);
//     if (!place) {
//       return res.status(404).json({ message: "Place not found" });
//     }

//     if (type) place.type = type;
//     if (number) place.number = number;
//     if (floor) place.floor = floor;
//     if (capacity) place.capacity = capacity;
//     if (status) place.status = status;

//     await restaurant.save();
//     res.json({ message: "Place updated successfully", place });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.deletePlace = async (req, res) => {
  try {
    const restaurantId = req.admin.restaurantId;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const { placeId } = req.params;

    const place = restaurant.places.id(placeId);
    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    place.deleteOne();
    await restaurant.save();

    res.json({ message: "Place deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
