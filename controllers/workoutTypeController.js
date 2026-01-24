const WorkoutType = require("../models/workoutType");
// API

// Get all workout Types
const getWorkoutTypes = async (req, res) => {
  const workoutTypes = await WorkoutType.find({}).sort({ createdAt: -1 });
  res.status(200).json(workoutTypes);
};
module.exports = {
  getWorkoutTypes,
};
