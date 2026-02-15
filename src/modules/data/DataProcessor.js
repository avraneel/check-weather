import { nextDay } from "date-fns";
import { Card } from "./Data";

function processAQData(data) {
  const aqData = new Card("Air Quality");
}

function processThisWeek(data) {
  const thisweek = [];

  for (let i = 1; i < 8; i++) {
    const nextDay = {
      date: format(new Date(data.days[i].datetime), "E, MMM d"),
      imgSrc: images[`${data.days[i].icon}.svg`],
      imgAlt: data.days[i].icon,
      temp: data.days[i].temp,
    };
    thisweek.push(nextDay);
  }

  return thisweek;
}

export function processWind(data, unit) {
  const wind = new Card("Wind");

  wind.addItem(
    "Wind Speed",
    icons["windsock.svg"],
    null,
    null,
    data.currentConditions.windspeed,
    false,
    unit,
  );
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
