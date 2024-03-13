const express = require('express');
const router = express.Router();

// In your messageRouter.js or wherever you set up your routes
module.exports = function(io) {
    const router = require('express').Router();
    const { postMessage, getMessages } = require('./messageController');
  
    router.post('/', (req, res) => postMessage(req, res, io));
    router.get('/:challengeId', getMessages); // No changes here
  
    return router;
  };
  