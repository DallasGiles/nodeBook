const rateLimit = require('express-rate-limit');

//limits rates for general API endpoints
const apiRatelimiter = rateLimit({
    windowMs: 15 * 60 * 1000, //this is 15 minutes.
    max: 100, //this limits each IP address to 100 requests per windowMs(15 minutes).
    message: 'Too many requests from this IP please wait and try again in 15 minutes.',
    standardHeaders: true,
    legacyHeaders: false,
});

//this limits the rates for login attempts
const authRateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, //this is 10 minutes
    max: 5,
    message: 'Too many login attempts, please try again later',
});

module.exports = { authRateLimiter, apiRatelimiter };