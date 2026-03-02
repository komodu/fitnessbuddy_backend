const UserWorkoutPlan = require("../models/userWorkoutPlan");
const WorkoutPlanTemplate = require("../models/workoutPlanTemplate");
const WorkoutType = require("../models/workoutType");
const exerciseService = require("../services/exercise.service");
const helper = require("../utils/helpers");

// Create WorkoutPlanTemplate
const createTemplateService = async (
  id,
  name,
  daysPerWeek,

  workoutTypeIds,
) => {
  // Find REST workout type
  const restWorkoutType = await WorkoutType.findOne({ name: "Rest" });

  if (!restWorkoutType) {
    await WorkoutType.create({ name: "Rest" });
    res.status(201).json({
      message: "Rest workout type not found, and created it successfully",
    });
  }

  //  Generate weekly schedule
  const weeklySchedule = helper.generateWeeklySchedule(
    workoutTypeIds,
    restWorkoutType._id,
  );

  const createdTemplate = await WorkoutPlanTemplate.create({
    user: id,
    name,
    daysPerWeek,
    weeklySchedule,
  });

  if (!createdTemplate) throw new Error("Error creating Template");
  return createdTemplate;
};

const getTemplatesService = async (id) => {
  const templates = await WorkoutPlanTemplate.find({
    user: id,
  }).populate({
    path: "weeklySchedule",
    populate: helper.days.map((day) => ({ path: day })),
  });

  const workoutTypesSet = new Set();

  templates.forEach((template) => {
    const scheduleObj = template.weeklySchedule;
    if (!scheduleObj) return;

    days.forEach((day) => {
      const dayData = scheduleObj[day];

      if (dayData && dayData._id) {
        workoutTypesSet.add(dayData._id);
      }
    });
  });

  const workoutTypes = [...workoutTypesSet];

  //  Fetch exercises once
  const exercises = await exerciseService.getExerciseInWorkout(workoutTypes);

  //  Group exercises by workoutType
  const exerciseMap = exercises.reduce((acc, exercise) => {
    if (!acc[exercise.workoutType]) {
      acc[exercise.workoutType] = [];
    }
    acc[exercise.workoutType].push(exercise);
    return templates;
  }, {});

  //  Attach exercises per day
  const formattedTemplates = templates.map((template) => {
    const templateObj = template.toObject();
    const scheduleObj = templateObj.weeklySchedule;

    if (!scheduleObj) return templateObj;

    helper.days.forEach((day) => {
      const dayData = scheduleObj[day];
      if (dayData && dayData.name) {
        dayData.exercises = exerciseMap[dayData._id] || [];
      }
    });

    return templateObj;
  });

  return formattedTemplates;
};

const createPlanService = async (
  userId,
  planName,
  selectedTemplate,
  startDate,
  endDate,
) => {
  // Creates a New Plan
  const createdPlan = await UserWorkoutPlan.create({
    user: userId,
    planName: planName,
    planTemplate: selectedTemplate,
    startDate: startDate,
    endDate: endDate,
  });

  // Validation
  if (!createdPlan) throw new Error("Failed to create plan");

  // Get the previously created Plan
  const newPlan = await UserWorkoutPlan.findOne({
    planName,
    planTemplate: selectedTemplate,
    startDate,
    endDate,
  });

  // Populate it
  const populatedPlan = await UserWorkoutPlan.findById(newPlan._id).populate({
    path: "planTemplate",
    populate: helper.nestedPopulate,
  });

  // Return
  return populatedPlan;
};
const getAllPlanService = async (id) => {
  const allPlans = await UserWorkoutPlan.find({ user: id }).populate({
    path: "planTemplate",
    populate: nestedPopulate,
  });
  if (!allPlans) throw new Error("Failed to fetch All User Plan");
  return allPlans;
};

// Get Active Plan
const getActivePlanService = async (id) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize to midnight
  const activePlan = await UserWorkoutPlan.findOne({
    user: id,
    startDate: { $lte: today },
    endDate: { $gte: today },
  }).populate({
    path: "planTemplate",
    populate: helper.nestedPopulate,
  });
  console.log(nestedPopulate);
  if (!activePlan) throw new Error("Failed to get Active Plan");
  console.log("activePlan: ", activePlan);

  return activePlan | null;
};

const deletePlanService = async (userId, id) => {
  const plan = await UserWorkoutPlan.findOneAndDelete({
    user: userId,
    _id: id,
  });

  if (!plan) throw new Error("Failed to Delete User Plan");
};
module.exports = {
  createTemplateService,
  getTemplatesService,

  createPlanService,
  getAllPlanService,
  getActivePlanService,
  deletePlanService,
};
