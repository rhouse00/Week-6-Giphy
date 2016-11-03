var topics =["Scrubs", "Turk and JD", "It's Always Sunny", "charlie day", "Save By the Bell", "ac slater", "30 Rock", "Jack Donaghy", "Liz Lemon","Psych"];
		var queryUrl = "https://api.giphy.com/v1/gifs/search?q=";
		var apiKey = "&api_key=dc6zaTOxFJmzC";
		var limit = "&limit=10"

function addSearchButtons (){
	for(var i =0; i < topics.length; i++) {
		var newDiv = $("<div>");
		newDiv.addClass("spacing");
		var newBtn = $("<button type=button>");
		newBtn.addClass("btn btn-success");
		newBtn.text(topics[i]);
		newBtn.attr("data-word", topics[i]);
		$(newDiv).append(newBtn);
		$(".searchBtns").append(newDiv);
	};
};

function addNewGiphy (response) {
	var results = response.data;
	for(var i=0; i< results.length; i++) {
			var imageDiv = $("<div>");
			imageDiv.addClass("spacing");
			var newImg = $("<img>");
			newImg.addClass("img-thumbnail");
			newImg.attr("data-animate", results[i].images.fixed_height.url);
			newImg.attr("data-still", results[i].images.fixed_height_still.url);
			newImg.attr("data-state", "still");
			newImg.attr("src", results[i].images.fixed_height_still.url);
			$(imageDiv).append(newImg);
			$(imageDiv).append("<p>Rating: " + results[i].rating);
			$(".image").prepend(imageDiv);
		}
};		

$(document).ready(function(){

	// Finds GIFs, makes new Images, prepends to page
	$(".searchBtns").on("click", "button", function(){
		$(".image").empty();
		var q = $(this).data("word");
		var fullQuery = queryUrl + q + apiKey + limit;
		$.ajax({
			url: fullQuery,
			method: "GET"
		}).done(function(response){
			addNewGiphy(response);
		})
	});

	// Animates gifs and stops them
	$(".image").on("click", ".img-thumbnail", function(){

			var animateGif = $(this).attr("data-animate");
	        var stillGif = $(this).attr("data-still");
	        var state = $(this).attr("data-state");

	        if (state == "still") {
	        	$(this).attr("src", animateGif);
	        	state = $(this).attr("data-state", "animate");
	        }
	        else if (state == "animate") {
	        	$(this).attr("src", stillGif);
	        	state = $(this).attr("data-state", "still");
	        }
		});

	// Search Bar and adds Button
	$(".form-group").on("click", "#addBtn", function(){
		var newGif = $("#searchBar").val().trim();
		topics.push(newGif);
		$(".searchBtns").empty();
		addSearchButtons();
		$("#searchBar").val(" ");
		return false;
	});

	addSearchButtons();

});