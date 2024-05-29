const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { logRequest, logger } = require('./middleware/logger');
const rateLimiter = require('./middleware/rateLimit');
const config = require('./config/config');
const submitRoute = require('./routes/submitRoute');
const db = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(logRequest); // Use request logging middleware
app.use(rateLimiter); // Apply rate limiting

// Test database connection
db.getConnection()
  .then(connection => {
    logger.info('Database connected');
    connection.release();
  })
  .catch(err => {
    logger.error('Database connection failed:', err.stack);
    process.exit(1);
  });

// Routes
app.use('/api', submitRoute(db));

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port}`);
});
