const express = require('express')
const { getWorkoutTypes } = require('../controllers/workoutTypeController.js') 
// or create a dedicated workoutTypeController if you want
const router = express.Router()

router.get('/', getWorkoutTypes)

module.exports = router