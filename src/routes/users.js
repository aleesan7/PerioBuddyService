var express = require('express');
var router = express.Router();

const usersController = require('../controllers/users_controller')


router.post('/users/login', usersController.login);
router.post('/users/register', usersController.register);
router.post('/users/updateInfo', usersController.updateInfo);
router.post('/users/updateProfilePic', usersController.updateProfilePic);
router.get('/users/getUserInfo/:user', usersController.getUserInfo);

module.exports = router;