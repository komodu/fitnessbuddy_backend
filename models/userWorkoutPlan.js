// models/UserWorkoutPlan.js
const { text } = require("express");
const mongoose = require("mongoose");

const userWorkoutPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  planName: {
    type: String,
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
  endDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("UserWorkoutPlan", userWorkoutPlanSchema);
