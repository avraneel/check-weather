export function renderWeatherMain(weatherMainObject) {
  const weatherMain = document.createElement("div");
  weatherMain.classList.toggle("weather-main");

  const icon = document.createElement("img");
  const address = document.createElement("div");
  const location = document.createElement("span");
  const country = document.createElement("span");
  const desc = document.createElement("p");
  const temp = document.createElement("div");

  icon.src = "../../assets/";
  icon.alt = weatherMainObject.icon;

  location.textContent = weatherMainObject.location;

  country.textContent = weatherMainObject.country;

  desc.textContent = weatherMainObject.description;

  temp.textContent = weatherMainObject.temp;

  address.append(location, country);
  weatherMain.append(icon, address, temp, desc);
  return weatherMain;
}
