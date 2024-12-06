const express = require('express');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const errorHandler = require('./middlewares/errorHandler');
//imports connect database function from config/db.
const {connectDB} = require('./config/db');

//import logger and http logger from logger.js
const {httpLogger, logger } = require('./config/logger');

require('dotenv').config();

//takes the import of express from above and initializes it as an express app.
const app = express();

//Middleware below this line.
//
//this will parse JSON payloads.
app.use(express.json());
// will log http requests
app.use(httpLogger);

//basic testing route
app.get('/', (req, res) => {
    logger.info('GET / endpoint hit');
    res.send('API is working...');
});

//real routes below this line.
//
app.use('/api/auth', authRoutes);

app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({ message: 'You have accessed a protected route', user: req.user });
  });

//error handler must be the last middleware listed
app.use(errorHandler);

//connect to the database
connectDB();

//export the app
module.exports = app;
