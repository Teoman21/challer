const express = require('express');
const router = express.Router();
const { createChallenge , getUserChallenges} = require('./challengeController'); 
const { sendInvitation , acceptInvitation, getInvitations } = require("./challengeInvitationController");
const { addSubmission } = require("./submissionController");

// Route to create a new challenge
router.post('/createChallenge', createChallenge);
router.get("/getChallenge/:userId", getUserChallenges)

router.post('/:challengeId/invite', sendInvitation);
router.post('/:challengeId/accept', acceptInvitation);
router.get('/:userId/invitations', getInvitations);



// Route to invite users to an existing challenge


module.exports = router;
