const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formDataSchema = new Schema({
  scannedResult: {
    type: String,
    required: true,
  },
  employmentId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('FormData', formDataSchema);
