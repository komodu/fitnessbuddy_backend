// Require Express
const express = require("express");
const auth = require("../middlewares/auth.middleware");
const {
  createExercise,
  getExercises,
  getSingleExercise,
  deleteExercise,
  updateExercise,
} = require("../controllers/exerciseControllers");

// Router application
const router = express.Router();

// Middleware
router.use(auth);

//GET all workout
router.get("/", getExercises);

//GET single workout
router.get("/:id", getSingleExercise);

//Create a new workout (POST)
router.post("/", createExercise);

// Delete a workout
router.delete("/:id", deleteExercise);

// Update a workout
router.put("/:id", updateExercise);

module.exports = router;
