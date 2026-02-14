const router = require("express").Router();
const ctrl = require("./place.controller");
const authMiddleware = require("../../middleware/auth");

// CRUD
router.post("/", ctrl.createPlace);
router.get("/", authMiddleware, ctrl.getPlaces);
router.get("/:id", ctrl.getPlaceById);
router.put("/:id", ctrl.updatePlace);
router.delete("/:id", ctrl.deletePlace);

// Status
router.patch("/:id/status", ctrl.updatePlaceStatus);

module.exports = router;
