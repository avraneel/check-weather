/**
 * returns the RHS div element
 */
export function showCurrentData() {
  const currentData = document.createElement("div");
  currentData.classList.toggle("current-data");

  return currentData;
}
