var express = require('express');
var router = express.Router();

const contentController = require('../controllers/content_controller')

router.get('/content/getContentByType/:contentType', contentController.getContentByType);
router.get('/content/getAllContent', contentController.getAllContent);

module.exports = router;