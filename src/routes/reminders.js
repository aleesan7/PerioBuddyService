var express = require('express');
var router = express.Router();

const remindersController = require('../controllers/reminders_controller')

router.get('/reminders/getAllRemindersByUser/:idUser', remindersController.getAllRemindersByUser);
router.post('/reminders/createReminder', remindersController.createReminder);
router.post('/reminders/deleteReminder', remindersController.deleteReminder);
router.post('/reminders/updateReminder', remindersController.updateReminder);
router.post('/reminders/completeReminder', remindersController.completeReminder);

module.exports = router;