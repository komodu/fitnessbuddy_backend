const WorkoutSession = require("../models/workoutSession");
const WorkoutType = require("../models/workoutType");
const Exercises = require("../models/exerciseModel");

const startSessionService = async ({ userId, planId, workoutTypeId }) => {
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
  const endTime = new Date();
  endTime.setHours(23, 59, 59);
  console.log("endTime: ", endTime);
  //  Create session
  const workoutSession = await WorkoutSession.create({
    user: userId,
    plan: planId,
    startTime: new Date(),
    endTime: endTime,
    status: "active",
    workoutTypes: [formattedWorkoutType],
  });

  return workoutSession;
};

const getActiveService = async ({ userId, today }) => {
  const workoutSession = await WorkoutSession.findOne({
    user: userId,
    status: "active",
    startTime: { $lte: today },
    endTime: { $gte: today },
  });
  if (!workoutSession) throw new Error("No workout session found");
  return workoutSession;
};

module.exports = { startSessionService, getActiveService };
