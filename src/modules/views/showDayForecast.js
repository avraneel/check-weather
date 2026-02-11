import icons from "../../assets/images/icons/partly-cloudy-day.svg";

export function showDayForecast(dayWeather) {
  const forecastContainer = document.createElement("div");
  forecastContainer.classList.toggle(".forecast-container");

  const date = document.createElement("div");
  const icon = document.createElement("img");
  const temp = document.createElement("div");

  date.textContent = dayWeather.date;
  icon.src = `assets/images/icons/${icon}`;
  icon.alt = dayWeather.icon;
  temp.textContent = dayWeather.temp;

  forecastContainer.append(date, icon, temp);

  return forecastContainer;
}

/**
 * TODO:
 * - Map icon-name to icon
 * - convert datetime to proper format (DONE!)
 */
