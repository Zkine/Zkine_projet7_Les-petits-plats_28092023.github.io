import data from "../data/recipes.js";
import { renderMedia, numberOfRecipes } from "./recipe.js";
import { dataFilterSearch } from "./repiceSearch.js";
import { arrayInitialization, itemSelectionClone } from "./filtered_tag.js";
import { creationCriteriaTable } from "./filtered_input.js";

// Fonction qui fait appel au DATA des recettes puis la boucle permet d'incrémenter le DOM par défault ou par filtres

const sectionMedias = document.getElementById("section-media-id");
let values;

export function itemSelection(ulTags) {
  setTimeout(() => {
    const itemIngredient = document.querySelectorAll(".li-tag");
    itemIngredient.forEach((el) => {
      el.classList.add("li-tag-click");
      el.addEventListener("click", function (e) {
        if (!this.classList.contains("li-tag-active")) {
          this.classList.add("li-tag-active");
          ulTags.insertBefore(el, ulTags.firstChild);
        }
        mediaIncrement(e);
        const clonedItemSelection = el.cloneNode(true);
        itemSelectionClone(clonedItemSelection);
      });
    });
  }, 0);
}
itemSelection();

export function mediaIncrement(e) {
  if (e === undefined || e.target.getAttribute("id") === "btn-remove-id") {
    values = data;
  } else {
    const { value } = dataFilterSearch(e, values, imputSearch);
    value !== undefined && (values = value);
  }
  while (sectionMedias.hasChildNodes()) {
    sectionMedias.removeChild(sectionMedias.firstChild);
  }

  for (let i = 0; i < values.length; i++) {
    renderMedia(values[i]);
  }
  numberOfRecipes();
  const { ingredients } = creationCriteriaTable(e, values);
  arrayInitialization(ingredients);
}
const imputSearch = document.getElementById("site-search");
imputSearch.addEventListener("input", mediaIncrement);
export default mediaIncrement();
