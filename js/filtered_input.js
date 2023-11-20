import { mediaIncrement } from "./index.js";

//Création d'un tableau "repiceSearch" des critères de recherches
export function creationCriteriaTable(e, data, ingredients, repiceSearch) {
  if (e !== undefined && e.target.getAttribute("name") === `main-search`) {
    const repiceName = data.map(function (obj) {
      const rObj = obj.name;
      return rObj;
    });

    const repiceDescription = data.map(function (obj) {
      const rObj = obj.description;
      return rObj;
    });

    const repiceIngredients = data
      .map(function (objs) {
        return objs.ingredients.map(function (obj) {
          const rObj = obj.ingredient.toLowerCase();
          return rObj;
        });
      })
      .flat();

    ingredients = [...new Set(repiceIngredients)];
    repiceSearch = [
      ...repiceName,
      ...repiceDescription,
      ...new Set(ingredients),
    ];
    return { ingredients, repiceSearch };
  } else {
    const repiceIngredients = data
      .map(function (objs) {
        return objs.ingredients.map(function (obj) {
          const rObj = obj.ingredient.toLowerCase();
          return rObj;
        });
      })
      .flat();

    ingredients = [...new Set(repiceIngredients)];
    return { ingredients };
  }
}

//Fonction qui filtrer le contenu du tableau des critères de recherche - fonction creationCriteriaTable - selon les données saisies par l'utilisateur
//et crée un tableau : constante result.
export function characterControlUser(e, repiceSearch) {
  repiceSearch !== undefined &&
    e.target.value === undefined &&
    (e.target.value = e.target.textContent);
  const resultControl = repiceSearch.filter(function (el) {
    return (
      JSON.stringify(el).toLowerCase().indexOf(e.target.value.toLowerCase()) !==
      -1
    );
  });
  return { resultControl };
}

//Fonction qui indique à l'utilisateur si au moins trois lettres saisies correspondent aux critères de recherche
const formSearch = document.getElementById("form-search-id");
const spanSearch = document.getElementById("span-search-id");
const paragraphSearch = document.getElementById("paragraph-search-id");
export function validationCharacters(e, resultMainSearch, imputSearch) {
  const btnRemove = formSearch[1];
  if (resultMainSearch !== undefined && resultMainSearch.length === 0) {
    const regex = new RegExp(/([^‘]*)(?=\’)/);
    const characterInput = paragraphSearch
      .getAttribute("data-error")
      .replace(regex, e.target.value);
    e.target.value.length <= 20 &&
      paragraphSearch.setAttribute("data-error", characterInput);
    paragraphSearch.setAttribute("data-error-visible", "true");
    spanSearch.classList.add("span-search-active");
    btnRemove.classList.add("btn-remove-delete");
    return {};
  } else if (
    resultMainSearch !== undefined &&
    resultMainSearch.length !== 0 &&
    imputSearch.value.length >= 3
  ) {
    paragraphSearch.setAttribute("data-error-visible", "false");
    !btnRemove.classList.contains("btn-remove-delete") &&
      btnRemove.classList.add("btn-remove-delete");
    spanSearch.classList.contains("span-search-active") &&
      spanSearch.classList.remove("span-search-active");
    return { resultMainSearch };
  } else {
    paragraphSearch.setAttribute("data-error-visible", "false");
    btnRemove.classList.remove("btn-remove-delete");
    spanSearch.classList.remove("span-search-active");
    return imputRemove(e, imputSearch);
  }
}
const btnRemove = document.getElementById("btn-remove-id");
btnRemove.addEventListener("click", validationCharacters);

// fonction qui supprime les caractères dans la barre de recherche
export function imputRemove(e, imputSearch) {
  return (imputSearch === undefined || imputSearch.value.length === 0) &&
    e.target.getAttribute("class") !== "remove-tag"
    ? (formSearch.reset(), mediaIncrement(e))
    : mediaIncrement(e);
}
