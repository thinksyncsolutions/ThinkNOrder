const Menu = require("../Databases/Models/menuSchema");

exports.getMenuByRestaurantIdForUser = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;

    const menu = await Menu.findOne({ restaurantId })
      .populate({
        path: "sections",
        populate: {
          path: "items",
          select: "itemname image prices",
        },
        select: "sectionname sectionImage items",
      }).populate({
        path: "restaurantId",
        select: "name", // Get restaurant name
      })
      .select("sections restaurantId");

    if (!menu) return res.status(404).json({ message: "Menu not found" });

    res.status(200).json({
      restaurantId,
      restaurantName: menu.restaurantId?.name,
      menuId: menu._id,
      sections: menu.sections.map((section) => ({
        _id: section._id,
        sectionname: section.sectionname,
        sectionImage: section.sectionImage,
        items: section.items.map((item) => ({
          _id: item._id,
          itemname: item.itemname,
          image: item.image,
          prices: item.prices,
        })),
      })),
    });
  } catch (error) {
    console.error("Get Menu Error:", error);
    res.status(500).json({ message: "Server error while fetching menu" });
  }
};

