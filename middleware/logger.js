const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console({
      format: combine(colorize(), timestamp(), printf(({ level, message, timestamp }) => {
        return `${timestamp} [${level}]: ${message}`;
      }))
    }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

const logRequest = (req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};

module.exports = {
  logger,
  logRequest,
};
