$(()=>{

    let flaggedWorkout; //flag to delete workouts via modals
    let flaggedExercise;

    $("#create-workout-form").submit(()=>{
        $.post("/api/workouts", {
            name: $("#workout-name-input").val().trim()
        }).then(() => location.reload());
        return false;
    });

    $("#create-exercise-form").submit(function(){
        console.log($(this).attr("data-workout-id"));
        $.post("/api/workouts/" + $(this).attr("data-workout-id"), {
            name: $("#exercise-name-input").val().trim(),
            type: $("#exercise-type-input").val().trim(),
            weight: $("#exercise-weight-input").val().trim(),
            reps: $("#exercise-reps-input").val().trim(),
            sets: $("#exercise-sets-input").val().trim(),
            duration: $("#exercise-duration-input").val().trim(),
            distance: $("#exercise-distance-input").val().trim()
        }).then(() => location.replace("/"+$(this).attr("data-workout-id")));
        return false;
    });

    $(".delete-workout-button").click(function(){
        flaggedWorkout = $(this).attr("data-workout-id");
        $("#delete-workout-message").text("Really delete workout \"" + $(this).attr("data-workout-title") + "\"?");
    });

    $("#confirm-delete-workout-button").click(()=>{
        $.ajax({
            url: "/api/workouts/"+flaggedWorkout,
            method: "DELETE"
        }).then(() => location.reload());
    });

    $(".delete-exercise-button").click(function(){
        flaggedExercise = $(this).attr("data-exercise-id");
        $("#delete-exercise-message").text("Really delete exercise \"" + $(this).attr("data-exercise-title") + "\"?");
    });

    $("#confirm-delete-exercise-button").click(()=>{
        $.ajax({
            url: "/api/exercises/"+flaggedExercise,
            method: "DELETE"
        }).then(() => location.reload());
    });

});