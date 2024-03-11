// /controllers/messageController.js
const Message = require('./messageModel');

// Assuming req.user is set by verifyToken middleware
exports.postMessage = async (req, res) => {
    try {
        const { challengeId, text, photoUrl } = req.body;
        const senderId = req.user._id; // Use the authenticated user's ID

        const message = await Message.create({
            challengeId,
            senderId,
            text,
            photoUrl
        });

        // Additional logic like emitting to Socket.IO omitted for brevity

        res.status(201).json({ success: true, data: message });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


exports.getMessages = async (req, res) => {
    try {
        const { challengeId } = req.params;
        
        // Populate the 'senderId' field with the user's 'fullName' from the User collection.
        const messages = await Message.find({ challengeId })
                                       .populate('senderId', 'fullName') // Populates only the 'fullName' of the user
                                       .sort({ createdAt: 1 });

        // Construct a new response structure that includes the user's fullName
        const modifiedMessages = messages.map(message => {
            return {
                ...message.toObject(), // Convert the mongoose document to a plain JavaScript object
                senderFullName: message.senderId.fullName, // Add the sender's fullName to the message object
            };
        });

        res.status(200).json({ success: true, count: messages.length, data: modifiedMessages });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

