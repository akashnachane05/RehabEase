const ExerciseRecord = require('../models/ExerciseRecordModel');

const saveExerciseData = async (req, res) => {
  const { userId, exerciseId, poseData, feedback } = req.body;
  try {
    const exerciseRecord = new ExerciseRecord({
      userId,
      exerciseId,
      poseData,
      feedback,
      date: new Date()
    });
    await exerciseRecord.save();
    res.status(201).json({ message: 'Exercise data saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save exercise data' });
  }
};
export { saveExerciseData };
