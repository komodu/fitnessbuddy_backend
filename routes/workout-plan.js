const express = require("express");
const authenticateToken = require("../middlewares/auth.middleware");
const workoutPlanController = require("../controllers/workoutPlan.controller");
const workoutPlanRouter = express.Router();

workoutPlanRouter.get(
  "/",
  authenticateToken,
  workoutPlanController.getTemplates,
);
workoutPlanRouter.post(
  "/",
  authenticateToken,
  workoutPlanController.createTemplate,
);
workoutPlanRouter.get(
  "/userplan",
  authenticateToken,
  workoutPlanController.getActivePlan,
);
workoutPlanRouter.post(
  "/userplan",
  authenticateToken,
  workoutPlanController.createPlan,
);

workoutPlanRouter.get(
  "/get-plans",
  authenticateToken,
  workoutPlanController.getAllUserPlan,
);

workoutPlanRouter.delete(
  "/delete-plan/:id",
  authenticateToken,
  workoutPlanController.deleteWorkoutPlan,
);
// getActivePlan
module.exports = workoutPlanRouter;
