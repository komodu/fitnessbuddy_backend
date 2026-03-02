const UserWorkoutPlan = require("../models/userWorkoutPlan");
const Exercise = require("../models/exerciseModel");

// utils
const helper = require("../utils/helpers");

// Find today's User WorkoutPlan
const getTodayExerciseByWorkoutType = async (userId) => {
  try {
    F;
    const userPlan = await UserWorkoutPlan.findOne({
      user: userId,
    }).populate({
      path: "planTemplate",
      populate: {
        path: "weeklySchedule.monday weeklySchedule.tuesday weeklySchedule.wednesday weeklySchedule.thursday weeklySchedule.friday weeklySchedule.saturday weeklySchedule.sunday",
      },
    });

    // Get Today's Workout
    const today = new Date();
    // Check workout Type
    const workoutType = helper.getWorkoutForDays(today, userPlan.planTemplate);

    // Get Exercises
    const exercises = Exercise.find({ workoutType: workoutType });

    return {
      exercisesForTheDay: exercises,
      plan: userPlan,
      date: today,
      day: workoutType.day,
      name: workoutType.exercises.name,
    };
  } catch (error) {
    throw new Error("Error getTodayExerciseByWorkoutType: ", error);
  }
};
module.exports = { getTodayExerciseByWorkoutType };
