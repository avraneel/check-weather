import { images } from "../../index";

/**
 * Show the forecast of a single future date
 */
export function showDayForecast(dayWeather) {
  const forecastItem = document.createElement("div");
  const date = document.createElement("div");
  //const iconAndTemp = document.createElement("div");
  const icon = document.createElement("img");
  const temp = document.createElement("div");

  forecastItem.classList.toggle("forecast");
  date.classList.toggle("forecase-date");
  temp.classList.toggle("forecast-temp");
  //iconAndTemp.classList.toggle("icon-and-temp");

  date.textContent = dayWeather.date;
  icon.src = dayWeather.imgSrc;
  icon.alt = dayWeather.imgAlt;
  temp.textContent = dayWeather.temp;

  //iconAndTemp.append(icon, temp);
  //console.log(iconAndTemp); // here also, I am not getting the temp element
  forecastItem.append(date, icon, temp);

  return forecastItem;
}

/**
 * TODO:
 * - Map icon-name to icon
 * - convert datetime to proper format (DONE!)
 */
