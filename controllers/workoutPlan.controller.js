const UserWorkoutPlan = require("../models/userWorkoutPlan");

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

    console.log("template: ", template);
    res.status(201).json(template);
  } catch (err) {
    res.status(500).json({ error: err.message, req: req.body });
  }
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
    const { planTemplate: selectedTemplate, startDate, endDate } = req.body;
    console.log(userId);
    console.log(selectedTemplate);
    console.log(startDate);
    console.log(endDate);
    // ! Create validations & date must not conflict

    const createdPlan = await UserWorkoutPlan.create({
      user: userId,
      planTemplate: selectedTemplate,
      startDate: startDate,
      endDate: endDate,
    });
    res.status(201).json({ message: "Success", data: createdPlan });
  } catch (err) {
    console.log("error in creating: ", err);
    res.status(400).json({ message: err.message });
  }
};

const getCurrentUserPlan = async (req, res) => {
  //! TODO: Create controller for this and remove the fetching for every day
};
module.exports = {
  getCurrentUserPlan,
  createUserPlan,
  getWorkoutPlansTemplates,
  createWorkoutPlanTemplate,
};
