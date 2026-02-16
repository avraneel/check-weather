class Item {
  constructor(name, imgSrc, imgAlt, value, unit) {
    this.name = name;
    this.imgSrc = imgSrc;
    this.imgAlt = imgAlt;
    this.value = value;
    this.unit = unit;
  }
}

export class Card {
  constructor(title) {
    this.title = title;
    this.items = [];
  }

  addItem(name, imgSrc, imgAlt, value, unit) {
    this.items.push(new Item(name, imgSrc, imgAlt, value, unit));
  }
}
