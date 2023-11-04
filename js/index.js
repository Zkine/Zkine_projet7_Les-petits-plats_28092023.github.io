import data from "../data/recipes.js";
import { renderMedia, numberOfRecipes } from "./recipe.js";
import {
  validationEnteredCharacters,
  creationCriteriaTable,
  characterControlUser,
} from "./filtered_input.js";
import { searchManagement } from "./filtered_tag.js";

let result;
let repiceSearch;
let ingredients;
let values;

// Fonction qui recherche les recettes dans les données data selon le resultat renvoyé par la fonction characterControlUser et crée un tableau nommé values
export function dataFilterSearch(e) {
  if (imputSearch.value.length < 3) {
    validationEnteredCharacters(e, imputSearch, data);
  } else if (imputSearch.value.length >= 3) {
    ({ repiceSearch } = creationCriteriaTable(data, e));
    ({ result } = characterControlUser(e, repiceSearch));
    ({ result } = validationEnteredCharacters(e, imputSearch, result));
  }

  if (
    (result !== undefined && imputSearch.value.length >= 3) ||
    searchTag.value.length >= 3
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
const searchTag = document.getElementById("search-tag-id");
searchTag.addEventListener("input", dataFilterSearch);

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
  searchManagement(ingredients);
  return (values = []);
}
export default mediaIncrement();
