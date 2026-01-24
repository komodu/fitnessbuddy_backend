const UserWorkoutPlan = require("../models/userWorkoutPlan");

const getWorkoutForDate = require("../utils/getWorkoutForDates");
const generateWeeklySchedule = require("../utils/generateWeeklySchedule.js");

const WorkoutType = require("../models/workoutType.js");
const WorkoutPlanTemplate = require("../models/workoutPlanTemplate.js");
const createWorkoutPlanTemplate = async (req, res) => {
  try {
    const {
      name,
      daysPerWeek,
      workoutTypeIds, // array from frontend
    } = req.body;

    // 1️⃣ Find REST workout type
    const restWorkoutType = await WorkoutType.findOne({ name: "Rest" });

    if (!restWorkoutType) {
      return res.status(400).json({ message: "Rest workout type not found" });
    }

    // 2️⃣ Generate weekly schedule
    const weeklySchedule = generateWeeklySchedule(
      workoutTypeIds,
      restWorkoutType._id,
    );

    // 3️⃣ Save template
    const template = await WorkoutPlanTemplate.create({
      name,
      daysPerWeek,
      weeklySchedule,
    });

    res.status(201).json(template);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTodayWorkout = async (req, res) => {
  const userId = req.user.id;

  const userPlan = await UserWorkoutPlan.findOne({ user: userId }).populate({
    path: "planTemplate",
    populate: {
      path: "weeklySchedule.monday weeklySchedule.tuesday weeklySchedule.wednesday weeklySchedule.thursday weeklySchedule.friday weeklySchedule.saturday weeklySchedule.sunday",
    },
  });

  if (!userPlan) {
    return res.status(404).json({ message: "No workout plan found" });
  }

  const today = new Date();
  const workoutType = getWorkoutForDate(today, userPlan.planTemplate);

  res.json({
    date: today,
    workoutType,
  });
};

module.exports = { getTodayWorkout, createWorkoutPlanTemplate };
