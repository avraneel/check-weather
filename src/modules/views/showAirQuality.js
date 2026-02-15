export function showAirQuality(airQualityObject) {
  const airQualityCard = document.createElement("div");
  const heading = document.createElement("h3");
  const airQualityItemList = document.createElement("div");

  airQualityCard.classList.add("card", "air-quality");
  airQualityItemList.classList.toggle("air-quality-items");

  heading.textContent = airQualityObject.title;

  for (const item of Object.values(airQualityObject.items)) {
    const cardItem = document.createElement("div");
    const name = document.createElement("div");
    const icon = document.createElement("img");
    const value = document.createElement("div");

    cardItem.classList.toggle("item");

    name.textContent = item.name;
    value.textContent = `${item.value} ${item.unit}`;

    cardItem.append(name, value);
    airQualityItemList.append(cardItem);
  }

  airQualityCard.append(heading, airQualityItemList);
  return airQualityCard;
}
