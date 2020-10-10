const apiRouter = require("express").Router();

const db = require("../models");

/*
Routes from public/api.js are:
    // 1 getLastWorkout(): /api/workouts - get

    // 2 getWorkoutsInRange(): /api/workouts/range - get
    // from stats.js: get all workout data from back-end
    
    // 3 createWorkout(): /api/workouts - post
    
    // 4 addExercise(): /api/workouts/" + id - put
*/

// 1 - get last work out
apiRouter.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .sort({ date: -1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
      console.log(err);
    });
});

// 2 - get all workout data from back-end
apiRouter.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
      console.log(err);
    });
});

// 3 - create workout
// when new workout is clicked, this is adding an entry to the db with no exercises
// the url at this point is http://localhost:3000/?id=<the id of the creatd workout>
apiRouter.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
      console.log(err);
    });
});

// 4 - add exercise to the workout
// need to figure out how to add the exercise to the workout ID that was created above
apiRouter.put("/api/workouts/:id", (req, res) => {
  const { id } = req.params;

  // find the document based on req.params.id
  db.Workout.findOne({ _id: id })
    // then we get the document which is dbWorkout
    .then(dbWorkout => {
      // dbWorkout has an array of objects called "exercises" to which we push req.body
      dbWorkout.exercises.push(req.body);
      // then save the changes made to dbWorkout
      return dbWorkout.save();
    })
    //send back result which is the updated dbWorkout to front-end
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    //catch and log errors if there are any
    .catch(err => {
      res.status(400).json(err);
      console.log(err);
    });
});

module.exports = apiRouter;

