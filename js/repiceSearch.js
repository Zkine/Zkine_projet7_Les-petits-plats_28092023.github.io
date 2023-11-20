import {
  creationCriteriaTable,
  validationCharacters,
  characterControlUser,
} from "./filtered_input.js";
import { ShearchTags } from "./filtered_tag.js";
let result;
let value;
let resultMainSearch;
let resultIngredients;

// Fonction qui recherche les recettes dans les données data selon le resultat renvoyé par la fonction characterControlUser et crée un tableau nommé values
export function dataFilterSearch(e, data, imputSearch) {
  if (
    e.target.getAttribute("name") === "main-search" &&
    e.target.value.length < 3
  ) {
    validationCharacters(e, data, imputSearch);
    return {};
  } else if (e.target.getAttribute("name") === "main-search") {
    const { repiceSearch } = creationCriteriaTable(e, data);
    const { resultControl } = characterControlUser(e, repiceSearch);
    ({ resultMainSearch } = validationCharacters(
      e,
      resultControl,
      imputSearch
    ));
  } else if (e.target.nodeName === "P") {
    resultIngredients !== undefined && resultIngredients.length >= 1
      ? resultIngredients.push(e.target.textContent)
      : (resultIngredients = new Array(e.target.textContent));
  } else if (
    e.target.nodeName === "BUTTON" &&
    e.target.getAttribute("class") !== "remove-tag"
  ) {
    resultIngredients.splice(
      resultIngredients.indexOf(e.target.parentNode.textContent),
      1
    );
  }
  if (
    (imputSearch.value === "" && resultIngredients === undefined) ||
    (resultIngredients !== undefined && resultIngredients.length === 0)
  ) {
    return {};
  } else if (
    imputSearch.value !== "" &&
    (resultIngredients === undefined ||
      (resultIngredients.length === 0 &&
        e.target.getAttribute("class") === "remove-tag"))
  ) {
    result = resultMainSearch;
  } else if (
    imputSearch.value === "" &&
    (resultIngredients === undefined || resultIngredients.length > 0)
  ) {
    result = resultIngredients;
  } else if (
    imputSearch.value !== "" &&
    (resultIngredients === undefined || resultIngredients.length > 0)
  ) {
    result = resultMainSearch;
  }

  value = data
    .map(function (recipe) {
      for (let val = 0; val < recipe.ingredients.length; val++) {
        for (let el = 0; el < result.length; el++) {
          if (
            (resultMainSearch !== undefined &&
              resultMainSearch.length > 0 &&
              result.includes(recipe.name)) ||
            result.includes(recipe.description) ||
            result[el].toLowerCase() ===
              recipe.ingredients[val].ingredient.toLowerCase() ||
            (resultIngredients !== undefined &&
              (value = ShearchTags(recipe, result)) &&
              value === true)
          ) {
            // console.log(ShearchTags(recipe, result));
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
