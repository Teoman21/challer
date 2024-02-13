const router = require("express").Router();
const Conversation = require("../models/conversationModel");

// CREATE NEW CONVERSATION
router.post("/createConversation", async (req, res) => {
  try {
    // Check if a conversation between these members already exists
    const existingConversation = await Conversation.findOne({
      members: { $all: [req.body.senderId, req.body.receiverId] },
    });
    if (existingConversation) {
      // If the conversation already exists, return it
      return res.status(200).json(existingConversation);
    }

    // If not, create a new conversation
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });

    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);

  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER CONVERSATION
router.get("/userConversations", async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const conversations = await Conversation.find({
      members: { $in: [userId] },
    });

    if (!conversations.length) {
      return res.status(404).json({ message: "No conversations found" });
    }

    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json({ message: "Error fetching conversations", error: err.message });
  }
});

// GET 2 USERS' CONVERSATION PASSIVE
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId],$size: 2 },
    });

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json({ message: "Error finding conversation", error: err.message });
  }
});

module.exports = router;