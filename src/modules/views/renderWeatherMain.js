export function renderWeatherMain(weatherMainObject) {
  const weatherMain = document.createElement("div");
  weatherMain.classList.toggle("weather-main");

  const icon = document.createElement("img");
  icon.src = "../../assets/";
  icon.alt = weatherMainObject.icon;

  const address = document.createElement("div");

  const location = document.createElement("span");
  location.textContent = weatherMainObject.location;

  const country = document.createElement("span");
  country.textContent = weatherMainObject.country;

  address.append(location, country);

  const desc = document.createElement("p");
  desc.textContent = weatherMainObject.description;

  const temp = document.createElement("p");
  temp.textContent = weatherMainObject.temp;

  weatherMain.append(icon, address, temp, desc);
  return weatherMain;
}
