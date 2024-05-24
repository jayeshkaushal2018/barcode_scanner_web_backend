const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('./middleware/logging');
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
app.use(logger); // Use logging middleware
app.use(rateLimiter); // Apply rate limiting

// Test database connection
db.getConnection()
  .then(connection => {
    console.log('Database connected');
    connection.release();
  })
  .catch(err => {
    console.error('Database connection failed:', err.stack);
    process.exit(1);
  });

// Routes
app.use('/api', submitRoute);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
