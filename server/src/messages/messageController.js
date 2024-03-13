// /controllers/messageController.js
const Message = require('./messageModel');

// Import Message model and other necessary modules

exports.postMessage = async (req, res, io) => {
    try {
      const { challengeId, text } = req.body;
      const senderId = req.user._id; // Ensure you have user ID available, adjust as needed
  
      // Create and save the message to MongoDB
      const message = new Message({
        challengeId,
        senderId,
        text,
      });
  
      await message.save();
  
      // Emit the saved message to all clients in the room, including the sender
      io.to(challengeId).emit('newMessage', message);
  
      // Respond to the HTTP request indicating success
      res.status(201).json({ message: 'Message sent successfully', data: message });
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ message: 'Error sending message', error: error.toString() });
    }
  };
  


exports.getMessages = async (req, res) => {
      try {
          const { challengeId } = req.params;
          
          // The existing functionality remains unchanged as it serves the initial load of messages
          const messages = await Message.find({ challengeId })
                                         .populate('senderId', 'fullName')
                                         .sort({ createdAt: 1 });

          const modifiedMessages = messages.map(message => ({
              ...message.toObject(),
              senderFullName: message.senderId.fullName,
          }));

          res.status(200).json({ success: true, count: messages.length, data: modifiedMessages });
      } catch (error) {
          res.status(400).json({ success: false, message: error.message });
      }
  };


  