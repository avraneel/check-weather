export function renderWeatherMain(weatherMainObject) {
  const weatherMain = document.createElement("div");

  const weatherMainTop = document.createElement("div");
  const icon = document.createElement("img");
  const address = document.createElement("div");
  const location = document.createElement("div");
  //const country = document.createElement("span");
  const desc = document.createElement("p");
  const temp = document.createElement("div");

  weatherMain.classList.toggle("weather-main");
  //weatherMainTop.classList.toggle("weather-main-top");
  icon.classList.toggle("main-icon");
  location.classList.toggle("location");
  temp.classList.toggle("main-temp");
  desc.classList.toggle("description");

  icon.src = weatherMainObject.imgSrc;
  icon.alt = weatherMainObject.imgAlt;

  location.textContent = weatherMainObject.location;

  //country.textContent = weatherMainObject.country;

  desc.textContent = weatherMainObject.description;

  temp.textContent = weatherMainObject.temp;

  //address.append(location, country);
  // weatherMainTop.append(icon, location, temp);
  weatherMain.append(icon, location, temp, desc);
  return weatherMain;
}
