const router = require("express").Router();

const db = require("../models");

/*
Routes from public/api.js are:
    // 1 getLastWorkout()
    /api/workouts - get (fecth?)

    // addExercise()
    /api/workouts/" + id - post (put?)

    //createWorkout()
    /api/workouts - post(post with bulk?) (post?)

    // getWorkoutsInRange()
    /api/workouts/range get (fetch?)
*/

// 1 - get last work out
router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .sort({ date: -1 })
      .then(dbTransaction => {
        res.json(dbTransaction);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

module.exports = router;

