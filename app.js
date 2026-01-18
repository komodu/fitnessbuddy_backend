// Env File
require("dotenv").config();

// Require
const express = require("express");
const exerciseRoutes = require("./routes/exercises");
const workoutTypeRoutes = require("./routes/workoutType");
const authRoutes = require("./routes/auth.routes");
const cors = require("cors");
// Require Cookie Parser
const cookieParser = require("cookie-parser");

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
app.use("/api/auth", authRoutes);

module.exports = app;
