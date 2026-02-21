const express = require("express");
const {
  startSessionController,
  getActiveSession,
  addSet,
  completeSet,
} = require("../controllers/workoutSession.controller");
const authToken = require("../middlewares/auth.middleware");
const sessionRouter = express.Router();

sessionRouter.post("/start", authToken, startSessionController);
sessionRouter.get("/", authToken, getActiveSession);
sessionRouter.post("/add-set", authToken, addSet);
sessionRouter.patch("/complete", authToken, completeSet);
module.exports = sessionRouter;
