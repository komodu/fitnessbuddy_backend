const express = require("express");
const authenticateToken = require("../middlewares/auth.middleware");
const {
  createUserPlan,
  getWorkoutPlansTemplates,
  createWorkoutPlanTemplate,
  getActivePlan,
  getAllUserPlan,
  deleteWorkoutPlan,
} = require("../controllers/workoutPlan.controller");
const workoutPlanRouter = express.Router();

workoutPlanRouter.get("/", authenticateToken, getWorkoutPlansTemplates);
workoutPlanRouter.post("/", authenticateToken, createWorkoutPlanTemplate);
workoutPlanRouter.get("/userplan", authenticateToken, getActivePlan);
workoutPlanRouter.post("/userplan", authenticateToken, createUserPlan);

workoutPlanRouter.get("/get-plans", authenticateToken, getAllUserPlan);

workoutPlanRouter.delete(
  "/delete-plan/:id",
  authenticateToken,
  deleteWorkoutPlan,
);
// getActivePlan
module.exports = workoutPlanRouter;
