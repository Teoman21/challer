const express = require('express');
const router = express.Router();
const { createChallenge, inviteUsers } = require('./challengeController'); // Adjust the path as necessary

// Route to create a new challenge
router.post('/createChallenge', createChallenge);

// Route to invite users to an existing challenge


module.exports = router;
