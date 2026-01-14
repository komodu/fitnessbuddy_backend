// Require Express
const express = require('express')
const auth = require("../middlewares/auth.middleware")
const {
    createWorkout,
    getWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout,
} = require('../controllers/workoutControllers')

// Router application
const router = express.Router()

// Middleware 
router.use(auth)

//GET all workout
router.get('/', getWorkouts)

//GET single workout
router.get('/:id', getSingleWorkout)

//Create a new workout (POST)
router.post('/', createWorkout)

// Delete a workout
router.delete('/:id', deleteWorkout)

// Update a workout
router.put('/:id', updateWorkout)

module.exports = router
