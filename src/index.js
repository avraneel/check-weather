import { formEvent } from "./modules/getLocation";
import {
  TemperatureData,
  PrecipitationData,
  AstronomyData,
  AirQualityData,
} from "./modules/Data.js";

async function getCurrentData(location) {
  const unit = "metric";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&elements=add%3Aaqielement%2Cadd%3Aaqius%2Cadd%3Aco%2Cadd%3Aelevation%2Cadd%3Amoonrise%2Cadd%3Amoonset%2Cadd%3Ano2%2Cadd%3Ao3%2Cadd%3Apm1%2Cadd%3Apm10%2Cadd%3Apm2p5%2Cadd%3Aso2%2Cremove%3AdatetimeEpoch%2Cremove%3Adescription%2Cremove%3Adew%2Cremove%3Asevererisk%2Cremove%3Asolarenergy%2Cremove%3Asolarradiation%2Cremove%3Asource%2Cremove%3Astations%2Cremove%3Awindgust&key=3SBV58YFMG5PWJYHX7M2NQ396&contentType=json`;

  const data = await fetch(url).then((response) => response.json());
  const curr = data.currentConditions;

  const weatherData = {};

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
  // console.log(weatherData);
  console.log(data.currentConditions);
  console.log(data.days[0]);
  console.log(ad);
  console.log(astd);

  return data;
}

getCurrentData("hokkaido");
formEvent();
