const db = require("../models");

module.exports = app => {

    // prevent favicon error
    app.get("/favicon.ico", (req, res) => res.status(200));

    // page for viewing a single workout and adding exercises
    app.get("/:id", (req, res) => {
        db.Workout.findById(req.params.id)
        .lean()
        .then(dbModel => {
            let hbsObject = {
                workout: dbModel
            }
            res.render("exercises", hbsObject);
        })
        .catch(err => console.log(err));
    });

    // page for viewing all workouts and adding new workouts
    app.get("*", (req, res) => {
        db.Workout.find({})
        .sort({ date: -1 })
        .lean()
        .then(dbModel => {
            let hbsObject = {
                workouts: dbModel
            }
            res.render("workouts", hbsObject);
        })
        .catch(err => console.log(err));
    });

};