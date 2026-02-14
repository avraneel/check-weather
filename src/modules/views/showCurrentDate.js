import { currentDate } from "../data/CurrentDate";

export function showCurrentDate(dateString) {
  const currentDateDiv = document.createElement("div");
  currentDateDiv.classList.toggle("current-date");

  currentDateDiv.textContent = currentDate(dateString);

  return currentDateDiv;
}
