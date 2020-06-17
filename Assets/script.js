$(document).ready(function () {

function buildQueryURL() {
    // queryURL is the url we'll use to query the API
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?";
  

// api.openweathermap.org/data/2.5/weather?appid=c8a65159cdc7e9fd6ca2d010f396a049&q=Melbourne,VIC,Australia



    // Set the API key
    var queryParams = { "appid": "c8a65159cdc7e9fd6ca2d010f396a049" };

    // Grab text the user typed into the search input, add to the queryParams object
    queryParams.q = $("#search-term")
      .val()
      .trim();

    // Logging the URL so we have access to it for troubleshooting
    console.log("---------------\nURL: " + queryURL + "\n---------------");
    console.log(queryURL + $.param(queryParams));
    return queryURL + $.param(queryParams);
  }
  

  

  $("#run-search").on("click", function(event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();
  

    // Build the query URL for the ajax request to the NYT API
    var queryURL = buildQueryURL();
  console.log(queryURL)
    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function


  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    console.log(response);
  });

  });



})