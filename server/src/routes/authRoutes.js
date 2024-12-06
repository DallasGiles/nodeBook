const express = require('express');
const { signUp, login } = require('../controllers/authController');

const router = express.Router();

//POST will register a new user.
router.post('/register', signUp);

//POST will login
router.post('/login', login);

module.exports = router 