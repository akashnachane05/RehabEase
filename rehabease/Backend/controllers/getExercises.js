const Exercise = require("../models/Exercise");
const Patient = require("../models/Patient");
const Therapist = require("../models/Therapist");
const getExercises = async (req, res) => {
  try {
    const { role, id } = req.user;

    if (role === "therapist") {
      // If therapist, fetch all exercises
      const exercises = await Exercise.find();
      return res.status(200).json({ message: "All exercises fetched.", exercises });
    } 
    else if (role === "patient") {
      // If patient, fetch default exercises, own exercises, and exercises assigned by a therapist
      const exercises = await Exercise.find({
        $or: [
          { "exercises.createdBy": null, "exercises.createdbytherapist": null }, // Default exercises
          { "exercises.createdBy": id }, // Exercises created by this patient
          { "exercises.patientId": id } // Exercises created by a therapist for this patient
        ]
      });

      // Filter exercises array to include only relevant ones
      const filteredExercises = exercises.map(category => ({
        category: category.category,
        exercises: category.exercises.filter(exercise => 
          (!exercise.createdBy && !exercise.createdbytherapist) || // Default exercises
          (exercise.createdBy && exercise.createdBy.toString() === id) || // Exercises created by this patient
          (exercise.patientId && exercise.patientId.toString() === id) // Exercises assigned by a therapist for this patient
        )
      }));

      return res.status(200).json({ message: "Exercises fetched.", exercises: filteredExercises });
    }

    res.status(403).json({ message: "Unauthorized role." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getExercises };



