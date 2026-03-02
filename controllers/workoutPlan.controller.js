const workoutPlanService = require("../services/workoutPlan.service.js");

const createTemplate = async (req, res) => {
  try {
    const {
      name,
      daysPerWeek,
      workoutTypeIds, // array from frontend
    } = req.body;

    //  Call Service to create template
    const template = await workoutPlanService.createTemplateService({
      workoutTypeIds,
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

const getTemplates = async (req, res) => {
  try {
    const id = req.user.id;
    //  Populate weeklySchedule and nested day refs
    const templates = await workoutPlanService.getTemplatesService(id);

    res.status(200).json(templates);
  } catch (error) {
    console.error("getWorkoutPlansTemplates error:", error);
    res.status(500).json({
      message: "Failed to fetch workout templates",
      error: error.message,
    });
  }
};

// UserWorkoutPlans
const createPlan = async (req, res) => {
  try {
    const createdPlan = await workoutPlanService.createPlanService({
      user: userId,
      planName: planName,
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
    const { id } = req.user.id;
    const allPlans = await getAllUserPlanService(id);

    res.status(200).json(allPlans);
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ message: error.message });
  }
};

const getActivePlan = async (req, res) => {
  try {
    const id = req.user.id;
    const activePlan = await getActivePlanService(id);

    res.status(200).json(activePlan);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteWorkoutPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    console.log("PLAN:ID:::", id);
    const plan = await deletePlanService(userId, id);

    if (!plan) return res.status(400).json({ error: "No such Workout Plan" });
    res.status(200).json(plan);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getTemplates,
  createTemplate,

  deleteWorkoutPlan,
  getAllUserPlan,
  getActivePlan,
  createPlan,
};
