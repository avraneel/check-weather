export function renderCurrentWeather(currentWeatherObject) {
  const currentWeather = document.createElement("div");

  const fetchTime = document.createElement("div");
  const location = document.createElement("div");
  const conditionDiv = document.createElement("div");
  const icon = document.createElement("img");
  const temp = document.createElement("div");
  const desc = document.createElement("div");

  fetchTime.classList.toggle("fetch-time");
  location.classList.toggle("location");
  currentWeather.classList.toggle("main");
  conditionDiv.classList.toggle("current-condition");
  icon.classList.toggle("current-icon");
  temp.classList.toggle("current-temp");
  desc.classList.toggle("description");

  fetchTime.textContent = currentWeatherObject.datetime;
  location.textContent = currentWeatherObject.location;
  icon.src = currentWeatherObject.imgSrc;
  icon.alt = currentWeatherObject.imgAlt;
  temp.innerHTML = currentWeatherObject.temp;
  desc.textContent = currentWeatherObject.description;

  conditionDiv.append(icon, temp);
  currentWeather.append(fetchTime, location, conditionDiv, desc);
  return currentWeather;
}
