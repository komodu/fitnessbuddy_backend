const UserWorkoutPlan = require("../models/userWorkoutPlan");
const WorkoutPlanTemplate = require("../models/workoutPlanTemplate");
const { days } = require("../utils/days");

const nestedPopulate = days.map((day) => ({
  path: `weeklySchedule.${day}`,
}));

const createWorkoutPlanTemplateService = async (
  id,
  name,
  daysPerWeek,
  weeklySchedule,
) => {
  const createdTemplate = await WorkoutPlanTemplate.create({
    user: id,
    name,
    daysPerWeek,
    weeklySchedule,
  });

  if (!createdTemplate) throw new Error("Error creating Template");
  return createdTemplate;
};

const getWorkoutPlanTemplatesService = async (id) => {
  const templates = await WorkoutPlanTemplate.find({
    user: id,
  }).populate({
    path: "weeklySchedule",
    populate: days.map((day) => ({ path: day })),
  });

  return templates;
};

const getAllUserPlanService = async (id) => {
  const allPlans = await UserWorkoutPlan.find({ user: id }).populate({
    path: "planTemplate",
    populate: nestedPopulate,
  });
  if (!allPlans) throw new Error("Failed to fetch All User Plan");
  return allPlans;
};

const getActivePlanService = async (id, today) => {
  console.log("active: userID:", id);
  console.log("Today:", today);
  const activePlan = await UserWorkoutPlan.findOne({
    user: id,
    startDate: { $lte: today },
    endDate: { $gte: today },
  }).populate({
    path: "planTemplate",
    populate: nestedPopulate,
  });
  console.log(nestedPopulate);

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
  createWorkoutPlanTemplateService,
  getWorkoutPlanTemplatesService,
  getAllUserPlanService,
  getActivePlanService,
  deletePlanService,
};
