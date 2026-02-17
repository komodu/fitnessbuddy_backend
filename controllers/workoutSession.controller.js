const WorkoutSession = require("../models/workoutSession");

const {
  startSessionService,
  getActiveService,
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

const getActiveSession = async (req, res) => {
  const userId = req.user.id;

  try {
    const activeSession = await getActiveService({ userId });

    res.status(200).json(activeSession);
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

  for (const workoutType of session.workoutTypes) {
    const found = workoutType.exercises.find(
      (ex) => ex.exercise.toString() === exerciseId.toString(),
    );

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

module.exports = { getActiveSession, startSessionController, addSet };
