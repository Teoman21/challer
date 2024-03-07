const Challenge = require('./challangeModel');
const User = require('../auth/userModel'); 
const moment = require('moment');

exports.createChallenge = async (req, res) => {
    try {
        const { challengeName, initialPotAmount, creatorId, participants, startDate, duration, usernames, endDate: endDateRaw } = req.body;
        // Validate challenge duration
        if (!endDateRaw && (duration < 15 || duration > 90)) {
            return res.status(400).json({ message: 'Challenge duration must be between 15 and 90 days or an endDate must be provided.' });
        }

        // Calculate the end date by adding the duration to the start date
        const endDate = endDateRaw ? new Date(endDateRaw) : moment(startDate).add(duration, 'days').toDate();

        // Find users by usernames and get their IDs
        const users = await User.find({ username: { $in: usernames } });

        // If any usernames are not found, you can handle it by returning an error or skipping them
        const invitedUserIds = users.map(user => user._id);

        // Create the challenge object
        const challenge = new Challenge({
            challengeName,
            potAmount: initialPotAmount,
            participants: [creatorId], // Include the creator as a participant
            invitations: invitedUserIds, // Add the invited users' IDs
            // Assuming 'transactions' is a part of your schema and you want to track the initial pot contribution
            transactions: [{
                participant: creatorId,
                amount: initialPotAmount
            }],
            startDate,
            endDate,
            duration
        });

        // Save the new challenge to the database
        const savedChallenge = await challenge.save();

        // If you want to send notifications to invited users, do it here

        // If all goes well, send back the created challenge
        res.status(201).json(savedChallenge);
    } catch (error) {
        // If there's any error, send back an error message
        res.status(500).json({ message: 'An error occurred while creating the challenge.', error: error.message });
    }
};

exports.getUserChallenges = async (req, res) => {
    const userId = req.params.userId; // or req.user._id if extracting from JWT token

    try {
        // Find challenges where the user is a participant
        const participantChallenges = await Challenge.find({ participants: userId });
        
        // Optionally, find challenges where the user is the creator
        // Adjust this query based on your schema's way of tracking challenge creators
        const creatorChallenges = await Challenge.find({ 'transactions.participant': userId });

        // Combine the challenges from both queries
        // Note: This simplistic approach may include duplicates if a user is both participant and creator
        const combinedChallenges = [...participantChallenges, ...creatorChallenges];

        res.json(combinedChallenges);
    } catch (error) {
        console.error('Failed to get user challenges:', error);
        res.status(500).send('Error retrieving user challenges');
    }
};
