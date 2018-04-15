$(document).ready(function(){
    var cars = ["Audi A4", "Aventador", "F70 LaFerrari", "Audi R8", "Audi RS7", "F430 Scuderia", "Silverado", "Hummer", "Corvette", "GTO"];
      // Function for displaying movie data
      function renderButtons() {

        // Deleting the cars prior to adding new cars
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons").empty();

        // Looping through the array of cars
        for (var i = 0; i < cars.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var btn = $("<button>");
          // Adding a class of movie-btn to our button
          btn.addClass("car-btn btn btn-primary");
          // Adding a data-attribute
          btn.attr("data-name", cars[i]);
          // Providing the initial button text
          btn.text(cars[i]);
          // Adding the button to the buttons-view div
          $("#buttons").append(btn);
        }
      }

      // This function handles events where a movie button is clicked
      $("#add-car").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var car = $("#car-input").val().trim();

        // Adding movie from the textbox to our array
        cars.push(car);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      renderButtons();
    
    $("button").on("click", function() {
        var selection = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          selection + "&api_key=cHTR1t44f06SYghIKoUD1hrQSN1ReD6Z&limit=10";
  
        $.ajax({
        url: queryURL,
        method: "GET"
        })
        .then(function(response) {
            var results = response.data;
            console.log(results);
            for(var i = 0; i < results.length; i ++){
                var title = results[i].title.toUpperCase();
                var ratings = results[i].rating.toUpperCase();
                var imgURL = results[i].images.fixed_height_still.url;
                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;
                var carDiv = $("<div>");
                carDiv.addClass("image pull-left");
                var carImage = $("<img>");
                var prate = $("<p>").text("Rating: " + ratings)
                var ptitle = $("<p>").text(title);
                carImage.attr("src", imgURL);
                carImage.attr("data-animate", animated);
                carImage.attr("data-state", "still")
                carImage.attr("data-still", still);
                carImage.attr("style", "width: 300px; height: 250px");
                carImage.addClass("images");
                carDiv.append(ptitle);
                carDiv.append(carImage);
                carDiv.append(prate);
                $("#gif-images").prepend(carDiv);
            };


        });

    });
    $(document).on("click", ".images", function() {
        var state = $(this).attr("data-state");
        var animate = $(this).attr("data-animate");
        var still = $(this). attr("data-still");
       
        if(state === "still"){
          $(this).attr("data-state", "animate")
          $(this).attr("src", animate)
        };
        if(state === "animate"){
          $(this).attr("data-state", "still")
          $(this).attr("src", still)
        };

});
});