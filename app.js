var topics=["cat","dog","duck","panda"];
function displayInfo() {

    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    topic + "&api_key=vWWIEeCLki5mWFtFlRZy92U6uEtSyiTX&limit=10";

 
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var topicDiv = $("<div class='topic'>");
      var rating = response.Rated;
      var pOne = $("<p>").text("Rating: " + rating);
      topicDiv.append(pOne);
      var released = response.Released;
      var pTwo = $("<p>").text("Released: " + released);
      topicDiv.append(pTwo);
      var plot = response.Plot;
      var pThree = $("<p>").text("Plot: " + plot);
      topicDiv.append(pThree);
      var imgURL = response.Poster;
      var image = $("<img>").attr("src", imgURL);
      topicDiv.append(image);
      $("#topics").prepend(topicDiv);
    });

  }
  function renderButtons() {
    $("#buttons").empty();

    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {

      // Then dynamicaly generating buttons for each topic in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of topic-btn to our button
      a.addClass("topic-btn");
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
  $(document).on("click", ".topic-btn", displaytopicInfo);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();