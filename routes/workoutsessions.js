const express = require("express");
const startWorkoutController = require("../controllers/startWorkout.controller");
const authToken = require("../middlewares/auth.middleware");
const startWorkoutRouter = express.Router();

startWorkoutRouter.post("/start", authToken, startWorkoutController);

module.exports = startWorkoutRouter;
