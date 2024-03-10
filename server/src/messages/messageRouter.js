const express = require('express');
const { getMessages, sendMessage } = require('./messageController');
const router = express.Router();

router.get('/:challengeId', getMessages); 
router.post('/:challengeId', sendMessage);

module.exports = router;
