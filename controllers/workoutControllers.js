const Workout = require('../models/workoutModel')

const mongoose = require('mongoose')
// API

// Get all workout and Populate value 'name'
const getWorkouts = async (req, res) =>{
    try{
        const workouts = await Workout.find({})
        .sort({ createdAt: -1}) // Sort workouts by descending order
        .populate('workoutType', 'name') // Populate the name value 
    res.status(201).json(workouts);

    } catch (error) {
        console.error("Error fetching workouts: ", error);
        res.status(500).json({error: 'Failed to fetch workouts' });

    }   
}

// Get Single workout
const getSingleWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        res.status(400).json({ error: 'No such workout' })
    }
    res.status(200).json(workout)
}

// Post a new Workout
const createWorkout = async (req, res) => {
    const {workoutType,title, load, reps } = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: ' Please fill in all the fields,', emptyFields })
    }
    console.log("create: " , workoutType)
    try {
        const workout = await Workout.create({ workoutType, title, load, reps })
        // Populate to display fkey values after submission
        const populatedWorkout = await workout.populate('workoutType', 'name')

        res.status(200).json(populatedWorkout)

        
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findOneAndDelete({ _id: id })
    if (!workout) {
        return res.status(400).json({ error: 'No such workout' })
    }
    res.status(200).json(workout)
}

// Update/Put a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!workout) {
        return res.status(400).json({ error: 'No such workout' })
    }

    res.status(200).json(workout)
}

module.exports = {
    createWorkout,
    getWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout,

}