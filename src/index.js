import { TemperatureData, PrecipitationData } from "./modules/data/Data.js";
import { showThisWeek } from "./modules/views/showThisWeek.js";
import { currentDate } from "./modules/data/CurrentDate.js";
import { showAstronomyData } from "./modules/views/showAstronomyData.js";
import { showAddress } from "./modules/views/showAddress.js";
import "./style.css";
import { renderCurrentWeather } from "./modules/views/renderWeatherMain.js";
import { format } from "date-fns";
import { showTimeLocation } from "./modules/views/showCurrentDate.js";
import { showAirQuality } from "./modules/views/showAirQuality.js";
import { showWind } from "./modules/views/showWind.js";
import { renderDescription } from "./modules/views/renderDescription.js";
import { renderHumidity } from "./modules/views/renderHumidity.js";
import { getBeaufortFromMetric } from "./getBeaufort.js";

function importAll(r) {
  let images = {};
  r.keys().map((element, index) => {
    images[element.replace("./", "")] = r(element);
  });
  return images;
}

export const images = importAll(
  require.context("./assets/images/icons", false, /\.(png|svg|jpg|jpeg|gif)$/i),
);

async function getCurrentData(location) {
  const unit = "metric";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&elements=add%3Aaqielement%2Cadd%3Aaqieur%2Cadd%3Aaqius%2Cadd%3Aco%2Cadd%3Amoonrise%2Cadd%3Amoonset%2Cadd%3Ano2%2Cadd%3Ao3%2Cadd%3Apm1%2Cadd%3Apm10%2Cadd%3Apm2p5%2Cadd%3Aso2%2Cremove%3AdatetimeEpoch%2Cremove%3Asolarenergy%2Cremove%3Awindgust&key=3SBV58YFMG5PWJYHX7M2NQ396&contentType=json`;

  const data = await fetch(url).then((response) => response.json());
  const curr = data.currentConditions;

  const weatherMainObject = {
    datetime: currentDate(
      `${data.days[0].datetime} ${data.currentConditions.datetime}`,
    ),
    location: data.resolvedAddress,
    imgSrc: images[`${data.currentConditions.icon}.svg`],
    imgAlt: data.currentConditions.icon,
    country: data.resolvedAddress.split(", ").at(-1),
    temp: `${data.currentConditions.temp} &deg;C`,
    description: data.description,
  };

  const astronomyObject = {
    title: "Astronomy",
    items: {
      sunrise: {
        name: "Sunrise",
        imgSrc: images[`sunrise.svg`],
        imgAlt: "sunrise",
        value: format(
          new Date(`${data.days[0].datetime} ${data.days[0].sunrise}`),
          "hh:mm b",
        ),
      },
      sunset: {
        name: "Sunset",
        imgSrc: images[`sunset.svg`],
        imgAlt: "sunset",
        value: format(
          new Date(`${data.days[0].datetime} ${data.days[0].sunrise}`),
          "hh:mm b",
        ),
      },
      moonrise: {
        name: "Moonrise",
        imgSrc: images[`moonrise.svg`],
        imgAlt: "moonrise",
        value: format(
          new Date(`${data.days[0].datetime} ${data.days[0].sunrise}`),
          "hh:mm b",
        ),
      },
      moonset: {
        name: "Moonset",
        imgSrc: images[`moonset.svg`],
        imgAlt: "moonset",
        value: format(
          new Date(`${data.days[0].datetime} ${data.days[0].sunrise}`),
          "hh:mm b",
        ),
      },
    },
  };

  console.log(astronomyObject);

  console.log(weatherMainObject);

  const td = new TemperatureData(
    curr.temp,
    data.days[0].tempmax,
    data.days[0].tempmin,
  );

  const airQualityData = {
    title: "Air Quality",
    items: {
      aqi: {
        name: "AQI",
        value: data.currentConditions.aqius,
      },
      pm1: {
        name: "PM1",
        value: data.currentConditions.pm1,
      },
      pm2p5: {
        name: "PM2.5",
        value: data.currentConditions.pm2p5,
      },
      pm10: {
        name: "PM10",
        value: data.currentConditions.pm10,
      },
      so2: {
        name: "SO2",
        value: data.currentConditions.so2,
        unit: "ppb",
      },
      no2: {
        name: "NO2",
        value: data.currentConditions.no2,
        unit: "ppb",
      },
      o3: {
        name: "O3",
        value: data.currentConditions.so2,
        unit: "ppb",
      },
      co: {
        name: "CO",
        value: data.currentConditions.co,
        unit: "ppb",
      },
    },
  };

  console.log(airQualityData);

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
      imgSrc: images[`${data.days[i].icon}.svg`],
      imgAlt: data.days[i].icon,
      condition: data.days[i].conditions,
      temp: data.days[i].temp,
    };
    nextdata.push(nextDay);
  }

  const humidityPressure = {
    title: "Pressure, Humidity and Clouds",
    items: [
      {
        name: "Relative Humidity",
        imgSrc: images["humidity.svg"],
        imgAlt: "humidity %",
        value: `${data.currentConditions.humidity}`,
        unit: "%",
      },
      {
        name: "Dew Point",
        imgSrc: images["thermometer-raindrop.svg"],
        imgAlt: "dew point%",
        value: `${data.currentConditions.dew}`,
        unit: "&deg;C",
      },
      {
        name: "Pressure",
        imgSrc: images["barometer.svg"],
        imgAlt: "barometer",
        value: data.currentConditions.pressure,
      },
      {
        name: "Cloud Cover",
        value: data.currentConditions.cloudcover,
        unit: "%",
      },
    ],
  };

  console.log(humidityPressure);

  const beaufortSpeed = getBeaufortFromMetric(data.currentConditions.windspeed);
  console.log(images["wind-beaufort-1.svg"]);

  const wind = {
    title: "Wind",
    items: [
      {
        name: "Wind Speed",
        value: data.currentConditions.windspeed,
        unit: "mph",
      },
      {
        name: "Beaufort Wind Scale",
        imgSrc: images[`wind-beaufort-${beaufortSpeed}.svg`],
        imgAlt: `beaufort-${beaufortSpeed}`,
        value: beaufortSpeed,
      },
      {
        name: "Wind Direction",
        value: data.currentConditions.winddir,
        unit: "&deg;",
      },
    ],
  };

  console.log(wind);

  console.log(data);
  console.log(nextdata);
  console.log(data.currentConditions);
  console.log(data.days[0]);
  console.log(dateHeading);
  console.log(data.address);
  console.log(td);

  const maindiv = document.querySelector(".content");
  const dhDiv = showTimeLocation(dateHeading);
  maindiv.append(dhDiv);
  const weatherMain = renderCurrentWeather(weatherMainObject);
  maindiv.append(weatherMain);
  // const desc = renderDescription(description);
  // maindiv.append(desc);
  const thisweek = showThisWeek(nextdata);
  maindiv.appendChild(thisweek);
  const astronomyCard = showAstronomyData(astronomyObject);
  maindiv.append(astronomyCard);
  const airQualityCard = showAirQuality(airQualityData);
  maindiv.append(airQualityCard);
  const humidityCard = renderHumidity(humidityPressure);
  maindiv.append(humidityCard);
  const windCard = showWind(wind);
  maindiv.append(windCard);
  // const currDate = showDateHeading(dateHeading);
  // maindiv.appendChild(currDate);
  // console.log(data.address);
  // const loc = showAddress(data.address);
  // maindiv.appendChild(loc);
  return data;
}

getCurrentData("Barrow Island");

/**
 * TODO:
 * - Tooltips
 * - Add Max and Min Temps
 * - Fix Cards
 */
