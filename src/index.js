import "./style.css";
import { fetchData } from "./modules/data/DataFetch.js";

function importAll(r) {
  let images = {};
  r.keys().map((element, index) => {
    images[element.replace("./", "")] = r(element);
  });
  return images;
}

console.log("I am here");

export const icons = importAll(
  require.context("./assets/images/icons", false, /\.(png|svg|jpg|jpeg|gif)$/i),
);

// const img = document.createElement("img");
// img.src = icons["map-search.svg"];
// img.alt = "search";

// const searchBtn = document.querySelector(".search-btn");
// const searchBar = document.querySelector(".search-bar");

// // searchBtn.append(img);
// searchBtn.textContent = "Search";

// searchBtn.addEventListener("click", () => {
//   const location = searchBar.value.trim();
//   fetchData(location, "metric");
// });

fetchData("Bangalore", "metric");
