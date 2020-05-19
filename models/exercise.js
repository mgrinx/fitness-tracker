const mongoose = require("mongoose");

module.exports = mongoose.model("Exercise", new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, default: Date.now },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Workout", required: true },
    type: String,
    weight: String,
    reps: Number,
    sets: Number,
    duration: String,
    distance: String,
}));
