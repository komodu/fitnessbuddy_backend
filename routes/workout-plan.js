const express = require("express");
const authenticateToken = require("../middlewares/auth.middleware");
const {
  createUserPlan,
  getWorkoutPlansTemplates,
  createWorkoutPlanTemplate,
  getTodayWorkout,
} = require("../controllers/workoutPlan.controller");
const workoutPlanRouter = express.Router();

workoutPlanRouter.get("/today", authenticateToken, getTodayWorkout);

workoutPlanRouter.post("/", createWorkoutPlanTemplate);
workoutPlanRouter.get("/", getWorkoutPlansTemplates);
workoutPlanRouter.post("/userplan", authenticateToken, createUserPlan);
module.exports = workoutPlanRouter;
