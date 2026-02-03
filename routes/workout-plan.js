const express = require("express");
const authenticateToken = require("../middlewares/auth.middleware");
const {
  getTodayWorkout,
  createWorkoutPlanTemplate,
  getWorkoutPlans,
} = require("../controllers/workoutPlan.controller");
const workoutPlanRouter = express.Router();

workoutPlanRouter.get("/today", authenticateToken, getTodayWorkout);

workoutPlanRouter.post("/", createWorkoutPlanTemplate);
workoutPlanRouter.get("/", getWorkoutPlans);
module.exports = workoutPlanRouter;
