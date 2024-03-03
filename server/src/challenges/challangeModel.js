const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    challengeId:{type: mongoose.Schema.Types.ObjectId},
    challengeName: { type: String, required: true },
    potAmount: { type: Number, required: true },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    submissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission'
    }]
    // Consider adding a status field to indicate if the challenge is active, completed, etc.
});


module.exports = mongoose.model('Challenge', challengeSchema);
