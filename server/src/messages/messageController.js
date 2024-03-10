const Message = require('./messageModel'); // Assuming you have a Message model

exports.getMessages = async (req, res) => {
    const { challengeId } = req.params;

    try {
        const messages = await Message.find({ challengeId }).populate('senderId', 'name');
        res.json(messages);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching messages', error: error.toString() });
    }
};

exports.sendMessage = async (req, res) => {
    const { challengeId } = req.params;
    const { senderId, text, photoUrl } = req.body; // Ensure you handle authentication to get senderId

    try {
        const newMessage = new Message({
            challengeId,
            senderId,
            text,
            photoUrl, // Optional, handle accordingly
            createdAt: new Date()
        });

        await newMessage.save();
        res.status(201).send({ message: 'Message sent successfully', data: newMessage });
    } catch (error) {
        res.status(500).send({ message: 'Error sending message', error: error.toString() });
    }
};
