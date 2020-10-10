const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workouttrackerdb',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );

// Routes
const apiRouter = require("./routes/apiRoutes");
const htmlRouter = require("./routes/htmlroutes");

app.use(apiRouter);
app.use(htmlRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});