export function renderCardElement(data, type) {
  const card = document.createElement("div");
  const headingElement = renderHeadingElement(data, "h2");

  const itemListElement = renderItemListElement(data, type);

  card.classList.add("card", type);

  card.append(headingElement, itemListElement);
  return card;
}

function renderItemListElement(data, infoType) {
  const itemListElement = document.createElement("div");
  itemListElement.classList.toggle(`${infoType}-items`);

  for (const item of data.items) {
    const itemElement = renderItemElement(item);
    itemListElement.append(itemElement);
  }

  return itemListElement;
}

function renderItemElement(item) {
  const itemElement = document.createElement("div");
  const name = document.createElement("div");
  const iconElement = renderItemIconElement(item.imgSrc, item.imgAlt);
  const valueElement = renderItemValueElement(item.value, item.unit);

  itemElement.classList.toggle("item");

  name.textContent = item.name;

  itemElement.append(iconElement, name, valueElement);
  return itemElement;
}

function renderHeadingElement(data, headingType) {
  const headingElement = document.createElement(headingType);
  headingElement.textContent = data.title;

  return headingElement;
}

function renderItemIconElement(iconSrc, iconAltText) {
  const iconElement = document.createElement("img");
  iconElement.src = iconSrc;
  iconElement.alt = iconAltText;

  return iconElement;
}

function renderItemValueElement(value, unit) {
  const valueElement = document.createElement("div");
  valueElement.classList.toggle("value");

  // innerHTML is used as the textContent cannot pass the unit symbol
  if (unit === null) {
    valueElement.innerHTML = `${value}`;
  } else {
    valueElement.innerHTML = `${value} ${unit}`;
  }

  return valueElement;
}
