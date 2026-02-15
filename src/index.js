import { showThisWeek } from "./modules/views/showThisWeek.js";
import { currentDate } from "./modules/data/CurrentDate.js";
import "./style.css";
import { renderCurrentWeather } from "./modules/views/renderWeatherMain.js";
import { format } from "date-fns";
import { showTimeLocation } from "./modules/views/showCurrentDate.js";
import { showAirQuality } from "./modules/views/showAirQuality.js";
import { showWind } from "./modules/views/showWind.js";
import { renderHumidity } from "./modules/views/renderHumidity.js";
import { getBeaufortFromMetric } from "./getBeaufort.js";
import { renderCard } from "./modules/views/renderCard.js";
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
  const curr = data.currentConditions;

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

  const tempuv = new Card("Temperature & UV");

  tempuv.addItem(
    "Max",
    icons["thermometer-high.svg"],
    "tempmax",
    data.days[0].tempmax,
    "&deg;C",
  );
  tempuv.addItem(
    "Min",
    icons["thermometer-low.svg"],
    "tempmin",
    data.days[0].tempmin,
    "&deg;C",
  );
  tempuv.addItem(
    "UV Index",
    icons["uv-index.svg"],
    "tempmin",
    data.currentConditions.uvindex,
    null,
  );

  const tempElement = renderCard(tempuv, "tempuv");

  const astronomy = new Card("Astronomy");

  astronomy.addItem(
    "Sunrise",
    icons["sunrise.svg"],
    "sunrise",
    format(
      new Date(`${data.days[0].datetime} ${data.days[0].sunrise}`),
      "hh:mm b",
    ),
    null,
  );

  astronomy.addItem(
    "Sunset",
    icons["sunset.svg"],
    "sunset",
    format(
      new Date(`${data.days[0].datetime} ${data.days[0].sunset}`),
      "hh:mm b",
    ),
    null,
  );

  astronomy.addItem(
    "Moonrise",
    icons["moonrise.svg"],
    "moonrise",
    format(
      new Date(`${data.days[0].datetime} ${data.days[0].moonrise}`),
      "hh:mm b",
    ),
    null,
  );

  astronomy.addItem(
    "Moonset",
    icons["moonset.svg"],
    "moonset",
    format(
      new Date(`${data.days[0].datetime} ${data.days[0].moonset}`),
      "hh:mm b",
    ),
    null,
  );

  console.log(astronomy);

  const astronomyElement = renderCard(astronomy, "astronomy");
  console.log(astronomyElement);

  console.log(weatherMainObject);

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
      imgSrc: icons[`${data.days[i].icon}.svg`],
      imgAlt: data.days[i].icon,
      condition: data.days[i].conditions,
      temp: data.days[i].temp,
    };
    nextdata.push(nextDay);
  }

  const humidity = new Card("Humidity and Pressure");

  humidity.addItem(
    "Relative Humidity",
    icons["humidity.svg"],
    "relative-humidity",
    data.currentConditions.humidity,
    "%",
  );

  humidity.addItem(
    "Dew Point",
    icons["dew-point.svg"],
    "dew-point",
    data.currentConditions.dew,
    "%",
  );

  humidity.addItem(
    "Pressure",
    icons["barometer.svg"],
    "pressure",
    data.currentConditions.pressure,
    "mba",
  );

  humidity.addItem(
    "Cloud Cover",
    icons["cloud-cover.svg"],
    "cloud-cover",
    data.currentConditions.cloudcover,
    "%",
  );

  const humidityElement = renderCard(humidity, "humidity");

  const wind = new Card("Wind");

  wind.addItem(
    "Wind Speed",
    icons["windsock.svg"],
    "wind-speed",
    data.currentConditions.windspeed,
    "km/h",
  );

  wind.addItem(
    "Wind Direction",
    icons["wind-direction.svg"],
    "wind-direction",
    data.currentConditions.winddir,
    "&deg;",
  );

  const windElement = renderCard(wind, "wind");

  console.log(data);
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
  const airQualityCard = showAirQuality(airQualityData);
  maindiv.append(airQualityCard);
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
