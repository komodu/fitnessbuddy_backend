const exerciseService = require("../services/exercise.service");

// API

// Get all Exercises and Populate value 'name'
const getExercises = async (req, res) => {
  try {
    const exercises = await exerciseService.getExercisesService();
    res.status(200).json(exercises);
  } catch (error) {
    console.error("Error fetching Exercise: ", error);
    res.status(500).json({ error: "Failed to fetch Exercises" });
  }
};

// Get Single Exercise
const getSingleExercise = async (req, res) => {
  try {
    const { id } = req.params;

    const exercise = await exerciseService.getSingleExerciseService(id);

    return exercise;
  } catch (error) {
    console.log(error);
  }
};

// Post a new Workout
const createExercise = async (req, res) => {
  const { workoutType, title, set, load, reps } = req.body;

  console.log("create: ", workoutType);
  try {
    const exercise = await exerciseService.createExerciseService({
      workoutType,
      title,
      totalSet: set,
      load,
      reps,
    });
    // Populate to display fkey values after submission
    const populatedWorkout = await exercise.populate("workoutType", "name");

    res.status(200).json(populatedWorkout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a workout
const deleteExercise = async (req, res) => {
  const { id } = req.params;

  const exercise = await exerciseService.deleteExerciseService({ _id: id });
  if (!exercise) {
    return res.status(400).json({ error: "No such exercise" });
  }
  res.status(200).json(exercise);
};

// Update/Put a workout
const updateExercise = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const exercise = await exerciseService.updateExerciseService(id, data);
  if (!exercise) {
    return res.status(400).json({ error: "No such exercise" });
  }

  res.status(200).json(exercise);
};

module.exports = {
  createExercise,
  getExercises,
  getSingleExercise,
  deleteExercise,
  updateExercise,
};
