const db = require("../models");
const moment = require("moment");
const exerciseController = require("../controllers/exerciseController");

const formatDateString = "MMM D, Y";
const formatTitleLength = 35;
const formatTitle = t => t.length > formatTitleLength ? t.slice(0, formatTitleLength - 1) + "..." : t;

module.exports = app => {

  // Post a new exercise on a workout
  app.post("/api/workouts/:id", (req, res) => {
    exerciseController.create(req.params.id, {
      name: req.body.name,
      namef: formatTitle(req.body.name),
      datef: moment().format(formatDateString),
      parent: req.params.id,
      type: req.body.type,
      weight: req.body.weight,
      reps: req.body.reps,
      sets: req.body.sets,
      duration: req.body.duration,
      distance: req.body.distance,
    })
    .then(dbModel => res.json(dbModel))
    .catch(err=>console.log(err));
  });

  // Delete a workout and all associated exercises
  app.delete("/api/workouts/:id", (req, res) => {
    db.Exercise.deleteMany({ parent: req.params.id }).then(() => {
      db.Workout.deleteOne({ _id: req.params.id }).then(dbModel => res.json(dbModel));
    });
  });

  // Get all workouts
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({}).then(dbModel => res.json(dbModel));
  });

  // Post a new workout
  app.post("/api/workouts", (req, res) => {
    db.Workout.create({
      name: req.body.name,
      namef: formatTitle(req.body.name),
      datef: moment().format(formatDateString),
    })
    .then(dbModel => res.json(dbModel))
    .catch(err=>console.log(err));
  });

  // Delete an exercise from a workout
  app.delete("/api/exercises/:exerciseId", (req, res) => {
    exerciseController.delete(req.params.exerciseId).then(dbModel => res.json(dbModel));
  });

}
