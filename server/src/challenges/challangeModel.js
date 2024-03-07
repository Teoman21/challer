const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const challengeSchema = new Schema({
    challengeName: {
        type: String,
        required: true,
        trim: true // Removes whitespace from the beginning and end
    },
    potAmount: {
        type: Number,
        required: true
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    invitations: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    submissions: [{
        type: Schema.Types.ObjectId,
        ref: 'Submission'
    }],
    status: {
        type: String,
        required: true,
        enum: ['pending', 'active', 'completed'],
        default: 'pending'
    },
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Adjust 'User' to match the name of your user schema
      },
    // Add other fields or indexes as needed
});


module.exports = mongoose.model('Challenge', challengeSchema);
