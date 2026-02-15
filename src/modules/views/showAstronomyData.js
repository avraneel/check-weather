import { AstronomyData } from "../data/Data";
import { images } from "../..";

export function showAstronomyData(astronomyObject) {
  const astronomyCard = document.createElement("div");
  const h3 = document.createElement("h3");
  const astronomyItemList = document.createElement("div");

  astronomyCard.classList.add("card", "astronomy");
  astronomyItemList.classList.toggle("astronomy-items");

  h3.textContent = astronomyObject.title;

  for (const item of Object.values(astronomyObject.items)) {
    const cardItem = document.createElement("div");
    const name = document.createElement("div");
    const icon = document.createElement("img");
    const time = document.createElement("div");

    cardItem.classList.toggle("item");

    name.textContent = item.name;
    icon.src = item.imgSrc;
    icon.alt = item.imgAlt;
    time.textContent = item.value;

    cardItem.append(icon, name, time);
    astronomyItemList.append(cardItem);
  }

  astronomyCard.append(h3, astronomyItemList);
  return astronomyCard;
}
