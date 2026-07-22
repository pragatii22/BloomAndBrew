const router = require('express').Router();
const { sendMessage } = require('../controller/contactController');

router.post('/', sendMessage);

module.exports = router;
