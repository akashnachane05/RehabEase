const Patient = require("../models/Patient");
const Exercise = require("../models/Exercise");
const addExercise = async (req, res) => {
    try {
      const { category, exercise } = req.body;
  
      // Validate required fields
      if (!category || !exercise || !exercise.name || !exercise.description || !exercise.video || !exercise.sets || !exercise.reps || !exercise.symptoms) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Ensure symptoms are always an array
      const symptoms = Array.isArray(exercise.symptoms)
        ? exercise.symptoms
        : exercise.symptoms.split(",").map((s) => s.trim());
  
      console.log("Symptoms:", exercise.symptoms);
  
      const { name, description, video, sets, reps } = exercise;
  
      // Find the patient profile using the authenticated user's ID
      const patient = await Patient.findById(req.user.id);
  
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }
      const symptomsArray =
          Array.isArray(patient.currentSymptoms) && patient.currentSymptoms.length === 1
            ? patient.currentSymptoms[0].split(",").map((symptom) => symptom.trim())
            : Array.isArray(patient.currentSymptoms)
            ? patient.currentSymptoms
            : [];
  
      console.log("Patient Symptoms:", patient.currentSymptoms);
  
      // Check for 50% symptom match
      const matchingSymptoms = symptoms.filter((symptom) =>
        symptomsArray.includes(symptom)
      );
  
      console.log("Matching Symptoms:", matchingSymptoms);
  
      const matchPercentage = (matchingSymptoms.length / symptoms.length) * 100;
  
      if (matchPercentage < 50) {
        return res.status(400).json({
          message: "At least 50% of the symptoms must match your profile to add this exercise.",
          alert: "Please check your symptoms. At least 50% of the symptoms must match your profile to add this exercise"
        });
      }
  
      // Check if an exercise with the same video already exists
      const existingExercise = await Exercise.findOne({
        category,
        "exercises.video": video,
      });
  
      if (existingExercise) {
        return res.status(400).json({ message: "An exercise with the same video already exists." });
      }
  
      // Create the new exercise object
      const newExercise = {
        name,
        description,
        video,
        sets,
        reps,
        symptoms,
        createdBy: req.user.id, // Reference to the patient
      };
  
      // Find or create the category
      let exerciseCategory = await Exercise.findOne({ category });
  
      if (!exerciseCategory) {
        // If the category doesn't exist, create a new one
        exerciseCategory = new Exercise({ category, exercises: [newExercise] });
      } else {
        // Add the new exercise to the existing category
        exerciseCategory.exercises.push(newExercise);
      }
  
      // Save the updated category
      await exerciseCategory.save();
  
      res.status(201).json({
        message: "Exercise added successfully.",
        exercise: newExercise,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  module.exports = { addExercise };
  