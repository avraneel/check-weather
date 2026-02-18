import { renderPage } from "../../Renderer";
import {
  getMain,
  processAstronomy,
  processHumidity,
  processTemp,
  getWind,
  getForecast,
  getBg,
} from "./DataProcessor";

const usUnits = {
  temp: "&deg;F",
  speed: "mph",
};

const metricUnits = {
  temp: "&deg;C",
  temp: "km/h",
};

export async function fetchData(location, unit) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&elements=add%3Aaqielement%2Cadd%3Aaqieur%2Cadd%3Aaqius%2Cadd%3Aco%2Cadd%3Amoonrise%2Cadd%3Amoonset%2Cadd%3Ano2%2Cadd%3Ao3%2Cadd%3Apm1%2Cadd%3Apm10%2Cadd%3Apm2p5%2Cadd%3Aso2%2Cremove%3AdatetimeEpoch%2Cremove%3Asolarenergy%2Cremove%3Awindgust&key=3SBV58YFMG5PWJYHX7M2NQ396&contentType=json`;

  const data = await fetch(url).then((response) => response.json());

  Object.freeze(data);

  const astronomy = processAstronomy(data);
  const humidity = processHumidity(data);
  const bg = getBg(data);
  let main = {};
  let tempuv = {};
  let wind = {};
  let forecast = {};

  const days = 8;

  if (unit === "us") {
    main = getMain(data, usUnits.temp);
    tempuv = processTemp(data, usUnits.temp);
    wind = getWind(data, usUnits.speed);
    forecast = getForecast(data, usUnits.temp, days);
  } else if (unit === "metric") {
    main = getMain(data, metricUnits.temp);
    tempuv = processTemp(data, metricUnits.temp);
    wind = getWind(data, metricUnits.speed);
    forecast = getForecast(data, metricUnits.temp, days);
  }

  renderPage(bg, main, tempuv, astronomy, wind, humidity, forecast);
  console.log(main);
  console.log(tempuv);

  return data;
}
