var express = require('express');
var router = express.Router();

const diagnosisController = require('../controllers/diagnosis_controller')

router.post('/diagnosis/createDiagnosis', diagnosisController.createDiagnosis);

module.exports = router;