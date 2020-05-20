const db = require("../models");

module.exports = {
    create: async (workoutId, exercise) => {
        let ex = await db.Exercise.create(exercise);
        return await db.Workout.findByIdAndUpdate(workoutId,
            {
                $push: {
                    exercises: ex
                }
            },
            {
                new: true,
                useFindAndModify: false
            }
        );
    },
    delete: async (exerciseId) => {
        let ex = await db.Exercise.findById(exerciseId);
        await db.Workout.updateMany({},
            {
                $pull: {
                    exercises: ex
                }
            },
            {
                new: false,
                useFindAndModify: false
            }
        )
        return await db.Exercise.deleteOne({ _id: exerciseId });
    }
};