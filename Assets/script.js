$(document).ready(function () {
  var myLocation = "Melbourne VIC, Australia";
  var lat = -37.8;
  var lng = 144.9;
  // A function to render a color based on a value between 0 to 10
  function myRGB(val) {
    var red = 0;
    var green = 0;
    var blue = 0;
    var min = 0;
    var max = 10;
    red = 0 + Math.round((val / 10) * 255);
    green = 255 - Math.round((val / 10) * 255);
    myCol = "rgb(" + red + "," + green + "," + blue + ")";
    return myCol;
  }

  // Call function to get current weather for default location
  getWeather(lat, lng, myLocation);
  // Render location search history to DOM
  var retrieveStorage = localStorage["searchHistory"];
  var locationInfo = retrieveStorage ? JSON.parse(retrieveStorage) : [];
  renderHistory(locationInfo)

// A function to build the google geocode query URL
  function buildGeoCodeURL(searchTerm) {
    var queryURLGeo = "https://maps.googleapis.com/maps/api/geocode/json?";
    var queryParams = { key: "AIzaSyAwmiVLmIUNhiWqaGiGzlHl7WIec1ST8Ys" };
    queryParams.address = searchTerm.val().trim();
    return queryURLGeo + $.param(queryParams);
  }

  // A function to build the query url to retrieve weather data from openweathermap.org
  function weatherURL(lat, lng) {
    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?";
    // lat={lat}&lon={lon}&exclude={part}&appid={YOUR API KEY}
    var queryParams = { appid: "c8a65159cdc7e9fd6ca2d010f396a049" };
    queryParams.lat = lat;
    queryParams.lon = lng;
    return [queryURL + $.param(queryParams)];
  }
// An AJAX call and function to retrieve weather data from openweathermap.org
  function getWeather(lat, lng, myLocation) {
    var queryURL = weatherURL(lat, lng);
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      var tzLocation = response.timezone;
      var unix_timestamp = response.current.dt;
      // Current date and time at the location searched from unix timestamp
      var date = moment
        .unix(unix_timestamp)
        .tz(tzLocation)
        .format("ddd, MMM Do, YYYY");
      var time = moment.unix(unix_timestamp).tz(tzLocation).format("h:mm A");

      // The weather data to be displayed
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

// Populate current weather
      Object.keys(currentObject).forEach(function (item, index) {
        var myLi = $("#li" + index).html(
          "<b>" +
            item +
            "</b>" +
            ":\t\t\t\t" +
            "<span id=id" +
            index +
            ">" +
            currentObject[item] +
            "</span>"
        );
        // Render UV Index from green to red depending on severity
        if (item === "UV Index") {
          var val = currentObject[item];
          myCol = myRGB(val);
          $("#id" + index).css("background-color", myCol);
          $("#id" + index).css("color", "white");
          $("#id" + index).css("font-weight", "bold");

          $("#id" + index).css("border-radius", "20%");
        }
      });
// Add location date and time to current weather main panel
      $("#location").html(myLocation);
      $("#date").html(date);
      $("#time").html(time);

      // Limit forecast to 5 days in the future
      var dailyForecastArray = response.daily.slice(1, 6);
      
      // Add details to the forecast tab
      dailyForecastArray.forEach(function (item, index, array) {
        var dayTS = dailyForecastArray[index].dt;
        var weatherIcon = dailyForecastArray[index].weather[0].icon;
        var forecastDate = moment.unix(dayTS).format("ddd, DD/MM");
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
        $("#day" + index + "-img").attr("class", "img-fluid");
        $("#day" + index + "-minTemp").html("Min Temp:\t" + tempMin);
        $("#day" + index + "-maxTemp").html("Max Temp:\t" + tempMax);
        $("#day" + index + "-rh").html("Humidity:\t" + rh);
      });
      
    });
  }

// A function to render the location search history from local storage
  function renderHistory(locationInfo) {

    var searchList = document.getElementById("searchList");
    searchList.innerHTML = "";
    for (
      let i = locationInfo.length - 1;
      i >= Math.max(locationInfo.length - 10, 0);
      i--
    ) {
      tempLocation = locationInfo[i].ui;
      var listItem = document.createElement("LI");
      listItem.setAttribute("class", "list-group-item");
      listItem.setAttribute("id", "liItem" + i);
      listItem.innerHTML = tempLocation;
      searchList.append(listItem);
    }
  }

// A function to store new search history to local storage
  function storeHistory(lat, lng, myLocation) {
    var retrieveStorage = localStorage["searchHistory"];
    var locationInfo = retrieveStorage ? JSON.parse(retrieveStorage) : [];
    locationInfo.push({ ui: myLocation, latitude: lat, longitude: lng });
    var obj = {};
    for (var i = 0, len = locationInfo.length; i < len; i++)
      obj[locationInfo[i]["ui"]] = locationInfo[i];
    locationInfo = new Array();
    for (var key in obj) locationInfo.push(obj[key]);
    localStorage["searchHistory"] = JSON.stringify(locationInfo);

    renderHistory(locationInfo)

  }
// Event listener for search button and enter in search bar
  $("#run-search").on("click", function (event) {
    event.preventDefault();
    var queryURLGeo = buildGeoCodeURL($("#search-term"));

    $.ajax({
      url: queryURLGeo,
      method: "GET",
    }).then(function (responseGeo) {
      lat = responseGeo.results[0].geometry.location.lat;
      lng = responseGeo.results[0].geometry.location.lng;
      myLocation = responseGeo.results[0].formatted_address;
      getWeather(lat, lng, myLocation);
      storeHistory(lat, lng, myLocation);
    });

  });
// Event listener for click on search history
  $("#searchList").on("click", function (event) {
    event.preventDefault();
    var searchVal = event.target.innerHTML;
    var queryURLGeo = "https://maps.googleapis.com/maps/api/geocode/json?";
    var queryParams = { key: "AIzaSyAwmiVLmIUNhiWqaGiGzlHl7WIec1ST8Ys" };
    queryParams.address = searchVal;
    queryURLGeo = queryURLGeo + $.param(queryParams);
    $.ajax({
      url: queryURLGeo,
      method: "GET",
    }).then(function (responseGeo) {
      lat = responseGeo.results[0].geometry.location.lat;
      lng = responseGeo.results[0].geometry.location.lng;
      myLocation = responseGeo.results[0].formatted_address;
      getWeather(lat, lng, myLocation);
    });
  });

// Event listener to clear location search history
  $("#clear-all").on("click", function(event){

    localStorage.removeItem("searchHistory");

  });
});
