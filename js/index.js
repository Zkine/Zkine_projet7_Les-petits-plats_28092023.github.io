import data from "../data/recipes.js";
import { renderMedia, numberOfRecipes } from "./recipe.js";
import { dataFilterSearch } from "./repiceSearch.js";
import { creationCriteriaTable } from "./filtered_input.js";
import { uptadeTags, tagData } from "./filtered_tag.js";
// Fonction qui fait appel au DATA des recettes puis la boucle permet d'incrémenter le DOM par défault ou par filtres

const sectionMedias = document.getElementById("section-media-id");
const ingredientSelection = document.getElementById(
  "tag-selection-ingrédients"
);
let values;
export function mediaIncrement(e) {
  if (
    imputSearch.value === "" &&
    !ingredientSelection.hasChildNodes() &&
    e === undefined
  ) {
    values = data;
    const { ingredients } = creationCriteriaTable(e, values);
    uptadeTags(e, ingredients);
  } else {
    const { value } = dataFilterSearch(e, values, imputSearch);
    value !== undefined && (values = value);
    if (e.target.getAttribute("class") !== "remove-tag") {
      const { ingredients } = creationCriteriaTable(e, values);
      uptadeTags(e, ingredients);
    }
  }
  while (sectionMedias.hasChildNodes()) {
    sectionMedias.removeChild(sectionMedias.firstChild);
  }

  for (let i = 0; i < values.length; i++) {
    renderMedia(values[i]);
  }
  numberOfRecipes();
  e !== undefined && tagData(e, btnIngredient);
}
const imputSearch = document.getElementById("site-search");
imputSearch.addEventListener("input", mediaIncrement);
const btnIngredient = document.getElementById("btn-ingredient-id");
btnIngredient.addEventListener("click", mediaIncrement);

export default mediaIncrement();
