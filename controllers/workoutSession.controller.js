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
module.exports = { getActiveSession, startSessionController };
