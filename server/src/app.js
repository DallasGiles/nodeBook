const express = require('express');

// Routes
const authRoutes = require('./routes/authRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes');
const federationRoutes = require('./routes/federationRoutes');

// Middlewares
const authMiddleware = require('./middlewares/authMiddleware');
const errorHandler = require('./middlewares/errorHandler');
const { apiRateLimiter, authRateLimiter } = require('./middlewares/rateLimiter');

// Database and Logging
// Connect to Database (remove for tests to control connection)
if (process.env.NODE_ENV !== 'test') {
  const { connectDB } = require('./config/db');
  connectDB();
}
const { httpLogger, logger } = require('./config/logger');

require('dotenv').config();

// Initialize Express App
const app = express();

// Middleware
app.use(express.json()); // Parse JSON payloads
app.use(httpLogger); // Log HTTP requests

// Basic testing route
app.get('/', (req, res) => {
  logger.info('GET / endpoint hit');
  res.send('API is working...');
});

// Apply Rate Limiters
app.use('/api', apiRateLimiter);
app.use('/api/auth/login', authRateLimiter);
app.use('/api/auth/signup', authRateLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/federation', federationRoutes);

// Example Protected Route
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'You have accessed a protected route', user: req.user });
});

// Catch-all route for undefined routes
app.use((req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  error.status = 404;
  next(error);
});

// Error Handler (last middleware)
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
  });
});

// Error Handler (last middleware)
app.use(errorHandler);

// Export the app
module.exports = app;
