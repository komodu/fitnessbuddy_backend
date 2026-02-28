const { getAllSessionService } = require("../services/workoutSession.service");
// ! REFACTOR : Controllers are for logics, Service are the ones who communicate with Models
const {
  startSessionService,
  getSessionTodayService,

  addSetService,
  completeSetService,
} = require("../services/workoutSession.service");

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

    res.status(200).json(allSessions);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getTodaySession = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date();

    console.log("today session2");
    const todaySession = await getSessionTodayService(userId, today);
    console.log("today session3");

    return res.status(200).json(todaySession);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const addSet = async (req, res) => {
  const userId = req.user.id;
  const { exerciseId, reps, weight, duration, restTime } = req.body;

  const session = await addSetService(userId);

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
  const { id } = req.body;
  const { userId } = req.user.id;
  console.log("complete: ", sessionId);
  if (!sessionId) {
    return res.status(400).json({ message: "Session ID is Required" });
  }

  const session = await completeSetService(id, userId, today);

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
