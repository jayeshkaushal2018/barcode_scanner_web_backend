const { logger } = require('./logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
};

module.exports = errorHandler;
