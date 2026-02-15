export function showTimeLocation(timeLocation) {
  const timeLocationDiv = document.createElement("div");
  const fetchTime = document.createElement("div");
  const location = document.createElement("div");

  fetchTime.classList.toggle("fetch-date");
  location.classList.toggle("location");

  fetchTime.textContent = timeLocation.datetime;
  location.textContent = timeLocation.location;

  timeLocationDiv.append(fetchTime, location);
  return timeLocationDiv;
}
