const router = require("express").Router();
const ctrl = require("./place.controller");
const auth = require("../../middleware/auth");


// CRUD
router.post("/", auth, ctrl.createPlace);
router.get("/", auth, ctrl.getPlaces);
router.get("/:id", ctrl.getPlaceById);
router.put("/:id", auth, ctrl.updatePlace);
router.delete("/:id", auth, ctrl.deletePlace);

// Status
router.patch("/:id/status", ctrl.updatePlaceStatus);

router.get("/running-tables", auth, ctrl.getRunningTables);

module.exports = router;
