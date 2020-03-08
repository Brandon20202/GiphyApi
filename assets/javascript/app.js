var animalArray = [
	"dog",
	"cat",
	"zebra",
	"bird",
	"fish",
	"monkey",
	"panda",
	"wolf",
	"tiger",
	"dolphin",
];


for ( var i = 0; i < animalArray.length; i++ ) {
	var animalToAdd = animalArray[i];
	var animalButton = $("<button>");

	animalButton.attr("data-animal", animalToAdd);
	animalButton.addClass("animal-button btn btn-default");
	animalButton.append(animalToAdd);

	$("#animal-buttons-div").append(animalButton);
	$("#animal-input").val("");

};

$("#submit-button").on("click", function(event) {
	event.preventDefault();

	var animalToAdd = $("#animal-input").val().trim();
	var animalButton = $("<button>");

	animalButton.attr("data-animal", animalToAdd);
	animalButton.addClass("animal-button btn btn-default");
	animalButton.append(animalToAdd);

	$("#animal-buttons-div").append(animalButton);
	$("#animal-input").val("");

});


$(document.body).on("click", ".animal-button", function() {
    var animal = $(this).attr("data-animal");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=YogKRxSHFjubh94X8qhbGMKw4YeLgAuC";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
      	console.log(response);

      	var results = response.data;

      	$("#animal-gifs-div").empty();

      	for ( var i = 0; i < results.length; i++ ) {
      		var animalDiv = $("<div>");
      		animalDiv.addClass("animal-div");
        	var rating = results[i].rating
        	var p = $("<p>").text("Rating: " + rating);

	        var animalImage = $("<img>").attr("src", results[i].images.fixed_height_still.url);
	        animalImage.addClass("gif");
	        animalImage.attr("data-still", results[i].images.fixed_height_still.url);
	        animalImage.attr("data-animate", results[i].images.fixed_height.url);
	        animalImage.attr("data-state", "still");

	        animalDiv.append(p);
	        animalDiv.append(animalImage);
	        $("#animal-gifs-div").prepend(animalDiv);
      	};

      	$(".gif").on("click", function() {
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
    });
});