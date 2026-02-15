export function renderDescription(description) {
  const desc = document.createElement("p");
  desc.classList.toggle("description");
  desc.textContent = description;

  return desc;
}
