const express = require("express");
const {
  startSessionController,
  getTodaySession,
  addSet,
  completeSet,
  getAllSessions,
} = require("../controllers/workoutSession.controller");
const authToken = require("../middlewares/auth.middleware");

const sessionRouter = express.Router();

sessionRouter.post("/start", authToken, startSessionController);
sessionRouter.get("/", authToken, getTodaySession);
sessionRouter.post("/add-set", authToken, addSet);
sessionRouter.patch("/complete", authToken, completeSet);
sessionRouter.get("/all", authToken, getAllSessions);
module.exports = sessionRouter;
