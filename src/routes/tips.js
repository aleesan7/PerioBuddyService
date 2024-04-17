var express = require('express');
var router = express.Router();

const tipsController = require('../controllers/tips_controller')

router.get('/tips/getAllTips', tipsController.getAllTips);

module.exports = router;