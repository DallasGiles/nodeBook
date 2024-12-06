const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const winston = require('winston');


//this creates a writeable stream that logs requests to a file.
const accessLogStream = fs.createWriteStream(path.join(__dirname, '../../logs/access.log'),{
    //this will append to the file if it exists.
    flags: 'a',
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({timestamp, level, message}) =>{
                return `${timestamp} [${level.toUpperCase()}]: ${message}`;
            })
    ),
    transports: [
        //logs to console
        new winston.transports.Console(),
        //logs to file
        new winston.transports.File({ filename: path.join(__dirname, '../../logs/app.log')}),
    ],
});


//this is setting up morgan middleware.
const httpLogger = morgan('combined', { stream: accessLogStream });

module.exports = {logger, httpLogger};