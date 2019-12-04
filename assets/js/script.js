$(document).ready(function() {
    var superheroes = ["superman", "batman", "wonder woman", "spiderman", "iron man", "captain america", "thor", "aquaman", "captain marvel", "batgirl", "supergirl"]
    
    //   Function to make buttons and add to page
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();

        for (var i = 0; i < arrayToUse.length; i++) {
            var a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-person", arrayToUse[i]);
            a.text(arrayToUse[i]);
            $(areaToAddTo).append(a);
        }
    }
    
    // On click function that grabs 10 non-animated gifs and displays rating when corresponding button is clicked
    $(document).on("click", ".superhero-button", function() {
        $("#superheroes").empty();
        $(".superhero-button").removeClass("active");
        $(this).addClass("active");

      var person = $(this).attr("data-person");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=KpcorNJaMNjV2sH9h5lciBXqW3r9d2Rr";

      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            // var gifDiv = $("<div class='card'>");
            var gifDiv = $("<div class=\"superhero-item\">");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;

            var personImage = $("<img>");
            personImage.attr("src", still);
            personImage.attr("data-still", still);
            personImage.attr("data-animate", animated);
            personImage.attr("data-state", "still");
            personImage.addClass("superhero-image");

            gifDiv.append(p);
            gifDiv.append(personImage);

            $("#superheroes").append(gifDiv);
          }
        });
    });

    // on click function for clicking static gifs and animating them and vice-versa
    $(document).on("click", ".superhero-image", function() {
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    // function call that adds user input into 'topics' array and reloads all buttons on page
    $("#add-superhero").on("click", function(event) {
        event.preventDefault();
        var newSuperhero = $("input").eq(0).val();

        if (newSuperhero.length > 2) {
            superheroes.push(newSuperhero);
        }

        populateButtons(superheroes, "superhero-button", "#superhero-buttons");
    })

    populateButtons(superheroes, "superhero-button", "#superhero-buttons");
})
