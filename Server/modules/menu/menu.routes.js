// menu.routes.js
const router = require("express").Router();
const sectionCtrl = require("./section.controller");
const itemCtrl = require("./item.controller");
// const authMiddleware = require("../../middleware/auth");
const auth = require("../../middleware/auth");

// SECTION
router.post("/sections",auth, sectionCtrl.createSection);
router.get("/sections", auth, sectionCtrl.getSections);
router.put("/sections/:id", auth, sectionCtrl.updateSection);
router.delete("/sections/:id", auth, sectionCtrl.deleteSection);

// ITEM
router.post("/items/:sectionId", auth, itemCtrl.createItem);
router.get("/items/section/:sectionId", auth, itemCtrl.getItemsBySection);
router.put("/items/:id", auth, itemCtrl.updateItem);
router.delete("/items/:id", auth, itemCtrl.deleteItem);

router.get("/full-menu", auth, require("./menu.controller").getFullMenu);

module.exports = router;
