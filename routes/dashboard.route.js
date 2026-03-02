const express = require("express");
const dashboardController = require("../controllers/dashboard.controller");
const authToken = require("../middlewares/auth.middleware");
const dashboardRoutes = express.Router();

dashboardRoutes.get("/", authToken, dashboardController.getTodayWorkout);

module.exports = dashboardRoutes;
