const express = require("express");
const authenticateToken = require("../middlewares/auth.middleware");
const {
  createUserPlan,
  getWorkoutPlansTemplates,
  createWorkoutPlanTemplate,
  getActivePlan,
  getAllUserPlan,
} = require("../controllers/workoutPlan.controller");
const workoutPlanRouter = express.Router();

workoutPlanRouter.post("/", authenticateToken, createWorkoutPlanTemplate);
workoutPlanRouter.get("/", authenticateToken, getWorkoutPlansTemplates);
workoutPlanRouter.post("/userplan", authenticateToken, createUserPlan);

workoutPlanRouter.get("/get-plans", authenticateToken, getAllUserPlan);
workoutPlanRouter.get("/userplan", authenticateToken, getActivePlan);
// getActivePlan
module.exports = workoutPlanRouter;
