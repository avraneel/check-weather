import { showDayForecast } from "./showDayForecast";

export function showThisWeek(weekData) {
  const weekWeather = document.createElement("div");
  weekWeather.classList.toggle(".week-weather");
  const h3 = document.createElement("h3");
  h3.textContent = "This Week";
  weekWeather.appendChild(h3);

  const weekContainer = document.createElement("div");

  for (const item of weekData) {
    const forecastContainer = showDayForecast(item);
    weekContainer.appendChild(forecastContainer);
  }

  weekWeather.appendChild(weekContainer);
  return weekWeather;
}
