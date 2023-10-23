import data from "../data/recipes.js";
import { renderMedia } from "./recipe.js";
import { numberOfRecipes } from "./recipe.js";
import { dataSearch } from "./filtered_input.js";

let result;
//  fonction qui recherche dans le tableau des critères de recherche "repiceSearch" si le
//  ou les caractères saisis par l'utilisateur correspondent puis retourne le résultat
const dataFilterSearch = (e, repiceSearch) => {
  if (e.target.value.length >= 3) {
    result = repiceSearch.filter(
      (el) =>
        JSON.stringify(el)
          .toLowerCase()
          .indexOf(e.target.value.toLowerCase()) !== -1
    );
    return result;
  }
};

//fonction qui indique à l'utilisateur si au moins trois lettres saisies correspondent aux critères de recherche
const formSearch = document.getElementById("form-search-id");
export const imputFilter = (e) => {
  const paragraphSearch = document.getElementById("paragraph-search-id");

  const repiceName = data.map((obj) => {
    const rObj = obj.name;
    return rObj;
  });

  const repiceDescription = data.map((obj) => {
    const rObj = obj.description;
    return rObj;
  });

  const repiceIngredients = data.map((obj) => {
    for (const o of obj.ingredients) {
      const rObj = { ...o };
      return rObj;
    }
  });

  const repiceSearch = [
    ...repiceName,
    ...repiceDescription,
    ...repiceIngredients,
  ];

  dataFilterSearch(e, repiceSearch);

  if (
    (e.target.value.length <= 2 || result.length === 0) &&
    imputSearch.value !== ""
  ) {
    const btnRemove = formSearch[1];
    paragraphSearch.setAttribute("data-error-visible", "true");
    const regex = new RegExp(/([^‘]*)(?=\’)/);
    if (e.target.value.length <= 5) {
      const result = paragraphSearch
        .getAttribute("data-error")
        .replace(regex, e.target.value);
      paragraphSearch.setAttribute("data-error", result);
    }
    return btnRemove.classList.add("btn-remove-delete");
  } else {
    paragraphSearch.setAttribute("data-error-visible", "false");
    return (
      btnRemove.classList.contains("btn-remove-delete") &&
      btnRemove.classList.remove("btn-remove-delete")
    );
  }
};
const imputSearch = document.getElementById("site-search");
imputSearch.addEventListener("input", imputFilter);

// fonction qui supprime les caractères dans la barre de recherche
const imputRemove = (e) => {
  formSearch.reset();
  imputFilter(e);
};

const btnRemove = document.getElementById("btn-remove-id");
btnRemove.addEventListener("click", imputRemove);

// Fonction qui supprime les recettes, puis fait appel à dataSearch pour afficher les recettes recherchées ou si la recherche ne contient aucun
// mot , la fonction mediaIncrement affichera toutes les recettes
const userSearch = () => {
  const articleMedia = document.querySelectorAll("#article-media-id");
  for (const a in articleMedia) {
    articleMedia[a].parentNode !== undefined &&
      articleMedia[a].parentNode.removeChild(articleMedia[a]);
  }

  if (
    result !== undefined &&
    imputSearch.value !== "" &&
    (imputSearch.value.length >= 3 || imputSearch.value.length < 1)
  ) {
    dataSearch(result, data);
  } else {
    return mediaIncrement();
  }
};
const btnSearch = document.getElementById("btn-search-id");
btnSearch.addEventListener("click", userSearch);

// Fonction qui fait appel au DATA des recettes puis la boucle permet d'incrémenter le DOM par défault ou par filtres
export const mediaIncrement = (values) => {
  if (values === undefined || values.length === 0) {
    values = data;
  }
  for (const value of values) {
    renderMedia(value);
    numberOfRecipes();
    values = [];
  }
};
export default mediaIncrement();
