$(document).ready(function () {
  function buildGeoCodeURL() {
    var queryURLGeo = "https://maps.googleapis.com/maps/api/geocode/json?";

    var queryParams = { key: "AIzaSyAwmiVLmIUNhiWqaGiGzlHl7WIec1ST8Ys" };

    queryParams.address = $("#search-term").val().trim();

    console.log("---------------\nURL: " + queryURLGeo + "\n---------------");
    console.log(queryURLGeo + $.param(queryParams));

    return queryURLGeo + $.param(queryParams);
  }
  // var queryURL = "https://api.openweathermap.org/data/2.5/weather?";

  function weatherURL(lat, lng) {
    console.log(lat);
    console.log(lng);

    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?";

    // lat={lat}&lon={lon}&exclude={part}&appid={YOUR API KEY}

    var queryParams = { appid: "c8a65159cdc7e9fd6ca2d010f396a049" };

    queryParams.lat = lat;
    queryParams.lon = lng;

    return queryURL + $.param(queryParams);
  }

  $("#run-search").on("click", function (event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();

    var queryURLGeo = buildGeoCodeURL();
    console.log(queryURLGeo);
    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function

    $.ajax({
      url: queryURLGeo,
      method: "GET",
    }).then(function (responseGeo) {
      var lat = responseGeo.results[0].geometry.location.lat;
      var lng = responseGeo.results[0].geometry.location.lng;

      var queryURL = weatherURL(lat, lng);
      console.log(queryURL);
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (response) {
        console.log(response);
      });

      // let unix_timestamp = 1549312452
      // // Create a new JavaScript Date object based on the timestamp
      // // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      // var date = new Date(unix_timestamp * 1000);
      // // Hours part from the timestamp
      // var hours = date.getHours();
      // // Minutes part from the timestamp
      // var minutes = "0" + date.getMinutes();
      // // Seconds part from the timestamp
      // var seconds = "0" + date.getSeconds();

      // var date=response.
      // var temp=response.
      // var rH=response.
      // var windSpeed=response.
      // var UV index=response.
    });
  });
});
