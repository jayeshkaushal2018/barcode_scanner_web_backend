const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), { flags: 'a' });

// Setup the logger
const logger = morgan('combined', { stream: accessLogStream });

// Enhanced error logging
const errorLogger = (err, req, res, next) => {
  fs.appendFile(path.join(__dirname, '../logs/error.log'), `${new Date().toISOString()} - ${err.stack}\n`, (err) => {
    if (err) console.error('Error logging failed:', err);
  });
  next(err);
};

module.exports = { logger, errorLogger };
