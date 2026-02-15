export function renderCard(data, type) {
  const card = document.createElement("div");
  const heading = document.createElement("h3");
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

    if (item.isImage) {
      const img = document.createElement("img");
      img.src = item.value;
      img.alt = item.textValue;
      value.append(img);
    } else {
      value.innerHTML = `${item.textValue} ${item.unit}`;
    }

    cardItem.append(icon, name, value);
    itemList.append(cardItem);
  }
  card.append(heading, itemList);
  return card;
}
