const { validationResult } = require('express-validator');
const db = require('../config/db');
const dbErrorHandler = require('../utils/dbErrorHandler');

const submitForm = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { scannedResult, employmentId, quantity } = req.body;

  try {
    const [rows] = await db.query('INSERT INTO inventory (scannedResult, employmentId, quantity) VALUES (?, ?, ?)', [scannedResult, employmentId, quantity]);

    console.log('Received data:', { scannedResult, employmentId, quantity });
    console.log('Insert ID:', rows.insertId);

    res.status(200).json({ message: 'Data received successfully', insertId: rows.insertId });
  } catch (error) {
    const { message, statusCode } = dbErrorHandler(error);
    next({ message, statusCode });
  }
};

module.exports = {
  submitForm,
};
