var topics=["cat","dog","duck","panda"];
function displayInfo() {

    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    topic + "&api_key=vWWIEeCLki5mWFtFlRZy92U6uEtSyiTX&limit=10";

 
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      var result=response.data;
      for (var i = 0; i < result.length; i++){

        var topicDiv = $("<div class='topic float-left mx-2 my-2'>");
        
        var imgURL = result[i].images.fixed_height.url;
        var imgStillURL = result[i].images.fixed_height_still.url;
        var image = $("<img>").attr("src", imgURL);
        image.attr("data-state","animate");
        image.attr("data-animate",imgURL);
        image.attr("data-still",imgStillURL);
        image.addClass("gif");
        topicDiv.append(image);
        var rating = result[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        topicDiv.append(p);
        $("#topics").prepend(topicDiv);
      }
    });

  }
  $(".gif").on("click", function() {
    console.log("123");
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
   
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
  function renderButtons() {
    $("#buttons").empty();

    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {

      // Then dynamicaly generating buttons for each topic in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of topic-btn to our button
      a.addClass("topic-btn btn btn-warning btn-lg mx-2 my-2");
      // Adding a data-attribute
      a.attr("data-name", topics[i]); 
      
      // Providing the initial button text
      a.text(topics[i]);
      // Adding the button to the buttons div
      $("#buttons").append(a);
    }
  }

  // This function handles events where a topic button is clicked
  $("#add-topic").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var topic = $("#topic-input").val().trim();

    // Adding topic from the textbox to our array
    topics.push(topic);

    // Calling renderButtons which handles the processing of our topic array
    renderButtons();
  });

  // Adding a click event listener to all elements with a class of "topic-btn"
  $(document).on("click", ".topic-btn", displayInfo);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();