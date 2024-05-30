const express = require('express');
const { body, validationResult } = require('express-validator');
const FormData = require('../models/FormData');

const router = express.Router();

// Validation middleware
const validateForm = [
  body('scannedResult').notEmpty().withMessage('Scanned result is required'),
  body('employmentId').notEmpty().withMessage('Employment ID is required'),
  body('quantity')
    .notEmpty().withMessage('Quantity is required')
    .isNumeric().withMessage('Quantity must be a number'),
];

// Routes
router.post('/submit-form', validateForm, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { scannedResult, employmentId, quantity } = req.body;

  try {
    const newFormData = new FormData({
      scannedResult,
      employmentId,
      quantity,
    });
    await newFormData.save();
    res.status(200).json({ message: 'Data received successfully' });
  } catch (err) {
    console.error('Error saving form data:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
