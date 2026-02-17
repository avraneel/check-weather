export function renderCardElement(data, type) {
  const card = document.createElement("div");
  const headingElement = renderTextElement(data.title, "h2");
  const itemListElement = renderItemListElement(data.itemList, type);

  card.classList.add("card", type);

  card.append(headingElement, itemListElement);
  return card;
}

export function renderMainElement(imgSrc, imgAlt, temperature) {
  const mainElement = document.createElement("div");
  const iconElement = renderIconElement(imgSrc, imgAlt);
  const tempElement = renderTextElement(temperature, "div");

  mainElement.classList.add("card", "main");

  mainElement.append(iconElement, tempElement);
  return mainElement;
}

export function renderDateLocationElement(date, location) {
  const dateLocationElement = document.createElement("div");
  const dateElement = renderTextElement(date, "div");
  const locationElement = renderTextElement(location, "div");

  dateLocationElement.classList.add("date-location");
  dateLocationElement.append(dateElement, locationElement);

  return dateLocationElement;
}

export function renderDescElement(description) {
  const descElement = renderTextElement(description, "div");
  descElement.classList.add("description");

  return descElement;
}

function renderItemListElement(itemList, infoType) {
  const itemListElement = document.createElement("div");
  itemListElement.classList.add(`${infoType}-items`);

  for (const item of itemList) {
    const itemElement = renderItemElement(item);
    itemListElement.append(itemElement);
  }

  return itemListElement;
}

function renderItemElement(item) {
  const itemElement = document.createElement("div");
  const itemNameElement = renderTextElement(item.name, "div");
  const iconElement = renderIconElement(item.iconName, item.alt);
  const valueElement = renderItemValueElement(item.value, item.unit);

  itemElement.classList.add("item");

  itemElement.append(iconElement, itemNameElement, valueElement);
  return itemElement;
}

function renderIconElement(imgSrc, imgAlt) {
  const iconElement = document.createElement("img");
  iconElement.src = imgSrc;
  iconElement.alt = imgAlt;

  return iconElement;
}

function renderItemValueElement(value, unit) {
  const valueElement = document.createElement("div");
  valueElement.classList.add("value");

  // innerHTML is used as the textContent cannot pass the unit symbol
  if (unit === null) {
    valueElement.innerHTML = `${value}`;
  } else {
    valueElement.innerHTML = `${value} ${unit}`;
  }

  return valueElement;
}

function renderTextElement(text, elementTag) {
  const textElement = document.createElement(elementTag);
  textElement.textContent = text;

  return textElement;
}
