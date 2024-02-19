import {
  creationCriteriaTable,
  validationCharacters,
  characterControlUser,
} from "./filtered_input.js";

const ingredientSelection = document.getElementById("tag-selection-id");

let value;
let resultSearch = [];
let resultIngredients = [];
let resultAppliance = [];
let resultUstensils = [];
let ingredient = false;
let appliance = false;
let ustensils = false;

function mainSearch(data, resultMainSearch) {
  const valueSearch = data
    .map(function (recipe) {
      for (let val = 0; val < recipe.ingredients.length; val++) {
        for (let el = 0; el < resultMainSearch.length; el++) {
          if (
            resultMainSearch.includes(recipe.name) ||
            resultMainSearch.includes(recipe.description) ||
            resultMainSearch[el].toLowerCase() ===
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

function tagSearch(data, title) {
  let valueTag = [];

  function search(tag, array, data) {
    const indexArray = array.map((el) => {
      return tag.indexOf(el);
    });
    if (indexArray.indexOf(-1) === -1) valueTag.push(data);
  }

  for (let i = 0; i < data.length; i++) {
    if (title === "Ingrédients" || ingredient === true) {
      const ingredient = data[i].ingredients.map((el) =>
        el.ingredient.toLowerCase()
      );
      search(ingredient, resultIngredients, data[i]);
    } else if (title === "Appareils" || appliance === true) {
      let applianceArray = [];
      applianceArray.push(data[i].appliance.toLowerCase());
      search(applianceArray, resultAppliance, data[i]);
    } else if (title === "Ustensiles" || ustensils === true) {
      const ustensils = data[i].ustensils.map((el) => el.toLowerCase());
      search(ustensils, resultUstensils, data[i]);
    }
  }
  ingredient = false;
  appliance = false;
  ustensils = false;
  return { valueTag };
}

function arrayTagRemove(e) {
  const ingredientsFind = resultIngredients.find(
    (el) => el === e.target.parentNode.textContent
  );

  const applianceFind = resultAppliance.find(
    (el) => el === e.target.parentNode.textContent
  );

  const ustensilsFind = resultUstensils.find(
    (el) => el === e.target.parentNode.textContent
  );
  if (e.target.getAttribute("class") === "remove-tag") {
    if (ingredientsFind) {
      ingredient = true;
      resultIngredients.splice(
        resultIngredients.indexOf(e.target.parentNode.textContent),
        1
      );
    } else if (applianceFind) {
      appliance = true;
      resultAppliance.splice(
        resultIngredients.indexOf(e.target.parentNode.textContent),
        1
      );
    } else if (ustensilsFind) {
      ustensils = true;
      resultUstensils.splice(
        resultIngredients.indexOf(e.target.parentNode.textContent),
        1
      );
    }
  } else {
    return resultIngredients.length > 0
      ? (ingredient = true)
      : resultAppliance.length > 0
      ? (appliance = true)
      : resultUstensils.length > 0 && (ustensils = true);
  }
}

// Fonction qui recherche les recettes dans les données data selon le resultat renvoyé par la fonction characterControlUser et crée un tableau nommé values
export function dataFilterSearch(e, data, imputSearch) {
  if (
    e === undefined ||
    (imputSearch.value === "" &&
      !ingredientSelection.hasChildNodes() &&
      e.target.nodeName === "BUTTON")
  ) {
    resultSearch = [];
    resultIngredients = [];
    resultAppliance = [];
    resultUstensils = [];
    value = data;
    return { value };
  } else if (
    e.target.getAttribute("name") === "main-search" &&
    e.target.value.length < 3
  ) {
    return {};
  } else if (e.target.getAttribute("name") === "main-search") {
    const { repiceSearch } =
      resultIngredients.length > 0 ||
      resultAppliance.length > 0 ||
      resultUstensils.length > 0
        ? creationCriteriaTable(e, value)
        : creationCriteriaTable(e, data);
    const { resultControl } = characterControlUser(e, repiceSearch);
    const { resultMainSearch } = validationCharacters(e, resultControl);
    if (resultMainSearch) {
      const { valueSearch } =
        resultIngredients.length > 0 ||
        resultAppliance.length > 0 ||
        resultUstensils.length > 0
          ? mainSearch(value, resultMainSearch)
          : mainSearch(data, resultMainSearch);
      resultSearch = valueSearch;
      value = valueSearch;
      return { value };
    }
    return {};
  } else if (e.target.nodeName === "P") {
    const divTitle = e.target.closest(".btn-tag");
    const title =
      divTitle && divTitle.getElementsByClassName("titre-btn")[0].textContent;
    if (title === "Ingrédients") {
      resultIngredients.push(e.target.textContent);
      const { valueTag } =
        resultSearch.length > 0
          ? tagSearch(resultSearch, title)
          : resultIngredients.length > 0 ||
            resultAppliance.length > 0 ||
            resultUstensils.length > 0
          ? tagSearch(value, title)
          : tagSearch(data, title);
      value = valueTag;
      return { value };
    } else if (title === "Appareils") {
      resultAppliance.push(e.target.textContent);
      const { valueTag } =
        resultSearch.length > 0
          ? tagSearch(resultSearch, title)
          : resultIngredients.length > 0 ||
            resultAppliance.length > 0 ||
            resultUstensils.length > 0
          ? tagSearch(value, title)
          : tagSearch(data, title);
      value = valueTag;
      return { value };
    } else if (title === "Ustensiles") {
      resultUstensils.push(e.target.textContent);
      const { valueTag } =
        resultSearch.length > 0
          ? tagSearch(resultSearch, title)
          : resultIngredients.length > 0 ||
            resultAppliance.length > 0 ||
            resultUstensils.length > 0
          ? tagSearch(value, title)
          : tagSearch(data, title);
      value = valueTag;
      return { value };
    }
  } else if (e.target.nodeName === "BUTTON") {
    if (e.target.getAttribute("class") === "remove-tag") {
      arrayTagRemove(e);
      const { valueTag } = tagSearch(resultSearch);
      value = valueTag;
      return { value };
    } else {
      if (imputSearch.value === "") {
        arrayTagRemove(e);
        const { valueTag } = tagSearch(data);
        value = valueTag;
        return { value };
      } else {
        const { repiceSearch } = creationCriteriaTable(e, data);
        const { resultControl } = characterControlUser(
          imputSearch,
          repiceSearch
        );
        const { resultMainSearch } = validationCharacters(
          imputSearch,
          resultControl
        );
        const { valueSearch } = mainSearch(data, resultMainSearch);
        resultSearch = valueSearch;
        value = valueSearch;
        return { value };
      }
    }
  } else {
    arrayTagRemove(e);
    const { valueTag } = tagSearch(data);
    value = valueTag;
    return { value };
  }
}
