export function renderBackground(background) {
  const body = document.querySelector("body");
  console.log(background);
  switch (background) {
    case "cloudy":
      body.style.background = "linear-gradient(to bottom, #333333, #666666";
      break;
    case "partly-cloudy-night":
      body.style.background = "linear-gradient(to bottom, #383838, #021b36)";
      break;
    case "partly-cloudy-day":
      body.style.background = "linear-gradient(to bottom, #8d8d8d, #0f8ac4)";
      break;
    case "clear-night":
      body.style.background = "linear-gradient(to bottom, #010b25, #021b36";
      break;
    case "clear-day":
      body.style.background = "linear-gradient(to bottom, #2a79c2, #1f99b8)";
  }

  body.style.backgroundRepeat = "no-repeat";
  body.style.backgroundSize = "cover";
}
