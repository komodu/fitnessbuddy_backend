const {
  startSessionService,
  getActiveService,
} = require("../services/startWorkout.service");

const startSessionController = async (req, res) => {
  const userId = req.user.id;
  const { planId, workoutTypeId } = req.body;
  console.log("planId: ", planId);
  console.log("workoutTypeId: ", workoutTypeId);
  console.log("start: ", req.body);
  try {
    const workoutSession = await startSessionService({
      userId,
      planId,
      workoutTypeId,
    });
    console.log("workoutSess: ", workoutSession);
    res.status(200).json(workoutSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getActiveSession = async (req, res) => {
  const userId = req.user.id;
  const today = new Date();
  try {
    const activeSession = await getActiveService({ userId, today });

    res.status(200).json(activeSession);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const addSet = async (req, res) => {
  const userId = req.user._id; // authenticated user
  const today = new Date();
  const { exerciseId, reps, weight, duration, restTime } = req.body;

  // Find active session
  const session = await WorkoutSession.findOne({
    user: userId,
    status: "active",
    startTime: today,
  });
  if (!session) {
    return res.status(400).json({ message: "No active workout session found" });
  }

  // Find the exercise in the session
  const exerciseEntry = session.exercises.find(
    (ex) => ex.exercise.toString() === exerciseId,
  );
  if (!exerciseEntry) {
    return res
      .status(400)
      .json({ message: "Exercise not part of this session" });
  }

  // Add the new set
  exerciseEntry.sets.push({
    reps,
    weight,
    duration,
    restTime, //! Currently defaulted to 60 : must be dynamic based on the User's Profile
    completedAt: new Date(),
  });

  // Update totalVolume
  session.totalVolume = session.exercises.reduce((total, ex) => {
    return (
      total + ex.sets.reduce((sum, s) => sum + s.reps * (s.weight || 0), 0)
    );
  }, 0);

  await session.save();

  res.json(session); // return updated session
};
module.exports = { getActiveSession, startSessionController, addSet };
