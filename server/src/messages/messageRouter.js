const express = require('express');
const { postMessage, getMessages } = require('./messageController');
const router = express.Router();


router.post('/', postMessage);

// Route for getting messages for a specific challenge
router.get('/:challengeId', getMessages);

module.exports = router;
