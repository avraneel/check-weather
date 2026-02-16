import { backgrounds } from "../..";

export function renderBackground(background) {
  const body = document.querySelector("body");
  const imglink = backgrounds[`${background}.jpg`];
  console.log(imglink);
  body.style.backgroundImage = `url(${imglink})`;
  body.style.backgroundSize = "cover";
}
