const router = require('express').Router();
const verifyToken = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/roleMiddleware');
const { getStats } = require('../controller/adminController');

router.get('/stats', verifyToken, adminOnly, getStats);

module.exports = router;
