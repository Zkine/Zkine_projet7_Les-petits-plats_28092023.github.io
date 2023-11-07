import data from "../data/recipes.js";
import { renderMedia, numberOfRecipes } from "./recipe.js";
import {
  validationCharacters,
  creationCriteriaTable,
  characterControlUser,
} from "./filtered_input.js";
import { arrayInitialization } from "./filtered_tag.js";

let result;
let repiceSearch;
let ingredients;
let values;
let userSelection;

// Fonction qui recherche les recettes dans les données data selon le resultat renvoyé par la fonction characterControlUser et crée un tableau nommé values
export function dataFilterSearch(e) {
  if (
    e.target.getAttribute("name") === "main-search" &&
    imputSearch.value.length < 3
  ) {
    validationCharacters(e, imputSearch, data);
  } else if (
    (e.target.value !== undefined && e.target.value.length >= 3) ||
    e.target.textContent.length >= 3
  ) {
    e.target.getAttribute("name") === "main-search"
      ? (({ repiceSearch } = creationCriteriaTable(data, e)),
        ({ result } = characterControlUser(e, repiceSearch)),
        ({ result } = validationCharacters(e, imputSearch, result)))
      : result === e.target.textContent;
  }

  if (
    (result !== undefined && e.target.value.length >= 3) ||
    e.target.textContent.length >= 3
  ) {
    values = data
      .map(function (recipe) {
        for (let val = 0; val < recipe.ingredients.length; val++) {
          for (let el = 0; el < result.length; el++) {
            if (
              result.includes(recipe.name) ||
              result.includes(recipe.description) ||
              result[el].toLowerCase() ===
                recipe.ingredients[val].ingredient.toLowerCase()
            ) {
              return recipe;
            }
          }
        }
      })
      .filter(function (element) {
        return element !== undefined;
      });
    return mediaIncrement(values);
  }
}
const imputSearch = document.getElementById("site-search");
imputSearch.addEventListener("input", dataFilterSearch);
export function itemSelection(ulTags) {
  const itemIngredient = document.querySelectorAll(".li-tag");
  setTimeout(() => {
    // searchTag.value.length >= 3 &&
    itemIngredient.forEach((el) => {
      el.classList.add("li-tag-click");
      el.addEventListener("click", function (e) {
        if (!this.classList.contains("li-tag-active")) {
          this.classList.add("li-tag-active");
          ulTags.insertBefore(el, ulTags.firstChild);
        }
        dataFilterSearch(e);
        const clonedItemSelection = el.cloneNode(true);
        userSelection = clonedItemSelection;
        // userSelectionIngredient.appendChild(clonedItemSelection);
      });
    });
  }, 0);
}
itemSelection();
// Fonction qui fait appel au DATA des recettes puis la boucle permet d'incrémenter le DOM par défault ou par filtres
const sectionMedias = document.getElementById("section-media-id");
export function mediaIncrement(values) {
  while (sectionMedias.hasChildNodes()) {
    sectionMedias.removeChild(sectionMedias.firstChild);
  }
  if (values === undefined) {
    values = data;
  }
  for (let i = 0; i < values.length; i++) {
    renderMedia(values[i]);
  }
  numberOfRecipes();
  ({ ingredients } = creationCriteriaTable(values));
  arrayInitialization(ingredients);
  return (values = []);
}
export default mediaIncrement();
