const Exercise = require("../models/exerciseModel");

const getExercisesService = async () => {
  const exercises = await Exercise.find()
    .sort({ createdAt: -1 })
    .populate("workoutType", "name");

  if (!exercises) throw new Error("Failed to Get Exercises");

  return exercises;
};

const getSingleExerciseService = async (id) => {
  const exercise = await Exercise.findById({ _id: id });

  if (!exercise) throw new Error("Failed to fetch Single Exercise");

  return exercise;
};

const createExerciseService = async (
  workoutType,
  title,
  totalSet,
  load,
  reps,
) => {
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
    return { error: " Please fill in all the fields,", emptyFields };
  }

  const exercise = await Exercise.create(
    workoutType,
    title,
    totalSet,
    load,
    sets,
    reps,
  );
  if (!exercise) throw new Error("Failed to create Exercise");
  return exercise;
};

const updateExerciseService = async (id, data) => {
  const exercise = await Exercise.findOneAndUpdate(
    { _id: id },
    { $set: data },
    { runValidators: true },
  );
  if (!exercise) throw new Error("Failed to update Exercise");
  return exercise;
};

const deleteExerciseService = async (id) => {
  const exercise = await Exercise.findOneAndDelete(id);
  if (!exercise) throw new Error("Failed to Delete Exercise");
  return exercise;
};

const getExerciseInWorkout = async (workoutTypes) => {
  const exercises = await Exercise.find({ workoutType: { $in: workoutTypes } });

  if (!exercises) throw new Error("No WorkoutType Found");

  return exercises;
};
module.exports = {
  getExerciseInWorkout,
  getExercisesService,
  getSingleExerciseService,
  createExerciseService,
  updateExerciseService,
  deleteExerciseService,
};
