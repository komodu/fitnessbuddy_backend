const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  reps: {
    type: Number,
    required: true
  },
  load: {
    type: Number,
    required: true
  },
  workoutType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WorkoutType', // foreign key relationship
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);