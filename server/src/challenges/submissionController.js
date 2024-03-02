const Submission = require('../models/Submission');
const Challenge = require('../models/Challenge');
const moment = require('moment');

exports.addSubmission = async (req, res) => {
    const { challengeId, participantId } = req.body;
    const photo = req.file.buffer; // Assuming photo is uploaded and available as a buffer

    // Check if the challenge exists and is active
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
        return res.status(404).send('Challenge not found.');
    }

    const now = moment();
    const challengeStart = moment(challenge.startTime);
    const challengeEnd = challengeStart.add(challenge.duration, 'days');

    // Check if the current time is within the challenge period
    if (now.isBefore(challengeStart) || now.isAfter(challengeEnd)) {
        return res.status(400).send('This challenge is not currently active.');
    }

    // Check if the user has already submitted a photo today
    const startOfToday = moment().startOf('day');
    const existingSubmission = await Submission.findOne({
        participant: participantId,
        challenge: challengeId,
        submittedOn: { $gte: startOfToday.toDate() }
    });

    if (existingSubmission) {
        return res.status(400).send('You can only submit one photo per day.');
    }

    // Add new submission
    const submission = new Submission({
        challenge: challengeId,
        participant: participantId,
        photo,
        submittedOn: new Date() // Now
    });

    try {
        await submission.save();
        res.status(201).send(submission);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
