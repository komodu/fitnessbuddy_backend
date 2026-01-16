// seed/workoutTypeSeed.js
const WorkoutType = require('../models/workoutType.js');

const seedWorkoutTypes = async () => {
  try {
    const types = ['Back', 'Triceps', 'Biceps', 'Chest', 'Shoulders', 'Core', 'Legs'];

    for (const name of types) {
      await WorkoutType.updateOne(
        { name },
        { upsert: true }
      );
    }

    console.log(' Workout types seeded successfully');
  } catch (error) {
    console.error(' Error seeding workout types:', error);
  }
};

module.exports = seedWorkoutTypes;
