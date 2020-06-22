# 06 Server-Side APIs: Weather Dashboard

#### Live application can be accessed here: [Weather Dashboard](https://bdcoelho.github.io/Weather-Dashboard/ "Live Weather Application")


The weather dashboard allows a user to look up live weather information and store recent weather searches. The target audience is travellers wanting to plan their trip while staying aware of weather conditions at the destination and along the route. The application currently allows 10 unique locations to be stored. The limit is purely for aesthetic reasons.

Searching is made easy by incorporating the Google Geocoding API to intelligently retrieve coordinates for a location. This removes the need for the user to enter exact location names in a specific format. Live weather conditions are displayed at the top of the screen. The time shown is the current time at the timezone of the location searched. The UV index is rendered from green to red depending on the severity of UV radiation. A forecast for the next 5 days is displayed at the bottom of the main panel on the right side. The application is designed to be responsive across a range of screen sizes.

## Screenshots

Below are screenshots of the desktop and mobile versions.

#### Desktop Version

![Desktop Version](https://github.com/bdcoelho/Weather-Dashboard/blob/master/Assets/Screenshot_Desktop.png "Desktop Version")

#### Mobile Version

![Mobile Version](https://github.com/bdcoelho/Weather-Dashboard/blob/master/Assets/Screenshot_Mobile.png "Mobile Version")

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
```

