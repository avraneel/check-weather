import { formEvent } from "./modules/getLocation";
import {
  TemperatureData,
  PrecipitationData,
  AstronomyData,
  AirQualityData,
} from "./modules/Data.js";
import { NextDay } from "./modules/NextData.js";

async function getCurrentData(location) {
  const unit = "metric";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Bangalore?unitGroup=us&key=3SBV58YFMG5PWJYHX7M2NQ396&contentType=json`;

  const data = await fetch(url).then((response) => response.json());
  const curr = data.currentConditions;
  const days = data.days;

  const weatherData = {};

  const td = new TemperatureData(
    curr.temp,
    data.days[0].tempmax,
    data.days[0].tempmin,
  );

  const astd = new AstronomyData(
    curr.sunrise,
    curr.sunset,
    curr.moonphase,
    data.days[0].moonrise,
    data.days[0].moonset,
  );

  // weatherData.temp = getTemp(data);
  const ad = new AirQualityData(
    curr.aqius,
    curr.aqielement,
    curr.pm1,
    curr.pm2p5,
    curr.pm10,
    curr.so2,
    curr.no2,
    curr.o3,
    curr.co,
  );

  const nextdata = [];

  for (let i = 1; i < 7; i++) {
    const nextday = new NextDay(days[i].datetime, days[i].icon, days[i].temp);
    nextdata.push(nextday);
  }

  // console.log(weatherData);
  console.log(data);
  console.log(nextdata);
  console.log(data.currentConditions);
  console.log(data.days[0]);
  console.log(ad);
  console.log(astd);
  console.log(td);

  return data;
}

getCurrentData("hokkaido");
formEvent();
