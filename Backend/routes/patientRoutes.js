const express = require("express");
const { registerPatient, loginPatient} = require("../controllers/authController");
const { addExercise} = require("../controllers/addExercise");
const {getExercises}=require("../controllers/getExercises")
const verifyToken= require('../middlewares/authMiddleware');
const Patient = require("../models/Patient"); //
const exerciseData = require('./exerciseData');
const Exercise = require("../models/Exercise")
const router = express.Router();


router.post("/register", registerPatient);
router.post("/login", loginPatient);
router.get('/profile', verifyToken, async (req, res) => {
    try {
        // Ensure `req.patient.id` is set correctly from verifyToken
        if (!req.user || !req.user.id) {
            return res.status(400).json({ message: 'Patient ID is missing from token.' });
        }

        // Find the patient by ID
        const user = await Patient.findById(req.user.id).select('-password'); // Exclude the password field

        if (!user) {
            return res.status(404).json({ message: 'Patient not found.' });
        }

        res.json({
            name: user.name,
            email: user.email,
            age: user.age,
            dob: user.dob,
            gender: user.gender,
            medicalHistory: user.medicalHistory,
            currentSymptoms: user.currentSymptoms,
          });
          
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.put('/profile', verifyToken, async (req, res) => {
    try {
        const { name, age, dob, gender, medicalHistory, currentSymptoms } = req.body;

        // Ensure `req.patient.id` is set correctly from verifyToken
        if (!req.user || !req.user.id) {
            return res.status(400).json({ message: 'Patient ID is missing from token.' });
        }

        // Update the patient's profile using their ID
        const updatedPatient = await Patient.findByIdAndUpdate(
            req.user.id,
            { name, age, dob, gender, medicalHistory, currentSymptoms },
            { new: true, runValidators: true } // Return the updated patient and apply schema validators
        );

        if (!updatedPatient) {
            return res.status(404).json({ message: 'Patient not found.' });
        }

        res.json({ name: updatedPatient.name,
            email: updatedPatient.email,
            age: updatedPatient.age,
            dob: updatedPatient.dob,
            gender: updatedPatient.gender,
            medicalHistory: updatedPatient.medicalHistory,
            currentSymptoms: updatedPatient.currentSymptoms,
            message: 'Profile updated successfully', user: updatedPatient });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});



// Example Node.js/Express route
// router.get("/exercises", async (req, res) => {
//     try {
//       const exercises = await Exercise.find(); // Fetch exercises from the database
//       res.json(exercises);
//     } catch (err) {
//       res.status(500).json({ message: "Error fetching exercises", error: err.message });
//     }
//   });

// In your backend API (Node.js)
// router.get('/recommended-exercises', async (req, res) => {
//     try {
//       let { userSymptoms } = req.query; // Get symptoms from the query parameters
//       console.log('Received userSymptoms:', userSymptoms); // Log the symptoms
  
//       if (!userSymptoms || userSymptoms.length === 0) {
//         return res.status(400).json({ message: 'No symptoms provided for the user' });
//       }
  
//       // If userSymptoms is a string (comma-separated), convert it to an array
//       if (typeof userSymptoms === 'string') {
//         userSymptoms = userSymptoms.split(',').map(symptom => symptom.trim());
//       }
  
//       if (!Array.isArray(userSymptoms) || userSymptoms.length === 0) {
//         return res.status(400).json({ message: 'Invalid symptoms data' });
//       }
  
//       const exercises = await Exercise.find({
//         'exercises.symptoms': { $in: userSymptoms }
//       });
  
//       if (exercises.length === 0) {
//         return res.status(404).json({ message: 'No exercises found for the given symptoms' });
//       }
      
  
//       res.status(200).json(exercises);
//     } catch (error) {
//       console.error('Error fetching recommended exercises:', error);
//       res.status(500).json({ message: 'Error fetching exercises' });
//     }
//   });

router.get('/recommended-exercises', verifyToken, async (req, res) => {
    try {
      const { userSymptoms } = req.query;
  
      // Validate symptoms input
      if (!userSymptoms || userSymptoms.length === 0) {
        return res.status(400).json({ message: 'No symptoms provided for the user' });
      }
  
      // If symptoms are a string, convert to array
      const symptomsArray = typeof userSymptoms === 'string'
        ? userSymptoms.split(',').map((symptom) => symptom.trim())
        : userSymptoms;
  
      if (!Array.isArray(symptomsArray) || symptomsArray.length === 0) {
        return res.status(400).json({ message: 'Invalid symptoms format' });
      }
  
      // Identify if the user is a patient or a therapist from the middleware
      const { user } = req;
      const userRole = user.role;
  
      // Query logic for therapists (can access all exercises)
      let exercises;
      if (userRole === 'therapist') {
        exercises = await Exercise.find({
          'exercises.symptoms': { $in: symptomsArray }
        });
      } else if (userRole === 'patient') {
        // Query logic for patients (default + their own exercises)
        exercises = await Exercise.find({
          $or: [
            { createdBy: { $exists: false } }, // Default exercises
            { createdBy: user.id } // Patient-specific exercises
          ],
          'exercises.symptoms': { $in: symptomsArray }
        });
      } else {
        return res.status(403).json({ message: 'Unauthorized role' });
      }
  
      // Return exercises if found, else return a 404 response
      if (!exercises || exercises.length === 0) {
        return res.status(404).json({ message: 'No exercises found for the given symptoms' });
      }
  
      res.status(200).json(exercises);
    } catch (error) {
      console.error('Error fetching recommended exercises:', error);
      res.status(500).json({ message: 'Error fetching exercises', error: error.message });
    }
  });
  


  // Route to add a new exercise
router.post("/exercises", verifyToken, addExercise);

router.get("/exercises", verifyToken, getExercises);

// Get all patients
router.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find({}, 'name age dob email gender medicalHistory currentSymptoms');
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
