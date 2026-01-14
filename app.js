// Env File
require('dotenv').config();

// Require
const express = require("express");
const workoutRoutes = require("./routes/workouts")
const workoutTypeRoutes = require("./routes/workoutType")
const autRoutes = require("./routes/auth.routes")
const cors = require("cors")
// Require Cookie Parser
const cookieParser = require('cookie-parser');

// Express App
const app = express();

//Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:3000",
    // methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}))

app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})



// Routings
app.use('/api/workout', workoutRoutes);
app.use('/api/workout-types', workoutTypeRoutes);
app.use('/api/auth', autRoutes)

module.exports = app;