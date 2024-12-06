const express = require('express');
//imports connect database function from config/db.
const {connectDB} = require('./config/db');

require('dotenv').config();

//takes the import of express from above and initializes it as an express app.
const app = express();

//Middleware below this line.
//
//this will parse JSON payloads.
app.use(express.json());

//basic testing route
app.get('/', (req, res) => {
    res.send('API is working...');
});

//connect to the database
connectDB();

//export the app
module.exports = app;
