$(document).ready(function(){
    var cars = ["Audi", "Lexus", "Lamborghini", "Toyota", "Ferrari", "Tesla", "Chevrolet", "Mopar", "Ford", "The Avengers", "The Matrix", "Captain America"];
    var favArray = [];
  

      // Function for displaying cars data
      function renderButtons() {

        
        // clears the buttons div so repeat buttons dont appear
        $("#buttons").empty();

        // Looping through the array of cars
        for (var i = 0; i < cars.length; i++) {

          var btn = $("<button>");
        
          btn.addClass("car-btn btn btn-primary");
          
          btn.attr("data-name", cars[i]);
          
          btn.text(cars[i]);
          
          $("#buttons").append(btn);
        }
      }

      // This function handles events where a car button is clicked
      $("#add-car").on("click", function(event) {
        event.preventDefault();
        
        // This line grabs the input from the textbox
        var car = $("#car-input").val().trim();
        carIndex = cars.indexOf(car);
        console.log(carIndex);
        // Adding movie from the textbox to our array
        if(car === ""){
        }
        else if(carIndex > -1){
        }
        else{
            cars.push(car);
        }
        $("#input")[0].reset();
        // Calling renderButtons which handles the processing of our cars array
        renderButtons();
    });

        renderButtons();
    $(document).on("click", "#download", function(){
       console.log("need to figure out how to download items");
        
        
    })
        
    $(document).on("click", "#favorite", function(){
        var favorite = $(this).parent();
        $(this).remove();
        var fav = favorite.clone();
        var removeBtn = $("<button>").text("Remove");
        removeBtn.attr("id", "remove").addClass("btn");
        fav.append(removeBtn);
        $("#favorites").append(fav);
        var object = favorite[0].innerHTML;
        console.log(object)
        favArray.push(object);
        localStorage.setItem("favs", JSON.stringify(favArray));
    });
    
    var saved = JSON.parse(localStorage.getItem("favs"));
        
    if(saved != null){
        for(var i = 0; i < saved.length; i++){
            save = saved[i];
            var savedDiv = $("<div>");
            var removeBtn = $("<button>").text("Remove");
            removeBtn.attr("id", "remove").addClass("btn");
            savedDiv.addClass(" image pull-left");
            savedDiv.append(save);
            savedDiv.append(removeBtn);
            $("#favorites").append(savedDiv);
            favArray.push(save);

            };
        };
    $(document).on("click", "#remove", function(){
        var item = $(this).parent();
        $(this).remove();
        item.remove();
        remove = item[0].innerHTML;
        console.log(favArray);
        console.log(remove);
        var index = favArray.indexOf(remove);
        console.log(index);
        favArray.splice(index, 1);
        
        localStorage.setItem("favs", JSON.stringify(favArray));
    });

    $(document).on("click", ".car-btn", function() {
        var selection = $(this).attr("data-name");
        var apiURL = "https://www.omdbapi.com/?t=" + selection + "&type=movie&y=&plot=short&&apikey=cced8e5a"
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          selection + "&api_key=cHTR1t44f06SYghIKoUD1hrQSN1ReD6Z&limit=10";
  
        $.ajax({
        url: queryURL,
        method: "GET",
        })
        .then(function(response) {
            var results = response.data;
            for(var i = 0; i < results.length; i ++){
                var title = results[i].title.toUpperCase();
                var ratings = results[i].rating.toUpperCase();
                var imgURL = results[i].images.fixed_height_still.url;
                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;
                var carDiv = $("<div>");
                carDiv.addClass("image pull-left");
                var carImage = $("<img>");
                var download = $("<button>").text("Download");
                var fav = $("<button>").text("Add Favorite");
                download.attr("id", "download").addClass("btn");
                fav.attr("id", "favorite").addClass("btn");
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
                carDiv.append(fav, download);
                $("#gif-images").prepend(carDiv);
    
            };


        });
        $.ajax({
            url: apiURL,
            method: "GET",
        })
        .then(function(info){
    
          var movieDiv = $("<div class='movie'>");

          var rating = info.Rated;

          var pRate = $("<p>").text("Rating: " + rating);

          movieDiv.append(pRate);

          var released = info.Released;

          var pRelease = $("<p>").text("Released: " + released);

          movieDiv.append(pRelease);

          var plot = info.Plot;

          var pPlot = $("<p>").text("Plot: " + plot);

          movieDiv.append(pPlot);

          var imgURL = info.Poster;

          var image = $("<img>").attr("src", imgURL);
            console.log(plot)
          movieDiv.append(image);
            if(plot === "N/A"|| plot === undefined){
            }
            else if(rating === "N/A"){
            }
            else{
          $("#movie-view").prepend(movieDiv);
            }
        })
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