const Section = require("../../database/models/Section");

exports.getFullMenu = async (req, res, next) => {
  console.log("Fetching full menu for restaurant:", req.user.restaurantId, "branch:", req.user.branchId);
  try {
    const { restaurantId, branchId } = req.user;

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
