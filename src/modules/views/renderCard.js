export function renderCard(data, type) {
  const card = document.createElement("div");
  const heading = document.createElement("h2");
  const itemList = document.createElement("div");

  card.classList.add("card", type);
  itemList.classList.toggle(`${type}-items`);

  heading.textContent = data.title;

  for (const item of data.items) {
    const cardItem = document.createElement("div");
    const name = document.createElement("div");
    const icon = document.createElement("img");
    const value = document.createElement("div");

    cardItem.classList.toggle("item");
    value.classList.toggle("value");

    name.textContent = item.name;
    icon.src = item.imgSrc;
    icon.alt = item.imgAlt;

    if (item.unit === null) {
      value.innerHTML = `${item.value}`;
    } else {
      value.innerHTML = `${item.value} ${item.unit}`;
    }

    cardItem.append(icon, name, value);
    itemList.append(cardItem);
  }
  card.append(heading, itemList);
  return card;
}
