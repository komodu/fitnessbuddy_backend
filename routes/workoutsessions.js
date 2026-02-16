const express = require("express");
const {
  startSessionController,
  getActiveSession,
  addSet,
} = require("../controllers/workoutSession.controller");
const authToken = require("../middlewares/auth.middleware");
const sessionRouter = express.Router();

sessionRouter.post("/start", authToken, startSessionController);
sessionRouter.get("/", authToken, getActiveSession);
sessionRouter.post("/add-set", authToken, addSet);
module.exports = sessionRouter;
