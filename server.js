const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('./middleware/logging');
const rateLimiter = require('./middleware/rateLimit');
const config = require('./config/config');
const connectDB = require('./config/db');
const submitRoute = require('./routes/submitRoute');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(logger); // Use logging middleware
app.use(rateLimiter); // Apply rate limiting

// Routes
app.use('/api', submitRoute);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
