const WorkoutSession = require("../models/workoutSession");
const WorkoutType = require("../models/workoutType");
const Exercises = require("../models/exerciseModel");

const startSession = async ({ userId, planId, workoutTypeId }) => {
  console.log("session: userid: ", userId);
  console.log("session: PLANID: ", planId);
  console.log("session: workouttypeID: ", workoutTypeId);
  // Fetch workout type from DB
  const workoutType = await WorkoutType.findById(workoutTypeId);

  if (!workoutType) {
    throw new Error("Workout type not found");
  }

  const exercises = await Exercises.find({ workoutType: workoutTypeId });
  if (!exercises) {
    throw new Error("No exercise found");
  }
  //  Build exercises with empty sets
  const formattedWorkoutType = {
    workoutType: workoutType._id,
    exercises: exercises.map((ex) => ({
      exercise: ex._id,
      sets: [], // empty initially
    })),
  };

  //  Create session
  const workoutSession = await WorkoutSession.create({
    user: userId,
    plan: planId,
    startTime: new Date(),
    endTime: null,
    status: "active",
    workoutTypes: [formattedWorkoutType],
  });

  return workoutSession;
};

module.exports = startSession;
