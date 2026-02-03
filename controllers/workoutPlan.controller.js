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

  const userPlan = await UserWorkoutPlan.findOne({
    user: userId,
  }).populate({
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

const getWorkoutPlansTemplates = async (req, res) => {
  try {
    const templates = await WorkoutPlanTemplate.find({}).sort({
      createdAt: -1,
    });
    console.log(templates);
    res.status(201).json(templates);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const createUserPlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      planTemplate: selectedTemplate,
      startDate,
      durationWeeks,
    } = req.body;
    console.log(userId);
    console.log(selectedTemplate);
    console.log(startDate);
    console.log(durationWeeks);
    // ! Create validations & date must not conflict

    const createdPlan = await UserWorkoutPlan.create({
      user: userId,
      planTemplate: selectedTemplate,
      startDate: startDate,
      durationWeeks: durationWeeks,
    });
    res.status(201).json({ message: "Success", data: createdPlan });
  } catch (err) {
    console.log("error in creating: ", err);
    res.status(400).json({ message: err.message });
  }
};
module.exports = {
  createUserPlan,
  getWorkoutPlansTemplates,
  getTodayWorkout,
  createWorkoutPlanTemplate,
};
