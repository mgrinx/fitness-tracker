$(()=>{

    let flaggedWorkout; //flag to delete workouts via modals

    $("#create-workout-form").submit(()=>{
        $.post("/api/workouts", {
            name: $("#workout-name-input").val().trim()
        }).then(() => location.reload());
        return false;
    });

    $(".workout-delete-button").click(function(){
        flaggedWorkout = $(this).attr("data-workout-id");
        $("#workout-delete-message").text("Really delete workout \"" + $(this).attr("data-workout-title") + "\"?");
    });

    $("#workout-confirm-delete-button").click(()=>{
        $.ajax({
            url: "/api/workouts/"+flaggedWorkout,
            method: "DELETE"
        }).then(() => location.reload());
    });

});