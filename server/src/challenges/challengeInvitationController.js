const Challenge = require('./challangeModel');
const User = require('../auth/userModel');

exports.sendInvitation = async (req, res) => {
    const { challengeId } = req.params;
    const usernames = req.body.usernames; // Expecting an array of usernames

    try {
        // Convert usernames to user IDs
        const users = await User.find({ 'username': { $in: usernames } });
        if (users.length !== usernames.length) {
            return res.status(404).json({ message: 'One or more usernames not found.' });
        }

        // Add user IDs to the challenge's invitations
        await Challenge.findByIdAndUpdate(challengeId, {
            $addToSet: { invitations: { $each: users.map(user => user._id) } }
        });

        res.status(200).json({ message: 'Invitations sent successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending invitations', error: error.toString() });
    }
};

exports.acceptInvitation = async (req, res) => {
    const { challengeId } = req.params;
    const userId = req.body.userId; // Assuming the user ID is sent in the request body

    try {
        const challenge = await Challenge.findById(challengeId);
        if (!challenge) {
            return res.status(404).json({ message: 'Challenge not found.' });
        }

        if (!challenge.invitations.includes(userId)) {
            return res.status(400).json({ message: 'Invitation not found for this user.' });
        }

        // Move the user from invitations to participants
        await Challenge.findByIdAndUpdate(challengeId, {
            $pull: { invitations: userId },
            $addToSet: { participants: userId }
        });

        res.status(200).json({ message: 'Invitation accepted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error accepting invitation', error: error.toString() });
    }
};

exports.getInvitations = async (req, res) => {
    const { userId } = req.params;

    try {
        // Fetch challenges where userId is in the invitations
        const challenges = await Challenge.find({ invitations: userId })
                                           .populate('creatorId', 'username challengeName');

        res.status(200).json(challenges);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching invitations', error: error.toString() });
    }
};
