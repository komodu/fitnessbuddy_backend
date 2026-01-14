const mongoose = require('mongoose');

const workoutTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // ensure no duplicates like two 'Back'
    trim: true,
  }
});
const WorkoutType = mongoose.model('WorkoutType', workoutTypeSchema);
module.exports = WorkoutType;