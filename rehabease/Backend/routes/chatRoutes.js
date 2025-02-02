const express = require("express");
const Message = require("../models/Message");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

// Get chat history between a patient and a therapist
router.get("/:recipientId/:recipientType", verifyToken, async (req, res) => {
  try {
    const { recipientId, recipientType } = req.params;
    const senderId = req.user.id;
    const senderType = req.user.role;

    const messages = await Message.find({
      $or: [
        { sender: senderId, senderType, recipient: recipientId, recipientType },
        { sender: recipientId, senderType: recipientType, recipient: senderId, recipientType: senderType }
      ]
    })
    .sort({ timestamp: 1 })
    .limit(100); // Limit to last 100 messages for performance

    res.status(200).json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Mark messages as read
router.post("/read/:senderId", verifyToken, async (req, res) => {
  try {
    const { senderId } = req.params;
    const recipientId = req.user.id;

    await Message.updateMany(
      { sender: senderId, recipient: recipientId, read: false },
      { $set: { read: true } }
    );

    res.status(200).json({ message: "Messages marked as read" });
  } catch (error) {
    console.error("Error marking messages as read:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
