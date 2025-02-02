const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, required: true },
  senderType: { type: String, enum: ['Patient', 'Therapist'], required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, required: true },
  recipientType: { type: String, enum: ['Patient', 'Therapist'], required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
