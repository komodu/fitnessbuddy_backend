const Exercise = require("../models/exerciseModel");

const mongoose = require("mongoose");

// API

// Get all Exercises and Populate value 'name'
const getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find({})
      .sort({ createdAt: -1 }) // Sort workouts by descending order
      .populate("workoutType", "name"); // Populate the name value
    res.status(201).json(exercises);
  } catch (error) {
    console.error("Error fetching Exercise: ", error);
    res.status(500).json({ error: "Failed to fetch Exercises" });
  }
};

// Get Single Exercise
const getSingleExercise = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const exercise = await Exercise.findById(id);

  if (!exercise) {
    res.status(400).json({ error: "No such workout" });
  }
  res.status(200).json(exercise);
};

// Post a new Workout
const createExercise = async (req, res) => {
  const { workoutType, title, set, load, reps } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (!set) {
    emptyFields.push("set");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: " Please fill in all the fields,", emptyFields });
  }
  console.log("create: ", workoutType);
  try {
    const exercise = await Exercise.create({
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
  console.log("delete_id: ", id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such exercise" });
  }

  const exercise = await Exercise.findOneAndDelete({ _id: id });
  if (!exercise) {
    return res.status(400).json({ error: "No such exercise" });
  }
  res.status(200).json(exercise);
};

// Update/Put a workout
const updateExercise = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such exercise" });
  }

  const exercise = await Exercise.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
  );
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
