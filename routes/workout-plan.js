const express = require("express");
const authenticateToken = require("../middlewares/auth.middleware");
const {
  createUserPlan,
  getWorkoutPlansTemplates,
  createWorkoutPlanTemplate,
  getCurrentUserPlan,
} = require("../controllers/workoutPlan.controller");
const workoutPlanRouter = express.Router();

workoutPlanRouter.post("/", createWorkoutPlanTemplate);
workoutPlanRouter.get("/", getWorkoutPlansTemplates);
workoutPlanRouter.post("/userplan", authenticateToken, createUserPlan);
workoutPlanRouter.get("/userplan", authenticateToken, getCurrentUserPlan);

module.exports = workoutPlanRouter;
