export function renderPage(
  background,
  main,
  tempuv,
  astronomy,
  wind,
  humidity,
  forecast,
) {
  const maindiv = document.querySelector(".content");

  renderBackground(background);
  maindiv.append(
    renderMainElement(main, main.unit),
    renderCardElement(tempuv, "tempuv", false),
    renderCardElement(astronomy, "astronomy", false),
    renderCardElement(wind, "wind", false),
    renderCardElement(humidity, "humidity", false),
    renderCardElement(forecast, "forecast", true),
  );
}

export function renderBackground(background) {
  const body = document.querySelector("body");
  console.log(background);
  switch (background) {
    case "cloudy":
      body.style.background = "linear-gradient(to bottom, #333333, #666666";
      break;
    case "partly-cloudy-night":
      body.style.background = "linear-gradient(to bottom, #383838, #021b36)";
      break;
    case "partly-cloudy-day":
      body.style.background = "linear-gradient(to bottom, #8d8d8d, #0f8ac4)";
      break;
    case "clear-night":
      body.style.background = "linear-gradient(to bottom, #010b25, #021b36";
      break;
    case "clear-day":
      body.style.background = "linear-gradient(to bottom, #2a79c2, #1f99b8)";
      break;
  }

  body.style.backgroundRepeat = "no-repeat";
  body.style.backgroundSize = "cover";
}

export function renderCardElement(data, type, isForecast) {
  const card = document.createElement("div");
  const headingElement = renderTextElement(data.title, "h2");
  const itemListElement = renderItemListElement(
    data.itemList,
    type,
    isForecast,
  );

  card.classList.add("card", type);

  card.append(headingElement, itemListElement);
  return card;
}

export function renderMainElement(main, unit) {
  const mainElement = document.createElement("div");
  const mainIconElement = document.createElement("div");
  const dateLocElement = renderDateLoc(main.datetime, main.location);
  const iconElement = renderIconElement(main.imgSrc, main.imgAlt);
  const tempElement = renderValueElement(main.temp, unit);
  const descElement = renderDescElement(main.desc);

  mainElement.classList.add("card", "main");
  mainIconElement.classList.add("main-icon");
  tempElement.classList.add("main-temp");

  mainIconElement.append(iconElement);
  mainElement.append(dateLocElement, mainIconElement, tempElement, descElement);
  return mainElement;
}

function renderDateLoc(date, location) {
  const dateLocationElement = document.createElement("div");
  const dateElement = renderTextElement(date, "div");
  const locationElement = renderTextElement(location, "div");

  dateLocationElement.classList.add("date-location");
  dateLocationElement.append(dateElement, locationElement);

  return dateLocationElement;
}

function renderDescElement(desc) {
  const descElement = renderTextElement(desc, "div");
  descElement.classList.add("description");

  return descElement;
}

function renderItemListElement(itemList, infoType, isForecast) {
  const itemListElement = document.createElement("div");
  itemListElement.classList.add(`${infoType}-items`);

  for (const item of itemList) {
    const itemElement = renderItemElement(item, isForecast);
    itemListElement.append(itemElement);
  }

  return itemListElement;
}

function renderItemElement(item, isForecast) {
  const itemElement = document.createElement("div");
  const itemNameElement = renderTextElement(item.name, "div");
  const iconElement = renderIconElement(item.iconName, item.alt);
  const valueElement = renderValueElement(item.value, item.unit);

  itemElement.classList.add("item");

  if (isForecast) {
    itemElement.append(itemNameElement, iconElement, valueElement);
  } else {
    itemElement.append(iconElement, itemNameElement, valueElement);
  }

  return itemElement;
}

function renderIconElement(imgSrc, imgAlt) {
  const iconElement = document.createElement("img");
  iconElement.classList.add("icon");

  iconElement.src = imgSrc;
  iconElement.alt = imgAlt;

  return iconElement;
}

function renderValueElement(value, unit) {
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
