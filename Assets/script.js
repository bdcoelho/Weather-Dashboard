$(document).ready(function () {

var lat= -37.8
var lng= 144.9



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



  function getWeather(){
    var queryURL = weatherURL(lat, lng);
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function(response) {

      var location = response.timezone;
      var unix_timestamp = response.current.dt;
      var date = moment.unix(unix_timestamp).tz(location).format("ddd, MMM Do, YYYY");
      var time = moment.unix(unix_timestamp).tz(location).format("h:mm A");

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
      var cList = $("#current-data");

      Object.keys(currentObject).forEach(function (item, index) {

        var myLi = $("#li"+index).html("<b>"+item+"</b>" + ":\t\t\t\t" + currentObject[item])

      });

      $("#location").html(location);
      $("#date").html(date);
      $("#time").html(time);

      var dailyForecastArray = response.daily.slice(0, 5);
      dailyForecastArray.forEach(function (item, index, array) {
        var dayTS = dailyForecastArray[index].dt;
        var weatherIcon = dailyForecastArray[index].weather[0].icon;
        var forecastDate = moment.unix(dayTS).format("ddd, dd/MM");
        var iconURL =
          "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

        var tempMax =
          Math.round((dailyForecastArray[index].temp.max - 273.15) * 10) / 10;
        var tempMin =
          Math.round((dailyForecastArray[index].temp.min - 273.15) * 10) / 10;
        var rh = Math.round(dailyForecastArray[index].humidity * 10) / 10;
        var uVI = Math.round(dailyForecastArray[index].uvi * 10) / 10;
        $("#day" + index + "-date").html(forecastDate);
        $("#day" + index + "-img").attr("src", iconURL);
        $("#day" + index + "-img").attr("alt", "weatherimg");
        $("#day" + index + "-minTemp").html("Min Temp:"+tempMin);
        $("#day" + index + "-maxTemp").html("Max Temp:"+tempMax);
        $("#day" + index + "-rh").html("Humidity:"+rh);
      });
    });

  }

getWeather(lat,lng);

  $("#run-search").on("click", function (event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();

    var queryURLGeo = buildGeoCodeURL();

    $.ajax({
      url: queryURLGeo,
      method: "GET",
    }).then(function (responseGeo) {
     lat = responseGeo.results[0].geometry.location.lat;
     lng = responseGeo.results[0].geometry.location.lng;
     getWeather(lat,lng);
    });
  });
});
