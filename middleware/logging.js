const morgan = require('morgan');

const logger = morgan('combined'); // 'combined' for detailed logs

module.exports = logger;
