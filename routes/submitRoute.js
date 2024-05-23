const express = require('express');
const validateForm = require('../validation/formValidation');
const { submitForm } = require('../controllers/formController');

const router = express.Router();

router.post('/submit-form', validateForm, submitForm);

module.exports = router;
