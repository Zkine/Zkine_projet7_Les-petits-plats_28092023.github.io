import {
  creationCriteriaTable,
  validationCharacters,
  characterControlUser,
} from "./filtered_input.js";
let result;
let value;
let resultMainSearch;
let resultIngredients;

function mainSearch(data) {
  const valueSearch = data
    .map(function (recipe) {
      for (let val = 0; val < recipe.ingredients.length; val++) {
        for (let el = 0; el < result.length; el++) {
          if (
            // resultMainSearch !== undefined &&
            // resultMainSearch.length > 0 &&
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
  return { valueSearch };
}

function tagSearch(data) {
  let valueTag = [];
  for (let i = 0; i < data.length; i++) {
    const ingredient = data[i].ingredients.map((el) =>
      el.ingredient.toLowerCase()
    );
    const indexArray = resultIngredients.map((el) => {
      return ingredient.indexOf(el);
    });
    if (indexArray.indexOf(-1) === -1) valueTag.push(data[i]);
  }
  return { valueTag };
}
// Fonction qui recherche les recettes dans les données data selon le resultat renvoyé par la fonction characterControlUser et crée un tableau nommé values
export function dataFilterSearch(e, data) {
  if (
    e.target.getAttribute("name") === "main-search" &&
    e.target.value.length < 3
  ) {
    validationCharacters(e);
    return {};
  } else if (e.target.getAttribute("name") === "main-search") {
    const { repiceSearch } = creationCriteriaTable(e, data);
    const { resultControl } = characterControlUser(e, repiceSearch);
    ({ resultMainSearch } = validationCharacters(e, resultControl));
    if (resultMainSearch) {
      result = resultMainSearch;
      const { valueSearch } = mainSearch(data);
      value = valueSearch;
      return { value };
    }
    return {};
  } else if (e.target.nodeName === "P") {
    resultIngredients !== undefined && resultIngredients.length >= 1
      ? resultIngredients.push(e.target.textContent)
      : (resultIngredients = new Array(e.target.textContent));
    const { valueTag } = tagSearch(data);
    value = valueTag;
    return { value };
  } else if (
    e.target.nodeName === "BUTTON" &&
    e.target.getAttribute("class") === "remove-tag"
  ) {
    resultIngredients.splice(
      resultIngredients.indexOf(e.target.parentNode.textContent),
      1
    );
    const { valueTag } = tagSearch(data);
    value = valueTag;
    return { value };
  }
  // if (
  //   (imputSearch.value === "" && resultIngredients === undefined) ||
  //   (resultIngredients !== undefined && resultIngredients.length === 0)
  // ) {
  //   return {};
  // }
  // else if (
  //   imputSearch.value !== "" &&
  //   (resultIngredients === undefined ||
  //     (resultIngredients.length === 0 &&
  //       e.target.getAttribute("class") === "remove-tag"))
  // ) {
  //   result = resultMainSearch;
  // } else if (
  //   imputSearch.value === "" &&
  //   (resultIngredients === undefined || resultIngredients.length > 0)
  // ) {
  //   result = resultIngredients;
  // } else if (
  //   imputSearch.value !== "" &&
  //   (resultIngredients === undefined || resultIngredients.length > 0)
  // ) {
  //   result = resultMainSearch;
  // }
}
