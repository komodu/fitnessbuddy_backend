const getWorkoutForDays = require("../utils/getWorkoutForDays");
const {
  getTodayWorkoutPlanService,
  getTodayExerciseService,
} = require("../services/dashboard.service");

const getTodayWorkout = async (req, res) => {
  // Ensures Token is processed
  const userId = req.user.id;

  // Checks the User's Workout Plan
  const userPlan = await getTodayWorkoutPlanService({
    user: userId,
  });
  console.log("userPlan: ", userPlan);
  if (!userPlan) {
    return res.status(404).json({ message: "No workout plan found" });
  }

  // Get Today's Workout
  const today = new Date();
  const workoutType = getWorkoutForDays(today, userPlan.planTemplate);

  // Find Exercises for the Day based on Workout Type Assigned on the Day
  const exercisesForTheDay = await getTodayExerciseService({
    workoutType: workoutType.exercises._id,
  });

  if (!exercisesForTheDay) {
    return res
      .status(404)
      .json({ message: `No workouts assigned to ${workoutType.name}` });
  }

  // Returns the value needed for Display

  res.json({
    plan: userPlan,
    date: today,
    day: workoutType.day,
    name: workoutType.exercises.name,
    exercisesForTheDay,
  });
};

module.exports = { getTodayWorkout };
