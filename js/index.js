import data from "../data/recipes.js";
import { renderMedia, numberOfRecipes } from "./recipe.js";
import { dataFilterSearch } from "./repiceSearch.js";
import { creationCriteriaTable } from "./filtered_input.js";
import { uptadeTags } from "./filtered_tag.js";
// Fonction qui fait appel au DATA des recettes puis la boucle permet d'incrémenter le DOM par défault ou par filtres

const sectionMedias = document.getElementById("section-media-id");
let values;
let ingredients;
export function mediaIncrement(e) {
  if (e === undefined || e.target.getAttribute("id") === "btn-remove-id") {
    values = data;
    ({ ingredients } = creationCriteriaTable(e, values));
    uptadeTags(e, ingredients);
  } else {
    const { value } = dataFilterSearch(e, values, imputSearch, btnIngredient);
    value !== undefined && (values = value);
  }
  while (sectionMedias.hasChildNodes()) {
    sectionMedias.removeChild(sectionMedias.firstChild);
  }

  for (let i = 0; i < values.length; i++) {
    renderMedia(values[i]);
  }
  numberOfRecipes();
}
const imputSearch = document.getElementById("site-search");
imputSearch.addEventListener("input", mediaIncrement);
const btnIngredient = document.getElementById("btn-ingredient-id");
btnIngredient.addEventListener("click", mediaIncrement);

export default mediaIncrement();
