const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
    challenge: { type: Schema.Types.ObjectId, ref: 'Challenge', required: true },
    participant: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    photo: { type: Buffer, required: true }, // For binary data; adjust as needed for GridFS
    submittedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', submissionSchema);
