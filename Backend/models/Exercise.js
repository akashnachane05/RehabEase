const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  category: { type: String, required: true }, // e.g., "The Shoulder Rehabilitation"
  exercises: [
    {
      therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist' },
      patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
      name: { type: String, required: true },
      description: { type: String, required: true },
      video: { type: String, required: true },
      sets: { type: Number, required: true },
      reps: { type: Number, required: true },
      symptoms: { type: [String], required: true }, // Array of symptoms
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }, // Add createdBy field to reference Patient
      createdbytherapist: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist' } 
    }
  ]
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
