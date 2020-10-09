// Exporting an object containing all of our models

// Based on seed.js, need schema for: day and exercise or combine into one file?

module.exports = {
    // Key: require("./ModelName");
    Exercise: require("./exerciseModel"),
    Workout: require("./workoutModel")
  };

// when requiring it for apis: 
// const db = require("./models");