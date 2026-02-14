import { format } from "date-fns";

export class TemperatureData {
  constructor(temp, tempmax, tempmin) {
    this.temp = temp;
    this.tempmax = tempmax;
    this.tempmin = tempmin;
  }
}

export class PrecipitationData {
  constructor(precip, precipprob, snow, snowdepth) {
    this.precip = precip;
    this.precipprob = precipprob;
  }
}

export class AstronomyData {
  constructor(date, sunrise, sunset, moonphase, moonrise, moonset) {
    this.date = date;
    this.sunrise = format(new Date(`${date} ${sunrise}`), "h:mm b");
    this.sunset = format(new Date(`${date} ${sunset}`), "h:mm b");
    this.moonrise = format(new Date(`${date} ${moonrise}`), "h:mm b");
    this.moonset = format(new Date(`${date} ${moonset}`), "h:mm b");
  }
}

export class AirQualityData {
  constructor(aqi, element, pm1, pm2p5, pm10, so2, no2, o3, co) {
    this.aqi = aqi;
    this.element = element;
    this.pm1 = pm1;
    this.pm2p5 = pm2p5;
    this.pm10 = pm10;
    this.so2 = so2;
    this.no2 = no2;
    this.o3 = o3;
    this.co = co;
  }
}
