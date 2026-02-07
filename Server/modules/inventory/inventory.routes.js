

const router = require("express").Router();
const ctrl = require("./inventory.controller");

router.post("/", ctrl.createInventoryItem);
router.get("/", ctrl.getInventory);
router.get("/:id", ctrl.getInventoryItem);
router.put("/:id", ctrl.updateInventoryItem);
router.delete("/:id", ctrl.deleteInventoryItem);

// Stock ops
router.patch("/:id/add-stock", ctrl.addStock);
router.patch("/:id/reduce-stock", ctrl.reduceStock);

module.exports = router;

