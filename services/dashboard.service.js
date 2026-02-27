const UserWorkoutPlan = require("../models/userWorkoutPlan");
const Exercise = require("../models/exerciseModel");
// Find today's User WorkoutPlan
const getTodayWorkoutPlanService = async (userId) => {
  try {
    const userTodayWorkout = await UserWorkoutPlan.findOne({
      user: userId,
    }).populate({
      path: "planTemplate",
      populate: {
        path: "weeklySchedule.monday weeklySchedule.tuesday weeklySchedule.wednesday weeklySchedule.thursday weeklySchedule.friday weeklySchedule.saturday weeklySchedule.sunday",
      },
    });

    return userTodayWorkout;
  } catch (error) {
    throw new Error("Error getTodayWorkoutService: ", error);
  }
};

const getTodayExerciseService = (workoutType) => {
  try {
    const exercises = Exercise.find({ workoutType: workoutType });

    return exercises;
  } catch (error) {
    throw new Error("Error getTodayExercises: ", error);
  }
};

module.exports = { getTodayWorkoutPlanService, getTodayExerciseService };
