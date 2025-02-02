const mongoose = require('mongoose');

const ExerciseRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient', // Assuming you have a User model
    required: true
  },
  exerciseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise', // Assuming you have an Exercise model
    required: true
  },
  poseData: {
    type: Array, // Adjust the type based on your data structure
    required: true
  },
  feedback: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const ExerciseRecord = mongoose.model('ExerciseRecord', ExerciseRecordSchema);

module.exports = ExerciseRecord; 