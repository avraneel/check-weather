/**
 * returns the LHS div element
 */
export function showCurrentData() {
  const currentData = document.createElement("div");
  currentData.classList.toggle("current-data");

  return currentData;
}
