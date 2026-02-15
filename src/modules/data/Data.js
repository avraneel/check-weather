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

class Item {
  constructor(name, imgSrc, imgAlt, value, textValue, isImage, unit) {
    this.name = name;
    this.imgSrc = imgSrc;
    this.imgAlt = imgAlt;
    this.value = value;
    this.textValue = textValue;
    this.isImage = isImage;
    this.unit = unit;
  }
}

export class Card {
  constructor(title) {
    this.title = title;
    this.items = [];
  }

  addItem(name, imgSrc, imgAlt, value, textValue, isImage, unit) {
    this.items.push(
      new Item(name, imgSrc, imgAlt, value, textValue, isImage, unit),
    );
  }
}
