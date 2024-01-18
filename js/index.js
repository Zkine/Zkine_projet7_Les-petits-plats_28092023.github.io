import data from "../data/recipes.js";
import { renderMedia, numberOfRecipes } from "./recipe.js";
import { dataFilterSearch } from "./repiceSearch.js";
import { creationCriteriaTable } from "./filtered_input.js";
import { uptadeTags, tagSelection } from "./filtered_tag.js";
// Fonction qui fait appel au DATA des recettes puis la boucle permet d'incrémenter le DOM par défault ou par filtres

const sectionMedias = document.getElementById("section-media-id");
const ingredientSelection = document.getElementById(
  "tag-selection-ingrédients"
);
let values;
export function mediaIncrement(e) {
  if (
    e === undefined ||
    (imputSearch.value === "" &&
      !ingredientSelection.hasChildNodes() &&
      e.target.nodeName !== "P")
  ) {
    values = data;
    const { ingredients } = creationCriteriaTable(e, values);
    uptadeTags(e, ingredients);
    tag();
    e !== undefined &&
      e.target.getAttribute("class") === "remove-tag" &&
      dataFilterSearch(e, values);
  } else {
    let value;
    e.target.nodeName !== "BUTTON" && values
      ? (({ value } = dataFilterSearch(e, values)), tag())
      : (({ value } = dataFilterSearch(e, data)), tag());
    e.target.nodeName === "P" && tagSelection(e);
    values = value;
    tag();
    const { ingredients } = creationCriteriaTable(e, values);
    uptadeTags(e, ingredients);
  }

  while (sectionMedias.hasChildNodes()) {
    sectionMedias.removeChild(sectionMedias.firstChild);
  }

  for (let i = 0; i < values.length; i++) {
    renderMedia(values[i]);
  }
  return numberOfRecipes();
}
const imputSearch = document.getElementById("site-search");
imputSearch.addEventListener("input", mediaIncrement);
function tag() {
  setTimeout(() => {
    const itemIngredient = document.getElementsByClassName("li-tag");
    for (let el = 0; el < itemIngredient.length; el++) {
      itemIngredient[el].addEventListener("click", mediaIncrement);
    }
  }, 0);
}
tag();

export default mediaIncrement();
