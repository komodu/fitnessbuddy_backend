const UserWorkoutPlan = require("../models/userWorkoutPlan");
const Exercises = require("../models/exerciseModel.js");
const generateWeeklySchedule = require("../utils/generateWeeklySchedule.js");

const WorkoutType = require("../models/workoutType.js");
const WorkoutPlanTemplate = require("../models/workoutPlanTemplate.js");
const getWorkoutForDays = require("../utils/getWorkoutForDays.js");
const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

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
      user: req.user.id,
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
  const nestedPopulate = days.map((day) => ({
    path: `${day}`,
  }));
  try {
    const templates = await WorkoutPlanTemplate.find({
      user: req.user.id,
    }).populate({ path: "weeklySchedule", populate: nestedPopulate });
    console.log("TEMPLATES: ", templates);
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

const getAllUserPlan = async (req, res) => {
  console.log("useriD in AllUserPlan Route: ", req.user.id);
  try {
    const nestedPopulate = days.map((day) => ({
      path: `weeklySchedule.${day}`,
    }));

    const allPlans = await UserWorkoutPlan.find({ user: req.user.id }).populate(
      {
        path: "planTemplate",
        populate: nestedPopulate,
      },
    );
    console.log("allPlans: ", allPlans);
    if (!allPlans) {
      throw new Error("User plans not found");
    }

    return res.status(200).json(allPlans);
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({ message: error.message });
  }
};
const getActivePlan = async (req, res) => {
  try {
    const nestedPopulate = days.map((day) => ({
      path: `weeklySchedule.${day}`,
    }));
    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize to midnight

    const activePlan = await UserWorkoutPlan.findOne({
      user: req.user.id,
      startDate: { $lte: today }, // startDate <= today
      endDate: { $gte: today }, // endDate >= today
    }).populate({
      path: "planTemplate",
      populate: nestedPopulate,
    });
    if (!activePlan) {
      return res.status(404).json({ message: "No active workout plan found" });
    }
    console.log("activePlan1zszszszs: ", activePlan);

    return res.status(200).json({ activePlan });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUserPlan,
  getActivePlan,
  createUserPlan,
  getWorkoutPlansTemplates,
  createWorkoutPlanTemplate,
};
