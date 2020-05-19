var db = require("../models");

const createExercise = (workoutId, exercise) => {
  return db.Exercise.create(exercise).then(docExercise => {
      console.log("\n>> Created Exercise:\n", docExercise);
      return db.Workout.findByIdAndUpdate(
          workoutId,
          {
              $push: {
                  exercises: docExercise
              }
          },
          { new: true, useFindAndModify: false }
      );
  });
}

const deleteExercise = (workoutId, exerciseId) => {
  return db.Exercise.deleteOne({ _id: exerciseId }).then(() => {
      return db.Workout.findByIdAndUpdate(
          workoutId,
          {
              $pull: {
                  exercises: {
                      _id: exerciseId
                  }
              }
          },
          { new: false, useFindAndModify: false }
      );
  });
}

module.exports = app => {

  // Get all workouts
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({}).then(dbModel => res.json(dbModel));
  });

  // Post a new workout
  app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body).then(dbModel => res.json(dbModel));
  });

  // Delete a workout and all associated exercises
  app.delete("/api/workouts/:id", async(req, res) => {
    db.Exercise.deleteMany({ parent: req.params.id }).then(() => {
      db.Workout.deleteOne({ _id: req.params.id }).then(dbModel => res.json(dbModel));
    });
  });

  // Post a new exercise on a workout
  app.post("/api/workouts/:id", (req, res) => {
    createExercise(req.params.id, {
      name: req.body.name,
      parent: req.params.id,
      type: req.body.type,
      weight: req.body.weight,
      reps: req.body.reps,
      sets: req.body.sets,
      duration: req.body.duration,
      distance: req.body.distance,
    }).then(dbModel => res.json(dbModel));
  });

  //
  app.delete("/api/workouts/:workoutId/exercises/:exerciseId", (req, res) => {
    deleteExercise(req.params.workoutId, req.params.exerciseId).then(dbModel => res.json(dbModel));
  });

}
