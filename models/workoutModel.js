const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({

  day: {
    type: Date,
    default: Date.now
    //is this okay since it will be one workout per submission
    // rather than needing a unique date for the whole day's workouts?
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
  toJSON:{virtuals:true}
}
);

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;

