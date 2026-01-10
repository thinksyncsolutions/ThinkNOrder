const express = require('express');
const { getMenuByRestaurantIdForUser } = require('../Controllers/userController');

const router = express.Router();

router.get('/getMenuForUser/:restaurantId', getMenuByRestaurantIdForUser);

module.exports = router;