const express = require('express');
const { handleInbox, handleOutbox} = require('../controllers/federationController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

//handle incoming messages
router.post('/inbox', handleInbox);

//handle sending messages
router.post('/outbox', authMiddleware, handleOutbox);

module.exports = router;