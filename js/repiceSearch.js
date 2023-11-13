import { creationCriteriaTable } from "./filtered_input.js";
import {
  validationCharacters,
  characterControlUser,
} from "./filtered_input.js";
import { tagData, uptadeTags } from "./filtered_tag.js";
let result;
let searchTag;
let repiceSearch;
let ingredients;
let value;
// Fonction qui recherche les recettes dans les données data selon le resultat renvoyé par la fonction characterControlUser et crée un tableau nommé values
export function dataFilterSearch(e, data, imputSearch, btnIngredient) {
  if (
    e.target.getAttribute("name") === "main-search" &&
    e.target.value.length < 3
  ) {
    validationCharacters(e, data, imputSearch);
    return {};
  } else if (
    e.target.getAttribute("name") === "main-search" &&
    e.target.value.length >= 3
  ) {
    ({ repiceSearch } = creationCriteriaTable(e, data));
    ({ result } = characterControlUser(e, repiceSearch));
    ({ result } = validationCharacters(e, result, imputSearch));
  } else if (
    e.target.className === "btn-tag" ||
    (e.target.value !== undefined && e.target.value.length < 3)
  ) {
    ({ searchTag } = tagData(e, btnIngredient));
    ({ ingredients } = creationCriteriaTable(e, data));
    uptadeTags(e, ingredients);
  } else if (e.target.nodeName === "P" && searchTag.value.length >= 3) {
    result !== undefined && result.length >= 1
      ? result.push(e.target.textContent)
      : (result = new Array(e.target.textContent));
  }

  if (result === undefined) {
    return {};
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
