export function renderHumidity(humidityPressure) {
  const card = document.createElement("div");
  const heading = document.createElement("h3");
  const cardItemList = document.createElement("div");

  card.classList.add("card", "humidity");
  cardItemList.classList.toggle("humidity-items");

  heading.textContent = humidityPressure.title;

  for (const item of humidityPressure.items) {
    const cardItem = document.createElement("div");
    const name = document.createElement("div");
    const icon = document.createElement("img");
    const value = document.createElement("div");

    cardItem.classList.toggle("item");

    name.textContent = item.name;
    icon.src = item.imgSrc;
    icon.alt = item.imgAlt;
    value.innerHTML = `${item.value} ${item.unit}`;

    cardItem.append(icon, name, value);
    cardItemList.append(cardItem);
  }

  card.append(heading, cardItemList);
  return card;
}
