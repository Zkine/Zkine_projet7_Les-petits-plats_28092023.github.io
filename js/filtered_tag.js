import data from "../data/recipes.js";
import { creationCriteriaTable } from "./filtered_input.js";

function tagRender(data) {
  const navTag = document.getElementById("nav-tag-id");
  if (!navTag.hasChildNodes()) {
    const ulTag = document.createElement("ul");
    ulTag.className = "ul-tag";
    navTag.appendChild(ulTag);

    for (let i = 0; i < data.length; i++) {
      const liTag = document.createElement("li");
      liTag.className = "li-tag";
      ulTag.appendChild(liTag);

      const pTag = document.createElement("p");
      pTag.textContent = `${data[i]}`;
      liTag.appendChild(pTag);
    }
  }
}

export function tagData(e) {
  if (
    !e.target.classList.contains("btn-tag-active") &&
    e.target.classList.contains("btn-tag")
  ) {
    e.target.classList.add("btn-tag-active");
  }
  const { ingredients } = creationCriteriaTable(data);
  return tagRender(ingredients);
}
const btnIngredient = document.getElementById("btn-ingredient-id");
btnIngredient.addEventListener("click", tagData);

function removeSearchTag() {
  const formTag = document.getElementById("form-tag-id");
  return formTag.reset();
}
const btnRemoveTag = document.getElementById("btn-remove-tag-id");
btnRemoveTag.addEventListener("click", removeSearchTag);

function tagLeave(e) {
  if (e.target.classList.contains("btn-tag-active")) {
    e.target.classList.remove("btn-tag-active");
  }
}
btnIngredient.addEventListener("mouseleave", tagLeave);
