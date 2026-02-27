const Section = require("../../database/models/Section");

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
    const { restaurantId, branchId } = req.params;

    const mongoose = require("mongoose");

    const restaurantObjectId = new mongoose.Types.ObjectId(restaurantId);
    const branchObjectId = branchId
      ? new mongoose.Types.ObjectId(branchId)
      : null;

    const branchFilter = branchObjectId
      ? { $or: [{ branchId: null }, { branchId: branchObjectId }] }
      : { branchId: null };

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

    res.json({ success: true, data: menu });

  } catch (err) {
    next(err);
  }
};