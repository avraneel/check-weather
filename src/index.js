import { currentDate } from "./modules/data/CurrentDate.js";
import "./style.css";
import { format } from "date-fns";
import {
  renderBackground,
  renderCardElement,
  renderDateLocationElement,
  renderDescElement,
  renderMainElement,
} from "./modules/views/Renderer.js";
import {
  getWeatherDescription,
  processAstronomy,
  processHumidity,
  processTemp,
  processWind,
} from "./modules/data/DataProcessor.js";
import { fetchData } from "./modules/data/DataFetch.js";
import { Card } from "./modules/data/Data.js";

function importAll(r) {
  let images = {};
  r.keys().map((element, index) => {
    images[element.replace("./", "")] = r(element);
  });
  return images;
}

export const icons = importAll(
  require.context("./assets/images/icons", false, /\.(png|svg|jpg|jpeg|gif)$/i),
);

const searchBtn = document.querySelector(".search-btn");
const modal = document.querySelector(".modal");

const img = document.createElement("img");
img.src = icons["map-search.svg"];
img.alt = "search";

searchBtn.append(img);

// searchBtn.addEventListener("click", () => {
//   modal.showModal();
// });

async function getCurrentData() {
  const data = await fetchData("Bangalore", "metric");

  console.log(data);

  const weatherMainObject = {
    imgSrc: icons[`${data.currentConditions.icon}.svg`],
    imgAlt: data.currentConditions.icon,
    country: data.resolvedAddress.split(", ").at(-1),
    temp: `${data.currentConditions.temp}`,
  };

  const tempuv = processTemp(data, "&deg;C");
  const astronomy = processAstronomy(data);

  console.log(weatherMainObject);

  const timeLocation = {
    datetime: currentDate(
      `${data.days[0].datetime} ${data.currentConditions.datetime}`,
    ),
    location: data.resolvedAddress,
  };

  console.log(timeLocation);

  const dateHeading = currentDate(
    `${data.days[0].datetime} ${data.currentConditions.datetime}`,
  );

  const nextdata = [];

  const forecast = new Card("This Week");

  for (let i = 1; i < 8; i++) {
    forecast.addItem(
      format(new Date(data.days[i].datetime), "E, MMM d"),
      icons[`${data.days[i].icon}.svg`],
      data.days[i].icon,
      data.days[i].temp,
      "&deg;C",
    );
  }

  const humidity = processHumidity(data);
  const wind = processWind(data, "km/h");

  console.log(data.currentConditions);
  console.log(data.days[0]);
  renderBackground(data.currentConditions.icon);

  const maindiv = document.querySelector(".content");

  const weatherDescription = getWeatherDescription(data);

  maindiv.append(
    renderMainElement(
      timeLocation.datetime,
      timeLocation.location,
      weatherMainObject.imgSrc,
      weatherMainObject.imgAlt,
      weatherMainObject.temp,
      weatherDescription,
    ),
    renderCardElement(tempuv, "tempuv", false),
    renderCardElement(astronomy, "astronomy", false),
    renderCardElement(humidity, "humidity", false),
    renderCardElement(wind, "wind", false),
    renderCardElement(forecast, "forecast", true),
  );
}

getCurrentData();

/**
 * TODO:
 * - Tooltips
 * - Fix Cards
 */
