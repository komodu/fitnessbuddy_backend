const UserWorkoutPlan = require("../models/userWorkoutPlan");
const getWorkoutForDate = require("../utils/getWorkoutForDates");
const Execise = require("../models/exerciseModel");

const getTodayWorkout = async (req, res) => {
  // Ensures Token is processed
  const userId = req.user.id;

  // Checks the User's Workout Plan
  // TODO! : Workout Plan Duration must be monitored
  const userPlan = await UserWorkoutPlan.findOne({
    user: userId,
  }).populate({
    path: "planTemplate",
    populate: {
      path: "weeklySchedule.monday weeklySchedule.tuesday weeklySchedule.wednesday weeklySchedule.thursday weeklySchedule.friday weeklySchedule.saturday weeklySchedule.sunday",
    },
  });
  console.log("userPlan: ", userPlan);
  if (!userPlan) {
    return res.status(404).json({ message: "No workout plan found" });
  }

  // Get Today's Workout
  const today = new Date();
  const workoutType = getWorkoutForDate(today, userPlan.planTemplate);

  // Find Exercises for the Day based on Workout Type Assigned on the Day
  const exercisesForTheDay = await Execise.find({
    workoutType: workoutType.exercises._id,
  });

  if (!exercisesForTheDay) {
    return res
      .status(404)
      .json({ message: `No workouts assigned to ${workoutType.name}` });
  }

  // Returns the value needed for Display

  res.json({
    date: today,
    day: workoutType.day,
    name: workoutType.exercises.name,
    exercisesForTheDay,
  });
};

module.exports = { getTodayWorkout };
