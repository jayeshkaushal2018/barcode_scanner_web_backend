const express = require('express');
const { body, validationResult } = require('express-validator');

const validateForm = [
  body('scannedResult')
    .notEmpty().withMessage('Scanned result is required')
    .isString().withMessage('Scanned result must be a string')
    .isLength({ min: 5 }).withMessage('Scanned result must be at least 5 characters long'),
  body('employmentId')
    .notEmpty().withMessage('Employment ID is required')
    .isString().withMessage('Employment ID must be a string')
    .isLength({ min: 3, max: 50 }).withMessage('Employment ID must be between 3 and 50 characters')
    .matches(/^[a-zA-Z0-9]+$/).withMessage('Employment ID must be alphanumeric'),
  body('quantity')
    .notEmpty().withMessage('Quantity is required')
    .isNumeric().withMessage('Quantity must be a number')
    .custom((value) => value > 0).withMessage('Quantity must be greater than 0'),
];

module.exports = (db) => {
  const router = express.Router();

  router.post('/', validateForm, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { scannedResult, employmentId, quantity } = req.body;

    const query = 'INSERT INTO inventory (scannedResult, employmentId, quantity) VALUES (?, ?, ?)';
    const values = [scannedResult, employmentId, quantity];

    db.query(query, values, (err, result) => {
      if (err) {
        logger.error('Error inserting data:', err);
        return res.status(500).json({ message: 'Database error', error: err });
      }
      res.status(200).json({ message: 'Data received successfully' });
    });
  });

  return router;
};
