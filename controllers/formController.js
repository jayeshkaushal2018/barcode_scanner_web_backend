const { validationResult } = require('express-validator');

const submitForm = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { scannedResult, employmentId, quantity } = req.body;

  // Perform any necessary processing here
  console.log('Received data:', { scannedResult, employmentId, quantity });

  // Simulate successful response (you can add your own logic to store the data)
  res.status(200).json({ message: 'Data received successfully' });
};

module.exports = {
  submitForm,
};
