const mongoose = require("mongoose");

module.exports = mongoose.model("Workout", new mongoose.Schema({
    name: { type: String, required: true },
    namef: { type: String, required: true }, //for formatted name string
    date: { type: Date, default: Date.now },
    datef: { type: String, required: true }, //for formatted date string
    exercises: []
}));