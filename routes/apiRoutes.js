const db = require("../models");
const moment = require("moment");

const formatDateString = "MMM D, Y";
const formatTitleLength = 35;
const formatTitle = t => t.length > formatTitleLength ? t.slice(0, formatTitleLength - 1) + "..." : t;

const createExercise = async (workoutId, exercise) => {
  const docExercise = await db.Exercise.create(exercise);
  console.log("\n>> Created Exercise:\n", docExercise);
  return db.Workout.findByIdAndUpdate(workoutId, {
    $push: {
      exercises: docExercise
    }
  }, { new: true, useFindAndModify: false });
}

const deleteExercise = async (workoutId, exerciseId) => {
  await db.Exercise.deleteOne({ _id: exerciseId });
  return db.Workout.findByIdAndUpdate(workoutId, {
    $pull: {
      exercises: {
        _id: exerciseId
      }
    }
  }, { new: false, useFindAndModify: false });
}

module.exports = app => {

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
    }).then(dbModel => res.json(dbModel));
  });

  // Delete a workout and all associated exercises
  app.delete("/api/workouts/:id", (req, res) => {
    db.Exercise.deleteMany({ parent: req.params.id }).then(() => {
      db.Workout.deleteOne({ _id: req.params.id }).then(dbModel => res.json(dbModel));
    });
  });

  // Post a new exercise on a workout
  app.post("/api/workouts/:id", (req, res) => {
    createExercise(req.params.id, {
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
    }).then(dbModel => res.json(dbModel));
  });

  // Delete an exercise from a workout
  app.delete("/api/workouts/:workoutId/exercises/:exerciseId", (req, res) => {
    deleteExercise(req.params.workoutId, req.params.exerciseId).then(dbModel => res.json(dbModel));
  });

}
