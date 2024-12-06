const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

//this creates a writeable stream that logs requests to a file.
const accessLogStream = fs.createWriteStream(path.join(__dirname, '../../logs/access.log'),{
    //this will append to the file if it exists.
    flags: 'a',
});

//this is setting up morgan middleware.
const logger = morgan('combined', { stream: accessLogStream });

module.exports = logger;