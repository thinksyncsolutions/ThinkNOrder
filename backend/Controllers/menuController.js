// Required Models
const Menu = require("../Databases/Models/menuSchema");
const Section = require("../Databases/Models/sectionSchema");
const Item = require("../Databases/Models/itemSchema");

// CREATE MENU
exports.createMenu = async (req, res) => {
  try {
    const { sections } = req.body;
    const restaurantId = req.admin.restaurantId;

    if (!Array.isArray(sections)) {
      return res.status(400).json({ message: "Sections must be an array" });
    }

    let menu = await Menu.findOne({ restaurantId });
    if (!menu) menu = await Menu.create({ restaurantId });

    const sectionIds = [];

    for (const sectionData of sections) {
      const { sectionname, sectionImage, items } = sectionData;

      const section = new Section({ sectionname, sectionImage, menuId: menu._id, restaurantId });
      const itemIds = [];

      for (const item of items) {
        if (!item.itemname || !Array.isArray(item.prices)) continue;
        const newItem = await Item.create({ ...item, sectionId: section._id, menuId: menu._id, restaurantId });
        itemIds.push(newItem._id);
      }

      section.items = itemIds;
      await section.save();
      sectionIds.push(section._id);
    }

    if (sectionIds.length > 0) {
      menu.sections.push(...sectionIds);
      await menu.save();
    }

    res.status(201).json({
      message: "Menu created/updated successfully",
      menuId: menu._id,
      sectionsCount: menu.sections.length,
    });
  } catch (error) {
    console.error("Create Menu Error:", error);
    res.status(500).json({ message: "Server error while creating/updating menu" });
  }
};

// GET MENU
exports.getMenuByRestaurantId = async (req, res) => {
  try {
    const restaurantId = req.admin.restaurantId;

    const menu = await Menu.findOne({ restaurantId })
      .populate({
        path: "sections",
        populate: {
          path: "items",
          select: "itemname image prices",
        },
        select: "sectionname sectionImage items",
      })
      .select("sections");

    if (!menu) return res.status(404).json({ message: "Menu not found" });

    res.status(200).json({
      restaurantId,
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

// CREATE SECTION
exports.createSection = async (req, res) => {
  try {
    const { sectionname, sectionImage } = req.body;
    const { menuId } = req.params;
    const restaurantId = req.admin.restaurantId;

    const menu = await Menu.findOne({ _id: menuId, restaurantId });
    if (!menu) return res.status(404).json({ message: "Menu not found or unauthorized" });

    const section = await Section.create({ sectionname, sectionImage, menuId, restaurantId });
    await Menu.findByIdAndUpdate(menuId, { $push: { sections: section._id } });

    res.status(201).json({ message: "Section created", section });
  } catch (error) {
    console.error("Create Section Error:", error);
    res.status(500).json({ message: "Server error while creating section" });
  }
};

// DELETE SECTION
exports.deleteSection = async (req, res) => {
  try {
    const sectionId = req.params.sectionId;
    const section = await Section.findById(sectionId);
    if (!section) return res.status(404).json({ message: "Section not found" });

    await Item.deleteMany({ sectionId });
    await Menu.updateOne({ _id: section.menuId }, { $pull: { sections: sectionId } });
    await Section.findByIdAndDelete(sectionId);

    res.status(200).json({ message: "Section deleted successfully" });
  } catch (error) {
    console.error("Delete Section Error:", error);
    res.status(500).json({ message: "Server error while deleting section" });
  }
};

// EDIT SECTION
exports.editSection = async (req, res) => {
  try {
    const sectionId = req.params.sectionId;
    const { sectionname, sectionImage } = req.body;

    const section = await Section.findOneAndUpdate(
      { _id: sectionId, restaurantId: req.admin.restaurantId },
      { sectionname, sectionImage },
      { new: true }
    );

    if (!section) return res.status(404).json({ message: "Section not found or unauthorized" });

    res.status(200).json({ message: "Section updated", section });
  } catch (error) {
    console.error("Edit Section Error:", error);
    res.status(500).json({ message: "Server error while editing section" });
  }
};

// CREATE ITEM
exports.createItem = async (req, res) => {
  try {
    const { itemname, image, prices } = req.body;
    const { sectionId } = req.params;
    const restaurantId = req.admin.restaurantId;

    const section = await Section.findOne({ _id: sectionId, restaurantId });
    if (!section) return res.status(404).json({ message: "Section not found or unauthorized" });

    const newItem = await Item.create({
      itemname,
      image,
      prices,
      sectionId,
      menuId: section.menuId,
      restaurantId
    });

    await Section.findByIdAndUpdate(sectionId, { $push: { items: newItem._id } });

    res.status(201).json({ message: "Item created", item: newItem });
  } catch (error) {
    console.error("Create Item Error:", error);
    res.status(500).json({ message: "Server error while creating item" });
  }
};

// DELETE ITEM
exports.deleteItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    await Section.updateOne({ _id: item.sectionId }, { $pull: { items: itemId } });
    await Item.findByIdAndDelete(itemId);

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Delete Item Error:", error);
    res.status(500).json({ message: "Server error while deleting item" });
  }
};

// EDIT ITEM
exports.editItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const updateFields = req.body;

    const item = await Item.findOneAndUpdate(
      { _id: itemId, restaurantId: req.admin.restaurantId },
      updateFields,
      { new: true }
    );

    if (!item) return res.status(404).json({ message: "Item not found or unauthorized" });

    res.status(200).json({ message: "Item updated", item });
  } catch (error) {
    console.error("Edit Item Error:", error);
    res.status(500).json({ message: "Server error while editing item" });
  }
};
