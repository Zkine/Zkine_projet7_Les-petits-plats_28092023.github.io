import { creationCriteriaTable } from "./filtered_input.js";
import {
  validationCharacters,
  characterControlUser,
} from "./filtered_input.js";

let result;
let repiceSearch;
let value;
// Fonction qui recherche les recettes dans les données data selon le resultat renvoyé par la fonction characterControlUser et crée un tableau nommé values
export function dataFilterSearch(e, data, imputSearch) {
  if (
    e.target.getAttribute("name") === "main-search" &&
    e.target.value.length < 3
  ) {
    validationCharacters(e, data, imputSearch);
    return {};
  } else if (
    (e.target.value !== undefined && e.target.value.length >= 3) ||
    e.target.textContent.length >= 3
  ) {
    e.target.getAttribute("name") === "main-search"
      ? (({ repiceSearch } = creationCriteriaTable(e, data)),
        ({ result } = characterControlUser(e, repiceSearch)),
        ({ result } = validationCharacters(e, result, imputSearch)))
      : (result = [e.target.textContent]);
    if (result === undefined) {
      return {};
    }
  }
  value = data
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
  return { value };
}
