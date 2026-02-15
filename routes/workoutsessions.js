const express = require("express");
const {
  startSessionController,
  getActiveSession,
} = require("../controllers/workoutSession.controller");
const authToken = require("../middlewares/auth.middleware");
const sessionRouter = express.Router();

sessionRouter.post("/start", authToken, startSessionController);
sessionRouter.get("/", authToken, getActiveSession);
module.exports = sessionRouter;
