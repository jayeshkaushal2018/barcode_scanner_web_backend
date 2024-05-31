const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formDataSchema = new Schema({
  scannedResult: {
    type: String,
    required: [true, 'Scanned result is required'],
    trim: true,
  },
  employmentId: {
    type: String,
    required: [true, 'Employment ID is required'],
    trim: true,
    match: [/^[a-zA-Z0-9]+$/, 'Employment ID must be alphanumeric'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
  },
});

module.exports = mongoose.model('FormData', formDataSchema);
