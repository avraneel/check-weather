import { currentDate } from "./modules/data/CurrentDate.js";
import "./style.css";
import { format } from "date-fns";
import {
  renderBackground,
  renderCardElement,
  renderMainElement,
  renderPage,
} from "./Renderer.js";
import { getMain } from "./modules/data/DataProcessor.js";
import { fetchData } from "./modules/data/DataFetch.js";
import { Card } from "./modules/data/Data.js";

function importAll(r) {
  let images = {};
  r.keys().map((element, index) => {
    images[element.replace("./", "")] = r(element);
  });
  return images;
}

export const icons = importAll(
  require.context("./assets/images/icons", false, /\.(png|svg|jpg|jpeg|gif)$/i),
);

const searchBtn = document.querySelector(".search-btn");
const modal = document.querySelector(".modal");

const img = document.createElement("img");
img.src = icons["map-search.svg"];
img.alt = "search";

searchBtn.append(img);

async function getCurrentData() {
  const data = await fetchData("Bangalore", "metric");
}

getCurrentData();
