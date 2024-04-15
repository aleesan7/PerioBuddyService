var express = require('express');
var router = express.Router();

const usersController = require('../controllers/users_controller')


router.post('/users/login', usersController.login);
router.post('/users/register', usersController.register);

module.exports = router;