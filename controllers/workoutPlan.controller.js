const UserWorkoutPlan = require("../models/userWorkoutPlan");

const getWorkoutForDate = require("../utils/getWorkoutForDates");
const generateWeeklySchedule = require("../utils/generateWeeklySchedule.js");

const WorkoutType = require("../models/workoutType.js");
const WorkoutPlanTemplate = require("../models/workoutPlanTemplate.js");

const createWorkoutPlanTemplate = async (req, res) => {
  try {
    console.log("reqbody1: ", req.body);
    const {
      name,
      daysPerWeek,
      workoutTypeIds, // array from frontend
    } = req.body;
    console.log("reqbody2: ", req.body);

    // Find REST workout type
    const restWorkoutType = await WorkoutType.findOne({ name: "Rest" });

    if (!restWorkoutType) {
      await WorkoutType.create({ name: "Rest" });
      res.status(201).json({
        message: "Rest workout type not found, and created it successfully",
      });
    }

    //  Generate weekly schedule
    const weeklySchedule = generateWeeklySchedule(
      workoutTypeIds,
      restWorkoutType._id,
    );

    //  Save template
    const template = await WorkoutPlanTemplate.create({
      name,
      daysPerWeek,
      weeklySchedule,
    });

    res.status(201).json(template);
  } catch (err) {
    res.status(500).json({ error: err.message, req: req.body });
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
