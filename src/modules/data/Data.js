export class Card {
  constructor(title) {
    this.title = title;
    this.itemList = [];
  }

  addItem(name, iconName, alt, value, unit) {
    this.itemList.push(new Item(name, iconName, alt, value, unit));
  }
}

class Item {
  constructor(name, iconName, alt, value, unit) {
    this.name = name;
    this.iconName = iconName;
    this.alt = alt;
    this.value = value;
    this.unit = unit;
  }
}
