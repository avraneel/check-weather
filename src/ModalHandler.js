import { fetchData } from "./modules/data/DataFetch";

const searchBtn = document.querySelector(".search-btn");
const searchBar = document.querySelector("#search-bar");

searchBtn.addEventListener("click", () => {
  const location = searchBar.value.trim();
  getWeather(location);
});

function getWeather(location) {
  data = fetchData(location, "metric");
}
