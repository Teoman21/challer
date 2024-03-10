const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    challengeId: {
        type: Schema.Types.ObjectId,
        ref: 'Challenge',
        required: true
    },
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        trim: true,
        required: true
    },
    photoUrl: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Message', messageSchema);
