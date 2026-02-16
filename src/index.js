import { showThisWeek } from "./modules/views/showThisWeek.js";
import { currentDate } from "./modules/data/CurrentDate.js";
import "./style.css";
import { renderCurrentWeather } from "./modules/views/renderWeatherMain.js";
import { format } from "date-fns";
import { showTimeLocation } from "./modules/views/showCurrentDate.js";
import { renderCard } from "./modules/views/renderCard.js";
import { Card } from "./modules/data/Data.js";
import {
  processAstronomy,
  processHumidity,
  processTemp,
  processWind,
} from "./modules/data/DataProcessor.js";

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

export const backgrouds = importAll(
  require.context(
    "./assets/images/backgrounds",
    false,
    /\.(png|svg|jpg|jpeg|gif)$/i,
  ),
);

async function getCurrentData(location) {
  const unit = "metric";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&elements=add%3Aaqielement%2Cadd%3Aaqieur%2Cadd%3Aaqius%2Cadd%3Aco%2Cadd%3Amoonrise%2Cadd%3Amoonset%2Cadd%3Ano2%2Cadd%3Ao3%2Cadd%3Apm1%2Cadd%3Apm10%2Cadd%3Apm2p5%2Cadd%3Aso2%2Cremove%3AdatetimeEpoch%2Cremove%3Asolarenergy%2Cremove%3Awindgust&key=3SBV58YFMG5PWJYHX7M2NQ396&contentType=json`;

  const data = await fetch(url).then((response) => response.json());

  const weatherMainObject = {
    datetime: currentDate(
      `${data.days[0].datetime} ${data.currentConditions.datetime}`,
    ),
    location: data.resolvedAddress,
    imgSrc: icons[`${data.currentConditions.icon}.svg`],
    imgAlt: data.currentConditions.icon,
    country: data.resolvedAddress.split(", ").at(-1),
    temp: `${data.currentConditions.temp} &deg;C`,
    description: data.description,
  };

  const tempuv = processTemp(data, "&deg;C");

  const tempElement = renderCard(tempuv, "tempuv");

  const astronomy = processAstronomy(data);

  const astronomyElement = renderCard(astronomy, "astronomy");
  console.log(astronomyElement);

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

  for (let i = 1; i < 8; i++) {
    const nextDay = {
      date: format(new Date(data.days[i].datetime), "E, MMM d"),
      imgSrc: icons[`${data.days[i].icon}.svg`],
      imgAlt: data.days[i].icon,
      condition: data.days[i].conditions,
      temp: data.days[i].temp,
    };
    nextdata.push(nextDay);
  }

  const humidity = processHumidity(data);

  const humidityElement = renderCard(humidity, "humidity");

  const wind = processWind(data, "km/h");

  const windElement = renderCard(wind, "wind");

  console.log(nextdata);
  console.log(data.currentConditions);
  console.log(data.days[0]);
  console.log(dateHeading);
  console.log(data.address);

  const maindiv = document.querySelector(".content");
  const dhDiv = showTimeLocation(dateHeading);
  maindiv.append(dhDiv);
  const weatherMain = renderCurrentWeather(weatherMainObject);
  maindiv.append(weatherMain);
  maindiv.append(tempElement);
  const thisweek = showThisWeek(nextdata);
  maindiv.appendChild(thisweek);
  maindiv.append(astronomyElement);
  maindiv.append(humidityElement);
  maindiv.append(windElement);
  // const currDate = showDateHeading(dateHeading);
  // maindiv.appendChild(currDate);
  // console.log(data.address);
  // const loc = showAddress(data.address);
  // maindiv.appendChild(loc);
  return data;
}

getCurrentData("Bengaluru");

/**
 * TODO:
 * - Tooltips
 * - Add Max and Min Temps
 * - Fix Cards
 */
