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
    (e.target.value === "" && !ingredientSelection.hasChildNodes())
  ) {
    values = data;
    const { ingredients } = creationCriteriaTable(e, values);
    uptadeTags(e, ingredients);
    e !== undefined &&
      e.target.getAttribute("class") === "remove-tag" &&
      (dataFilterSearch(e, values), tag());
  } else {
    if (e.target.getAttribute("class") !== "remove-tag" && values) {
      const { value } = dataFilterSearch(e, values);
      tagSelection(e);
      values = value;
      tag();
      const { ingredients } = creationCriteriaTable(e, values);
      uptadeTags(e, ingredients);
    } else {
      const { value } = dataFilterSearch(e, data);
      values = value;
      tag();
      const { ingredients } = creationCriteriaTable(e, values);
      uptadeTags(e, ingredients);
    }
    // e.target.getAttribute("class") !== "remove-tag" && values
    //   ? (({ value } = dataFilterSearch(e, values)), tag())
    //   : (({ value } = dataFilterSearch(e, data)), tag());
    // e.target.nodeName === "P" && (tagSelection(e), tag());
    // value !== undefined && (values = value);
    // if (e.target.getAttribute("class") !== "remove-tag") {
    //   const { ingredients } = creationCriteriaTable(e, values);
    //   uptadeTags(e, ingredients);
    // }
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
