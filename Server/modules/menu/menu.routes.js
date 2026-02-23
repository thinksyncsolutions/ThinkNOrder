// menu.routes.js
const router = require("express").Router();
const sectionCtrl = require("./section.controller");
const itemCtrl = require("./item.controller");
const authMiddleware = require("../../middleware/auth");

// SECTION
router.post("/sections", sectionCtrl.createSection);
router.get("/sections", authMiddleware, sectionCtrl.getSections);
router.put("/sections/:id", sectionCtrl.updateSection);
router.delete("/sections/:id", sectionCtrl.deleteSection);

// ITEM
router.post("/items/:sectionId", itemCtrl.createItem);
router.get("/items/section/:sectionId", itemCtrl.getItemsBySection);
router.put("/items/:id", itemCtrl.updateItem);
router.delete("/items/:id", itemCtrl.deleteItem);

router.get("/full-menu", authMiddleware, require("./menu.controller").getFullMenu);

module.exports = router;
