const express = require('express');
const router = express.Router();
const { createChallenge, inviteUsers } = require('./challengeController'); 
const { addSubmission } = require("./submissionController");

// Route to create a new challenge
router.post('/createChallenge', createChallenge);


// Route to invite users to an existing challenge


module.exports = router;
