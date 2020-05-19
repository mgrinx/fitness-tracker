const path = require("path");
const db = require("../models");

module.exports = app => {
    // page for viewing/editing all workouts
    app.get("*", (req, res) => {
        db.Workout.find({})
        .sort({ date: -1 })
        .then(dbModel => {
            let hbsObject = {
                workouts: dbModel
            }
            res.render("workouts", hbsObject);
        });
    });

    app.get("/new", (req, res) => {
        res.render("newWorkout");
    });

    // page for editing a single workout and adding exercises
    app.get("/:id", (req, res) => {
        db.Workout.findById(req.params.id).then(dbModel => {
            let hbsObject = {
                workout: dbModel
            }
            res.render("exercises", hbsObject);
        });
    });

    app.get("/:id/new", (req, res) => {
        db.Workout.findById(req.params.id).then(dbModel => {
            let hbsObject = {
                workout: dbModel
            }
            res.render("newExercise", hbsObject);
        });
    });
};