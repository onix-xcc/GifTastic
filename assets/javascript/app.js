//Videogame array
var VideoGames = [
    "Super Mario", "Legend of Zelda", "Metal Gear", "Donkey Kong", "Crash Bandicoot"
];
// Array buttons
$(document).ready(function () {
    for (var i = 0; i < VideoGames.length; i++) {
        $("#game-buttons").append("<button type='button' onclick='findGame(\"" + VideoGames[i] + "\")'  value=' " + VideoGames[i] + "'> " + VideoGames[i] + " </button>");
    }
});

// Input area 
function VideoGameBttnPress() {
    var searchInput = $("#vg-input").val().trim();
    findGame(searchInput);
}

// Add buttons to the top
function LetsAGoPress() {
    var searchInput = $("#vg-input").val();
    if (searchInput) {
        $("#game-buttons").append("<button type='button' onclick='findGame(\"" + searchInput + "\")'  value=' " + searchInput + "'> " + searchInput + " </button>");
    }
}

// Find 10 Video Game gifs in GIPHY using the API
function findGame(gifName) {

    var gifLimit = 10;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifName + "&limit=" + gifLimit + "&api_key=y0yQVg31d9zp8e3Hv8bclySNAmHuV1Fb";

    $.ajax({
            url: queryURL,
            type: "GET",
        })
        .done(function (response) {
            showGameGif(response);
        })
}

// Display the GIFs as static images in the appropriate div
function showGameGif(response) {
    $("#GameGif-area").empty();
    for (var i = 0; i < response.data.length; i++) {
        var gifRating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var gameImage = gifRating + "<img src= ' " + response.data[i].images.fixed_height_still.url +
            "' data-still=' " + response.data[i].images.fixed_height_still.url +
            "' data-animate=' " + response.data[i].images.fixed_height.url + "' data-state='still' class='gifMove'>";

        gameImage = "<div class='col-md-4'>" + gameImage + "</div>";
        $("#GameGif-area").append(gameImage);
    }

// Make video game gifs move when clicked on
    $(".gifMove").on("click", function () {
        var gifState = $(this).attr("data-state");
        if (gifState == "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    });
}