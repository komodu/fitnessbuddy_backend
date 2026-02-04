const UserWorkoutPlan = require("../models/userWorkoutPlan");
const getWorkoutForDate = require("../utils/getWorkoutForDates");

const getTodayWorkout = async (req, res) => {
  const userId = req.user.id;
  console.log("today: ", userId);
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

  const today = new Date();
  const workoutType = getWorkoutForDate(today, userPlan.planTemplate);
  console.log("today: ", today);
  console.log("workoutType: ", workoutType);
  res.json({
    date: today,
    workoutType,
  });
};

module.exports = { getTodayWorkout };
