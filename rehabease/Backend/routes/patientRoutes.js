const express = require("express");
const { registerPatient, loginPatient} = require("../controllers/authController");
const verifyToken= require('../middlewares/authMiddleware');
const Patient = require("../models/Patient"); //
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


module.exports = router;
