$(document).ready(function () {
  function buildGeoCodeURL() {
    var queryURLGeo = "https://maps.googleapis.com/maps/api/geocode/json?";

    var queryParams = { key: "AIzaSyAwmiVLmIUNhiWqaGiGzlHl7WIec1ST8Ys" };

    queryParams.address = $("#search-term").val().trim();

    return queryURLGeo + $.param(queryParams);
  }
  // var queryURL = "https://api.openweathermap.org/data/2.5/weather?";

  function weatherURL(lat, lng) {
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

    // var queryURLGeo = buildGeoCodeURL();

    // $.ajax({
    //   url: queryURLGeo,
    //   method: "GET",
    // }).then(function (responseGeo) {
    //   var lat = responseGeo.results[0].geometry.location.lat;
    //   var lng = responseGeo.results[0].geometry.location.lng;

      var queryURL = weatherURL(37.8, 144.9);
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (response) {
        console.log(response);

        var location = response.timezone;
        var unix_timestamp = response.current.dt;
        var date = moment.unix(unix_timestamp).format("ddd, MMM Do, YYYY");
        var time = moment.unix(unix_timestamp).format("h:mm A");

        var temp = Math.round((response.current.temp - 273.15) * 10) / 10;
        var rH = Math.round(response.current.humidity * 10) / 10;
        var windSpeed = Math.round(response.current.wind_speed * 10) / 10;
        var UVIndex = Math.round(response.current.uvi * 10) / 10;

        currentObject = {
          Temperature: temp,
          Humidity: rH,
          "Wind Speed": windSpeed,
          "UV Index": UVIndex,
        };

        Object.keys(currentObject).forEach(function (item) {
          var cList = $("#current-data");
          var myLi = $("<li/>")
            .html(item + ":\t\t\t\t" + currentObject[item])
            .appendTo(cList);
        });

        $("#location").html(location);
        $("#date").html(date);
        $("#time").html(time);

var dailyForecastArray=response.daily;
console.log(dailyForecastArray);
dailyForecastArray.forEach(function(item, index, array){
  console.log(dailyForecastArray[index].dt)
}


)

      });
    // });
  });
});

