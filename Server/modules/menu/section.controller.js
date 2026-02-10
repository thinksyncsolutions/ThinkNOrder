// section.controller.js
const Section = require("../../database/models/Section");

exports.createSection = async (req, res, next) => {
  console.log("Creating section with data:", req.body);
  try {
    const sections = req.body.sections; // array

    const docs = sections.map(sec => ({
      ...sec,
      restaurantId: req.user.restaurantId,
      branchId: sec.branchId || null
    }));

    const created = await Section.insertMany(docs);

    res.status(201).json({ success: true, data: created });
  } catch (err) {
    next(err);
  }
};


exports.getSections = async (req, res, next) => {
  try {
    const { branchId } = req.query;

    const sections = await Section.find({
      restaurantId: req.user.restaurantId,
      isActive: true,
      $or: [{ branchId: null }, { branchId }]
    }).sort({ order: 1 });

    res.json({ success: true, data: sections });
  } catch (err) {
    next(err);
  }
};

exports.updateSection = async (req, res, next) => {
  try {
    const section = await Section.findOneAndUpdate(
      {
        _id: req.params.id,
        restaurantId: req.user.restaurantId
      },
      req.body,
      { new: true }
    );

    if (!section) return res.status(404).json({ message: "Section not found" });

    res.json({ success: true, data: section });
  } catch (err) {
    next(err);
  }
};

exports.deleteSection = async (req, res, next) => {
  try {
    const section = await Section.findOneAndUpdate(
      {
        _id: req.params.id,
        restaurantId: req.user.restaurantId
      },
      { isActive: false },
      { new: true }
    );

    if (!section) return res.status(404).json({ message: "Section not found" });

    res.json({ success: true, message: "Section removed" });
  } catch (err) {
    next(err);
  }
};

