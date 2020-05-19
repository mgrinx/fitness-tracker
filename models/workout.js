const mongoose = require("mongoose");

module.exports = mongoose.model("Workout", new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, default: Date.now },
    exercises: []
}));