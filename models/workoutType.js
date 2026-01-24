const mongoose = require("mongoose");

const workoutTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // ensure no duplicates like two 'Back'
    trim: true,
  },
});
module.exports = mongoose.model("WorkoutType", workoutTypeSchema);
