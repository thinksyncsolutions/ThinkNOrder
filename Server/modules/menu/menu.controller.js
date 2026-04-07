const Section = require("../../db/models/Section");
const Place = require("../../db/models/Place");
const OrderSession = require("../../db/models/OrderSession");
const Order = require("../../db/models/Order");
const mongoose = require("mongoose");

exports.getFullMenu = async (req, res, next) => {

  console.log("Fetching full menu for user:", req.user); // Debug log
  try {
    const { restaurantId, branchId } = req.user; // branchId can come from either user or query params

    const menu = await Section.aggregate([
      { 
        $match: {
          restaurantId,
          isActive: true,
          $or: [{ branchId: null }, { branchId }]
        }
      },
      {
        $lookup: {
          from: "items",
          let: { sectionId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$sectionId", "$$sectionId"] },
                restaurantId,
                isAvailable: true,
                $or: [{ branchId: null }, { branchId }]
              }
            }
          ],
          as: "items"
        }
      },
      { $sort: { order: 1 } }
    ]);
    res.json({ success: true, data: menu });

  } catch (err) {
    next(err);
  }
};

exports.getFullMenuForUser = async (req, res, next) => {
  try {
    const { placeCode } = req.params;

    // ✅ Get place + restaurant + branch in ONE query
    const placeData = await Place.aggregate([
      { $match: { placeCode } },

      {
        $lookup: {
          from: "restaurants",
          localField: "restaurantId",
          foreignField: "_id",
          as: "restaurant"
        }
      },
      { $unwind: "$restaurant" },

      {
        $lookup: {
          from: "branches",
          localField: "branchId",
          foreignField: "_id",
          as: "branch"
        }
      },
      {
        $unwind: {
          path: "$branch",
          preserveNullAndEmptyArrays: true
        }
      },

      // ✅ Only send required fields
      {
        $project: {
          placeCode: 1,
          number: 1,
          floor: 1,
          type: 1,
          restaurantId: 1,
          branchId: 1,

          restaurantName: "$restaurant.name",
          restaurantLogo: "$restaurant.logo",
          branchName: "$branch.name",
          isOpen: "$branch.isOpen",
          address: "$branch.address",
          city: "$branch.city",
          coordinates: "$branch.coordinates"
        }
      }
    ]);

    if (!placeData.length) {
      return res.status(404).json({ message: "Invalid place code" });
    }

    const place = placeData[0];

    const restaurantObjectId = new mongoose.Types.ObjectId(place.restaurantId);
    const branchObjectId = place.branchId
      ? new mongoose.Types.ObjectId(place.branchId)
      : null;

    const branchFilter = branchObjectId
      ? { $or: [{ branchId: null }, { branchId: branchObjectId }] }
      : { branchId: null };

    // ✅ Menu aggregation (same as yours)
    const menu = await Section.aggregate([
      {
        $match: {
          restaurantId: restaurantObjectId,
          isActive: true,
          ...branchFilter
        }
      },
      {
        $lookup: {
          from: "items",
          let: { sectionId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$sectionId", "$$sectionId"] },
                restaurantId: restaurantObjectId,
                isAvailable: true,
                ...branchFilter
              }
            }
          ],
          as: "items"
        }
      },
      { $sort: { order: 1 } }
    ]);

    // ✅ Check active session (DO NOT create)
const sessionId = await OrderSession.findOne({
  placeId: place._id,
  isClosed: false
}).select("_id").lean();

const orders = await Order.find({
  placeId: place._id,
  orderSessionId: sessionId ? sessionId._id : null,
}).lean();

console.log(orders); // Debug log to check if orders are retrieved correctly

 res.json({
      success: true,
      data: {
        menu,
        place,   // ✅ already contains restaurantName, branchName, etc.
        sessionId: sessionId || null, // 👈 important
        orders: orders || null
      }
    });

  } catch (err) {
    next(err);
  }
};

// exports.getFullMenuForUser = async (req, res, next) => {
//   try {
//     // const { restaurantId, branchId } = req.params;
//      const { placeCode } = req.params;

//     const place = await Place.findOne({ placeCode }).lean();

//     if (!place) {
//       return res.status(404).json({ message: "Invalid place code" });
//     }

//     const { restaurantId, branchId } = place;

//     const restaurantObjectId = new mongoose.Types.ObjectId(restaurantId);
//     const branchObjectId = branchId
//       ? new mongoose.Types.ObjectId(branchId)
//       : null;

//     const branchFilter = branchObjectId
//       ? { $or: [{ branchId: null }, { branchId: branchObjectId }] }
//       : { branchId: null };

//     const menu = await Section.aggregate([
//       {
//         $match: {
//           restaurantId: restaurantObjectId,
//           isActive: true,
//           ...branchFilter
//         }
//       },
//       {
//         $lookup: {
//           from: "items",
//           let: { sectionId: "$_id" },
//           pipeline: [
//             {
//               $match: {
//                 $expr: { $eq: ["$sectionId", "$$sectionId"] },
//                 restaurantId: restaurantObjectId,
//                 isAvailable: true,
//                 ...branchFilter
//               }
//             }
//           ],
//           as: "items"
//         }
//       },
//       { $sort: { order: 1 } }
//     ]);
//     res.json({ success: true, data: {menu, place} });

//   } catch (err) {
//     next(err);
//   }
// };