export function showWind(windObject) {
  const windCard = document.createElement("div");
  const heading = document.createElement("h3");
  const windItemList = document.createElement("div");

  windCard.classList.add("card", "wind");
  windItemList.classList.toggle("wind-items");

  heading.textContent = windObject.title;

  for (const item of windObject.items) {
    const cardItem = document.createElement("div");
    const name = document.createElement("div");
    const icon = document.createElement("img");
    const value = document.createElement("div");

    cardItem.classList.toggle("item");

    name.textContent = item.name;
    value.textContent = `${item.value} ${item.unit}`;

    if (item.name === "Beaufort Wind Scale") {
      const beaufortIcon = document.createElement("img");
      beaufortIcon.src = item.imgSrc;
      beaufortIcon.alt = item.imgAlt;
      value.textContent = "";
      value.append(beaufortIcon);
    }

    cardItem.append(name, value);
    windItemList.append(cardItem);
  }
  windCard.append(heading, windItemList);
  return windCard;
}
