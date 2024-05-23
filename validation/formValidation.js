const { body } = require('express-validator');

const validateForm = [
  body('scannedResult').notEmpty().withMessage('Scanned result is required'),
  body('employmentId').notEmpty().withMessage('Employment ID is required'),
  body('quantity')
    .notEmpty().withMessage('Quantity is required')
    .isNumeric().withMessage('Quantity must be a number'),
];

module.exports = validateForm;
