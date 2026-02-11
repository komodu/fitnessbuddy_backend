const mongoose = require("mongoose");
const daySchema = {
  type: mongoose.Schema.Types.ObjectId,
  ref: "WorkoutType",
  required: true,
};

const workoutPlanTemplateSchema = new mongoose.Schema({
  name: String, // "5 Day Split"
  daysPerWeek: Number, // 5
  weeklySchedule: {
    monday: daySchema,
    tuesday: daySchema,
    wednesday: daySchema,
    thursday: daySchema,
    friday: daySchema,
    saturday: daySchema,
    sunday: daySchema,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
});
module.exports = mongoose.model(
  "WorkoutPlanTemplate",
  workoutPlanTemplateSchema,
);
