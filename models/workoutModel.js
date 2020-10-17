const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({

  day: {
    type: Date,
    default: Date.now
  },

  exercises: [
    {
      type: {
        type: String,
        trim: true,
        required: "Exercise type is required."
      },
      name: {
        type: String,
        trim: true,
        required: "Exercise name is required."
      },
      duration: {
        type: Number,
        required: "Duration is required."
      },
      weight: {
        type: Number
      },
      reps: {
        type: Number
      },
      sets: {
        type: Number
      },
      distance: {
        type: Number
      }
    }
  ]
},
{
  toJSON:
  {
    virtuals: true
  }
}
);

workoutSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce((total, exercise) => total + exercise.duration || 0, 0);
});

workoutSchema.virtual("totalWeight").get(function () {
  // Note: if an exercise does not have a weight, it returns undefined.
  return this.exercises.reduce((total, exercise) => total + exercise.weight || 0, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;

// sum array of numbers
// https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers

// mongoose virtuals - data does not display in chart when toObject is added
// https://mongoosejs.com/docs/2.7.x/docs/virtuals.html