const express = require("express");
const { getTodayWorkout } = require("../controllers/dashboard.controller");
const authToken = require("../middlewares/auth.middleware");
const dashboardRoutes = express.Router();

dashboardRoutes.get("/", authToken, getTodayWorkout);

module.exports = dashboardRoutes;
