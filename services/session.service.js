const WorkoutSessionModel = require("../models/workoutSession");

const getAllSessionService = async ({ userId }) => {
  const sessions = await WorkoutSessionModel.find({ user: userId });

  if (!sessions) throw new Error("Service Error Fetching Sessions");

  return sessions;
};

module.exports = { getAllSessionService };
