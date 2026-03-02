const {
  createWorkoutPlanTemplateService,
  getWorkoutPlanTemplatesService,

  getAllUserPlanService,
  getActivePlanService,
  deletePlanService,
} = require("../services/workoutPlan.service.js");

const { getExerciseInWorkout } = require("../services/exercise.service.js");
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
    const {
      name,
      daysPerWeek,
      workoutTypeIds, // array from frontend
    } = req.body;

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
    const template = await createWorkoutPlanTemplateService({
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
  try {
    const id = req.user.id;
    //  Populate weeklySchedule and nested day refs
    const templates = await getWorkoutPlanTemplatesService(id);

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
    const exercises = await getExerciseInWorkout(workoutTypes);

    //  Group exercises by workoutType
    const exerciseMap = exercises.reduce((acc, exercise) => {
      if (!acc[exercise.workoutType]) {
        acc[exercise.workoutType] = [];
      }
      acc[exercise.workoutType].push(exercise);
      return acc;
    }, {});

    //  Attach exercises per day
    const formattedTemplates = templates.map((template) => {
      const templateObj = template.toObject();
      const scheduleObj = templateObj.weeklySchedule;

      if (!scheduleObj) return templateObj;

      days.forEach((day) => {
        const dayData = scheduleObj[day];
        if (dayData && dayData.name) {
          dayData.exercises = exerciseMap[dayData._id] || [];
        }
      });

      return templateObj;
    });

    res.status(200).json(formattedTemplates);
  } catch (error) {
    console.error("getWorkoutPlansTemplates error:", error);
    res.status(500).json({
      message: "Failed to fetch workout templates",
      error: error.message,
    });
  }
};

// UserWorkoutPlans
const createUserPlan = async (req, res) => {
  try {
    const nestedPopulate = days.map((day) => ({
      path: `weeklySchedule.${day}`,
    }));

    const userId = req.user.id;
    const {
      planName,
      planTemplate: selectedTemplate,
      startDate,
      endDate,
    } = req.body;
    console.log(userId);
    console.log(selectedTemplate);
    console.log(startDate);
    console.log(endDate);
    // TODO: ! Create validations & date must not conflict

    const createdPlan = await UserWorkoutPlan.create({
      user: userId,
      planName: planName,
      planTemplate: selectedTemplate,
      startDate: startDate,
      endDate: endDate,
    });

    if (!createdPlan) throw new Error("Failed to create new Plan");
    const newPlan = await UserWorkoutPlan.findOne({
      planName,
      planTemplate: selectedTemplate,
      startDate,
      endDate,
    });

    const populatedPlan = await UserWorkoutPlan.findById(newPlan._id).populate({
      path: "planTemplate",
      populate: nestedPopulate,
    });
    console.log("popultaed:", populatedPlan);
    res.status(201).json({ message: "Success", data: populatedPlan });
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
    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize to midnight

    const activePlan = await getActivePlanService(id, today);

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
  getWorkoutPlansTemplates,
  createWorkoutPlanTemplate,

  deleteWorkoutPlan,
  getAllUserPlan,
  getActivePlan,
  createUserPlan,
};
