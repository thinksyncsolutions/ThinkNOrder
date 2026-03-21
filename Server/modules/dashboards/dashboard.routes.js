const router = require('express').Router();
const { getDashboard } = require('./dashboard.controller');
const auth = require('../../middleware/auth');

router.get('/summary',auth, getDashboard);

module.exports = router;