// Import the Challenge model
const Challenge = require('./challangeModel'); // Adjust the path as necessary
const moment = require('moment'); // A handy library for date calculations


//CREATE A NEW CHALLENGE

exports.createChallenge = async (req, res) => {
    try {
        const { challengeName, initialPotAmount, creatorId, participants, startDate, duration, invitations } = req.body;

        // Validate challenge duration
        if (duration < 15 || duration > 90) {
            return res.status(400).json({ message: 'Challenge duration must be between 15 and 90 days.' });
        }

        // Calculate the end date by adding the duration to the start date
        const endDate = moment(startDate).add(duration, 'days').toDate();

        // Initial transaction from the challenge creator
        const transactions = [{
            participant: creatorId,
            amount: initialPotAmount
        }];

        // Create the challenge object
        const challenge = new Challenge({
            challengeName,
            potAmount: initialPotAmount,
            participants: [creatorId], // Include the creator as a participant
            invitations,
            transactions,
            startDate,
            endDate,
            duration
        });

        // Save the new challenge to the database
        const savedChallenge = await challenge.save();
        // If all goes well, send back the created challenge
        res.status(201).json(savedChallenge);
    } catch (error) {
        // If there's any error, send back an error message
        res.status(500).json({ message: 'An error occurred while creating the challenge.', error: error.message });
    }
};



exports.sendInvitation = async (req, res) => {
    const { email } = req.body; // Email of the friend to invite
    const challengeId = req.params.challengeId;

    try {
        const challenge = await Challenge.findById(challengeId);
        if (!challenge) {
            return res.status(404).send('Challenge not found.');
        }

        // Here, implement your logic for generating an invitation code or link
        const invitationCode = generateInvitationCode(challengeId, email);

        // Optionally, save the invitation details to the challenge document or a separate invitation collection

        // Send the invitation via email or another appropriate method
        sendInvitationEmail(email, invitationCode);

        res.status(200).send('Invitation sent successfully.');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.acceptInvitation = async (req, res) => {
    const { invitationCode } = req.body; // The invitation code from the invite link or email

    // Decode the invitationCode to find the corresponding challenge and verify its validity
    const { challengeId, email } = decodeInvitationCode(invitationCode);

    try {
        // Here, you would verify the invitation and add the user to the challenge's participants
        // This might involve finding the challenge by ID, checking that the invitation is valid,
        // and then updating the challenge document to include the new participant

        res.status(200).send('You have successfully joined the challenge.');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// You might also include a declineInvitation method here, following a similar pattern
