// models/UserWorkoutPlan.js
const mongoose = require("mongoose");

const userWorkoutPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  planTemplate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WorkoutPlanTemplate",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  durationWeeks: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("UserWorkoutPlan", userWorkoutPlanSchema);
