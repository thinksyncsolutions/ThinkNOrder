const router = require("express").Router();
const ctrl = require("./place.controller");

// CRUD
router.post("/", ctrl.createPlace);
router.get("/", ctrl.getPlaces);
router.get("/:id", ctrl.getPlaceById);
router.put("/:id", ctrl.updatePlace);
router.delete("/:id", ctrl.deletePlace);

// Status
router.patch("/:id/status", ctrl.updatePlaceStatus);

module.exports = router;
