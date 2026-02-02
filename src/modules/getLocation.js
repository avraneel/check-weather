export function formEvent() {
  const locationBtn = document.querySelector(".location-btn");

  locationBtn.addEventListener("click", () => {
    const location = document.querySelector("#location").value.toLowerCase();
    alert(location);
  });
}
