const WorkoutSession = require("../models/workoutSession");
const { getAllSessionService } = require("../services/session.service");
// ! REFACTOR : Controllers are for logics, Service are the ones who communicate with Models
const {
  startSessionService,
  getSessionTodayService,
} = require("../services/startWorkout.service");

const startSessionController = async (req, res) => {
  const userId = req.user.id;
  const { planId, workoutTypeId } = req.body;

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

const getAllSessions = async (req, res) => {
  const userId = req.user.id;
  try {
    const allSessions = await getAllSessionService({ userId });

    if (!allSessions) throw new Error("Error fetching all Sessions");
    console.log("SEISOSN: ", allSessions);
    res.status(200).json(allSessions);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getTodaySession = async (req, res) => {
  const userId = req.user.id;
  const today = new Date();
  try {
    const todaySession = await getSessionTodayService({ userId, today });
    res.status(200).json(todaySession);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const addSet = async (req, res) => {
  const userId = req.user.id;
  const { exerciseId, reps, weight, duration, restTime } = req.body;

  const session = await WorkoutSession.findOne({
    user: userId,
    status: "active",
  });

  if (!session) {
    return res.status(400).json({ message: "No active workout session found" });
  }

  let exerciseEntry = null;
  //!  ISSUE: Validation Needed in fetching workoutsess when workout is not completed

  for (const workoutType of session.workoutTypes) {
    const found = workoutType.exercises.find((ex) => {
      return ex.exercise.toString() == exerciseId.toString();
    });
    console.log("found: ", found);
    if (found) {
      exerciseEntry = found;
      break;
    }
  }

  if (!exerciseEntry) {
    return res
      .status(400)
      .json({ message: "Exercise not part of this session" });
  }

  exerciseEntry.sets.push({
    reps,
    weight,
    duration,
    restTime,
    completedAt: new Date(),
  });

  session.totalVolume = session.workoutTypes.reduce((total, wt) => {
    return (
      total +
      wt.exercises.reduce((exerciseTotal, ex) => {
        return (
          exerciseTotal +
          ex.sets.reduce(
            (setTotal, s) => setTotal + s.reps * (s.weight || 0),
            0,
          )
        );
      }, 0)
    );
  }, 0);

  await session.save();

  res.json(session);
};

const completeSet = async (req, res) => {
  const today = new Date();
  const { sessionId } = req.body;

  console.log("complete: ", sessionId);
  if (!sessionId) {
    return res.status(400).json({ message: "Session ID is Required" });
  }

  const session = await WorkoutSession.findOneAndUpdate({
    _id: sessionId,
    user: req.user.id,
    status: "active",
    startTime: { $lte: today },
    endTime: { $gte: today },
  });

  if (!session) {
    return res.status(400).json({ message: "Session not found" });
  }
  if (session.status === "completed") {
    return res.status(400).json({
      message: "Workout already completed for today",
    });
  }

  // Mark as completed
  session.status = "completed";

  await session.save();
  return res.status(200).json(session);
};
module.exports = {
  completeSet,
  getTodaySession,
  getAllSessions,
  startSessionController,
  addSet,
};
