import { format } from "date-fns";
import { Card } from "./Data";
import { icons } from "../../index.js";

function currentDate(datetime) {
  return format(new Date(datetime), "d MMMM, h:mm aa");
}

export function getBg(data) {
  return data.currentConditions.icon;
}

export function getMain(data, tempunit) {
  const main = {
    datetime: currentDate(
      `${data.days[0].datetime} ${data.currentConditions.datetime}`,
    ),
    location: data.resolvedAddress,
    imgSrc: icons[`${data.currentConditions.icon}.svg`],
    imgAlt: data.currentConditions.icon,
    temp: `${data.currentConditions.temp}`,
    unit: tempunit,
    desc: `${data.currentConditions.conditions}. ${data.description}`,
  };

  return main;
}

export function getForecast(data, unit, numberDays) {
  const forecast = new Card("Upcoming");

  for (let i = 1; i < numberDays; i++) {
    forecast.addItem(
      format(new Date(data.days[i].datetime), "E, MMM d"),
      icons[`${data.days[i].icon}.svg`],
      data.days[i].icon,
      data.days[i].temp,
      unit,
    );
  }

  return forecast;
}

export function getWind(data) {
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

  return wind;
}

export function processAstronomy(data) {
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

  return astronomy;
}

export function processTemp(data, unit) {
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
    "AQI",
    icons["face-mask.svg"],
    "aqi",
    data.currentConditions.aqius,
    null,
  );
  tempuv.addItem(
    "UV Index",
    icons["uv-index.svg"],
    "tempmin",
    data.currentConditions.uvindex,
    null,
  );

  return tempuv;
}

export function processHumidity(data) {
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
    "mb",
  );

  humidity.addItem(
    "Cloud Cover",
    icons["cloud-cover.svg"],
    "cloud-cover",
    data.currentConditions.cloudcover,
    "%",
  );

  return humidity;
}
