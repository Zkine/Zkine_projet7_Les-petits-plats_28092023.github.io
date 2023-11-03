import { mediaIncrement } from "./index.js";

//Création d'un tableau "repiceSearch" des critères de recherches
export function creationCriteriaTable(data, ingredients, repiceSearch) {
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
  repiceSearch = [...repiceName, ...repiceDescription, ...ingredients];
  return { ingredients, repiceSearch };
}

//Fonction qui filtrer le contenu du tableau des critères de recherche - fonction creationCriteriaTable - selon les données saisies par l'utilisateur
//et crée un tableau : constante result.
export function characterControlUser(e, repiceSearch) {
  // const { repiceSearch } = creationCriteriaTable(data);
  const result = repiceSearch.filter(function (el) {
    return (
      JSON.stringify(el).toLowerCase().indexOf(e.target.value.toLowerCase()) !==
      -1
    );
  });
  // validationEnteredCharacters(e, imputSearch, result);
  return { result };
}

//Fonction qui indique à l'utilisateur si au moins trois lettres saisies correspondent aux critères de recherche
const formSearch = document.getElementById("form-search-id");
const spanSearch = document.getElementById("span-search-id");
const paragraphSearch = document.getElementById("paragraph-search-id");
export function validationEnteredCharacters(e, imputSearch, result) {
  const btnRemove = formSearch[1];
  if (result.length === 0) {
    const regex = new RegExp(/([^‘]*)(?=\’)/);
    if (e.target.value.length <= 20) {
      const characterInput = paragraphSearch
        .getAttribute("data-error")
        .replace(regex, e.target.value);
      paragraphSearch.setAttribute("data-error", characterInput);
      paragraphSearch.setAttribute("data-error-visible", "true");

      !spanSearch.classList.contains("span-search-active") &&
        spanSearch.classList.add("span-search-active");
      !btnRemove.classList.contains("btn-remove-delete") &&
        btnRemove.classList.add("btn-remove-delete");
      return {};
    }
  } else if (result.length !== 0 && imputSearch.value.length >= 3) {
    paragraphSearch.setAttribute("data-error-visible", "false");
    !btnRemove.classList.contains("btn-remove-delete") &&
      btnRemove.classList.add("btn-remove-delete");
    spanSearch.classList.contains("span-search-active") &&
      spanSearch.classList.remove("span-search-active");
    return { result };
  } else if (imputSearch.value.length <= 2) {
    paragraphSearch.setAttribute("data-error-visible", "false");
    btnRemove.classList.contains("btn-remove-delete") &&
      btnRemove.classList.remove("btn-remove-delete");
    spanSearch.classList.contains("span-search-active") &&
      spanSearch.classList.remove("span-search-active");
    return imputSearch.value.length <= 0 && mediaIncrement();
  }
}
// export function validationEnteredCharacters(e, imputSearch, result) {
//   const btnRemove = formSearch[1];
//   if (
//     (e.target.value.length <= 2 || result.length === 0) &&
//     imputSearch.value !== ""
//   ) {
//     paragraphSearch.setAttribute("data-error-visible", "true");
//     const regex = new RegExp(/([^‘]*)(?=\’)/);
//     if (e.target.value.length >= 3 || e.target.value.length <= 20) {
//       const characterInput = paragraphSearch
//         .getAttribute("data-error")
//         .replace(regex, e.target.value);
//       paragraphSearch.setAttribute("data-error", characterInput);

//       spanSearch.classList.contains("span-search-active") &&
//         spanSearch.classList.remove("span-search-active");
//     }
//     spanSearch.classList.remove("span-search-active");
//     btnRemove.classList.contains("btn-remove-delete") &&
//       btnRemove.classList.remove("btn-remove-delete");
//     return {};
//   } else if (e.target.value.length >= 3) {
//     paragraphSearch.setAttribute("data-error-visible", "false");

//     btnRemove.classList.add("btn-remove-delete");
//     spanSearch.classList.add("span-search-active");
//     return { result };
//   } else {
//     paragraphSearch.setAttribute("data-error-visible", "false");
//     btnRemove.classList.contains("btn-remove-delete") &&
//     imputSearch.value !== ""
//       ? btnRemove.classList.remove("btn-remove-delete")
//       : spanSearch.classList.contains("span-search-active") &&
//         spanSearch.classList.remove("span-search-active"),
//       btnRemove.classList.remove("btn-remove-delete");
//     return mediaIncrement();
//   }
// }
// fonction qui supprime les caractères dans la barre de recherche
function imputRemove() {
  formSearch.reset();
  btnRemove.classList.remove("btn-remove-delete");
  paragraphSearch.setAttribute("data-error-visible", "false");
  return mediaIncrement();
}
const btnRemove = document.getElementById("btn-remove-id");
btnRemove.addEventListener("click", imputRemove);
