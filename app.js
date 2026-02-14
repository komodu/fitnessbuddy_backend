// Env File
require("dotenv").config();

// Require

const express = require("express");
const exerciseRoutes = require("./routes/exercises");
const dashboardRoute = require("./routes/dashboard.route");
const workoutTypeRoutes = require("./routes/workoutType");
const authRoutes = require("./routes/auth.routes");
const workoutSessionRoute = require("./routes/workoutsessions");
const cors = require("cors");
// Require Cookie Parser
const cookieParser = require("cookie-parser");
const workoutPlanRouter = require("./routes/workout-plan");

// Express App
const app = express();

//Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://127.0.0.1:3000",
    // methods: ["GET","POST","PUT","DELETE"],
    credentials: true,
  }),
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routings
app.use("/api/exercise", exerciseRoutes);
app.use("/api/workout-types", workoutTypeRoutes);
app.use("/api/workoutplan", workoutPlanRouter);
app.use("/api/auth", authRoutes);
app.use("/api/today", dashboardRoute);
app.use("/api/workout-sessions", workoutSessionRoute);
module.exports = app;
