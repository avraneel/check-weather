function showDayForecast(dayWeather) {
  const forecastContainer = document.createElement("div");

  const date = document.createElement("div");
  const icon = document.createElement("img");
  const temp = document.createElement("div");

  date.textContent = dayWeather.datetime;
  icon.alt = dayWeather.iconName;
  temp.textContent = dayWeather.temp;
}

/**
 * TODO:
 * - Map icon-name to icon
 * - convert datetime to proper format
 */
