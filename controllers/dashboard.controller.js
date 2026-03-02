const dashboardService = require("../services/dashboard.service");

const getTodayWorkout = async (req, res) => {
  // Ensures Token is processed
  const userId = req.user.id;

  // Checks the User's Workout Plan
  const userPlan = await dashboardService.getTodayExerciseByWorkoutType({
    user: userId,
  });
  console.log("userPlan: ", userPlan);

  if (!userPlan) {
    return res.status(404).json({ message: "No workout plan found" });
  }

  // Returns the value needed for Display

  res.status(200).json(userPlan);
};

module.exports = { getTodayWorkout };
