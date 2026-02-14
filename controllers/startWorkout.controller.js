const startSession = require("../services/startWorkout.service");
const startWorkoutController = async (req, res) => {
  const userId = req.user.id;
  const { planId, workoutTypeId } = req.body;
  console.log("planId: ", planId);
  console.log("workoutTypeId: ", workoutTypeId);
  console.log("start: ", req.body);
  try {
    const workoutSession = await startSession({
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

module.exports = startWorkoutController;
