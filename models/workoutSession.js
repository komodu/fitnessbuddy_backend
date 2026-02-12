const mongoose = require("mongoose");

const WorkoutSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkoutPlan",
      required: true,
    },

    startTime: {
      type: Date,
      required: true,
    },

    endTime: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active",
      index: true,
    },

    workoutTypes: [
      {
        workoutType: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "WorkoutType",
          required: true,
        },

        exercises: [
          {
            exercise: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Exercise",
              required: true,
            },

            sets: [
              {
                reps: Number,
                weight: Number,
                duration: Number,
                restTime: Number,
                completedAt: Date,
              },
            ],
          },
        ],
      },
    ],

    totalVolume: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);
