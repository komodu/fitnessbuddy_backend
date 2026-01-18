const mongoose = require("mongoose");

const DaySchema = new mongoose.Schema({
  day: { type: String, required: true, unique: true },
  workoutName: { type: String, required: false },
});

module.exports = mongoose.model("Day", DaySchema);
