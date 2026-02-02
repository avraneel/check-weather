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
  constructor(sunrise, sunset, moonphase, moonrise, moonset) {
    this.sunrise = sunrise;
    this.sunset = sunset;
    this.moonphase = moonphase;
    this.moonrise = moonrise;
    this.moonset = moonset;
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
