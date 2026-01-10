const express = require('express');
const { createMenu, getMenuByRestaurantId, deleteSection, editSection, deleteItem, editItem, createSection, createItem } = require("../Controllers/menuController");
const { authenticateToken } = require('../utils/tokenUtils');

const router = express.Router();

router.post('/create', authenticateToken, createMenu);
router.get('/getMenu', authenticateToken, getMenuByRestaurantId);

router.post("/section/:menuId",authenticateToken,  createSection);
router.delete("/section/:sectionId",authenticateToken,  deleteSection);
router.put("/section/:sectionId",authenticateToken,  editSection);

router.post("/item/:sectionId",authenticateToken,  createItem);
router.delete("/item/:itemId",authenticateToken,  deleteItem);
router.put("/item/:itemId",authenticateToken, editItem);

module.exports = router;
