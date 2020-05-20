const mongoose = require("mongoose");

module.exports = mongoose.model("Exercise", new mongoose.Schema({
    name: { type: String, required: true },
    namef: { type: String, required: true }, //for formatted name string
    date: { type: Date, default: Date.now },
    datef: { type: String, required: true }, //for formatted date string
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Workout", required: true },
    type: String,
    weight: String,
    reps: Number,
    sets: Number,
    duration: String,
    distance: String,
}));