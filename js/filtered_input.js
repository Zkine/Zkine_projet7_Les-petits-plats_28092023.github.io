import { mediaIncrement, dataFilterSearch, deleteItems } from "./index.js";

let data;
//Création d'un tableau des critères de recherches
export const creationCriteriaTable = (datas, ingredients, repiceSearch) => {
  data = datas;
  const repiceName = datas.map((obj) => {
    const rObj = obj.name;
    return rObj;
  });

  const repiceDescription = datas.map((obj) => {
    const rObj = obj.description;
    return rObj;
  });

  const repiceIngredients = datas
    .map((objs) =>
      objs.ingredients.map((obj) => {
        const rObj = obj.ingredient.toLowerCase();
        return rObj;
      })
    )
    .flat();
  ingredients = [...new Set(repiceIngredients)];
  repiceSearch = [...repiceName, ...repiceDescription, ...ingredients];
  return { ingredients, repiceSearch };
};

// fonction qui supprime les caractères dans la barre de recherche
const imputRemove = (e) => {
  formSearch.reset();
  return imputFilter(e);
};
const btnRemove = document.getElementById("btn-remove-id");
btnRemove.addEventListener("click", imputRemove);

//fonction qui indique à l'utilisateur si au moins trois lettres saisies correspondent aux critères de recherche
const formSearch = document.getElementById("form-search-id");
const paragraphSearch = document.getElementById("paragraph-search-id");
const spanSearch = document.getElementById("span-search-id");

export const imputFilter = (e, result, imputSearch) => {
  const btnRemove = formSearch[1];
  if (
    (e.target.value.length <= 2 || result.length === 0) &&
    imputSearch.value !== ""
  ) {
    paragraphSearch.setAttribute("data-error-visible", "true");
    const regex = new RegExp(/([^‘]*)(?=\’)/);
    if (e.target.value.length <= 5) {
      const characterInput = paragraphSearch
        .getAttribute("data-error")
        .replace(regex, e.target.value);
      paragraphSearch.setAttribute("data-error", characterInput);
      spanSearch.classList.contains("span-search-active") &&
        spanSearch.classList.remove("span-search-active");
    }
    spanSearch.classList.remove("span-search-active");
    return btnRemove.classList.add("btn-remove-delete");
  } else if (e.target.value.length >= 3) {
    paragraphSearch.setAttribute("data-error-visible", "false");
    btnRemove.classList.contains("btn-remove-delete") &&
      btnRemove.classList.remove("btn-remove-delete");
    spanSearch.classList.add("span-search-active");
    deleteItems();
    return dataSearch(result, data);
  } else {
    paragraphSearch.setAttribute("data-error-visible", "false");
    btnRemove.classList.contains("btn-remove-delete") &&
    imputSearch.value !== ""
      ? btnRemove.classList.remove("btn-remove-delete")
      : spanSearch.classList.contains("span-search-active") &&
        spanSearch.classList.remove("span-search-active"),
      btnRemove.classList.remove("btn-remove-delete");
    deleteItems();
    return mediaIncrement();
  }
};

//Fonction qui filtre les recettes en fonction du ou des caractères saisis par l'utilisateur puis
// fait appel à la fonction mediaIncrement qui affichera les recettes recherchées

export const dataSearch = (result) => {
  const values = data
    .map((recipe) => {
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
    .filter((y) => y !== undefined);
  return mediaIncrement(values);
};
