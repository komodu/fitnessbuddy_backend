const {
  getExercisesService,
  getSingleExerciseService,
  createExerciseService,
  deleteExerciseService,
  updateExerciseService,
} = require("../services/exercise.service");

// API

// Get all Exercises and Populate value 'name'
const getExercises = async (req, res) => {
  try {
    const exercises = await getExercisesService();
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

    const exercise = await getSingleExerciseService(id);

    return exercise;
  } catch (error) {
    console.log(error);
  }
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
    const exercise = await createExerciseService({
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
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(404).json({ error: "No such exercise" });
  // }

  const exercise = await deleteExerciseService({ _id: id });
  if (!exercise) {
    return res.status(400).json({ error: "No such exercise" });
  }
  res.status(200).json(exercise);
};

// Update/Put a workout
const updateExercise = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(404).json({ error: "No such exercise" });
  // }

  const exercise = await updateExerciseService(id, data);
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
