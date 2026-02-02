import { formEvent } from "./modules/getLocation";

async function getCurrentData(location) {
  const unit = "metric";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&key=3SBV58YFMG5PWJYHX7M2NQ396&contentType=json`;

  const data = await fetch(url).then((response) => response.json());

  console.log(data.currentConditions);
  console.log(data.days[0]);

  return data;
}

getCurrentData("bangalore");
formEvent();
