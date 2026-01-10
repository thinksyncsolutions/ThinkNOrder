const express = require("express");
const router = express.Router();
const {addPlace,getPlaces,updatePlace,deletePlace} = require("../Controllers/PlaceController");
const { authenticateToken } = require("../utils/tokenUtils");

// Add a place
router.post("/", authenticateToken, addPlace);

// Get all places for a restaurant
router.get("/", authenticateToken, getPlaces);

// Update a specific place
// router.put("/:placeId", authenticateToken, updatePlace);

// // Delete a place
router.delete("/:placeId", authenticateToken, deletePlace);

module.exports = router;
