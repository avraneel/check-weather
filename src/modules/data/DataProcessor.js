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

export function processWind(data) {}
