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
    
    var state = $(this).attr("data-state");
    console.log("asdf");
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
    for (var i = 0; i < topics.length; i++) {
      var a = $("<button>");
      a.addClass("topic-btn btn btn-warning btn-lg mx-2 my-2");
      a.attr("data-name", topics[i]); 
      a.text(topics[i]);
      $("#buttons").append(a);
    }
  }
  $("#add-topic").on("click", function(event) {
    event.preventDefault();
    var topic = $("#topic-input").val().trim();
    topics.push(topic);
    renderButtons();
  });
  $(document).on("click", ".topic-btn", displayInfo);
  renderButtons();