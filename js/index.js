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
  }
};

const deleteItems = () => {
  const sectionMedias = document.getElementById("section-media-id");
  while (sectionMedias.hasChildNodes()) {
    sectionMedias.removeChild(sectionMedias.firstChild);
  }
};

//fonction qui indique à l'utilisateur si au moins trois lettres saisies correspondent aux critères de recherche
const formSearch = document.getElementById("form-search-id");
export const imputFilter = (e) => {
  const paragraphSearch = document.getElementById("paragraph-search-id");
  const spanSearch = document.getElementById("span-search-id");

  const repiceName = data.map((obj) => {
    const rObj = obj.name;
    return rObj;
  });

  const repiceDescription = data.map((obj) => {
    const rObj = obj.description;
    return rObj;
  });

  const repiceIngredients = data
    .map((objs) =>
      objs.ingredients.map((obj) => {
        const rObj = obj.ingredient;
        return rObj;
      })
    )
    .flat();

  repiceIngredients.shift();

  const repiceSearch = [
    ...repiceName,
    ...repiceDescription,
    ...new Set(repiceIngredients),
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
const imputSearch = document.getElementById("site-search");
imputSearch.addEventListener("input", imputFilter);

// fonction qui supprime les caractères dans la barre de recherche
const imputRemove = (e) => {
  formSearch.reset();
  return imputFilter(e);
};
const btnRemove = document.getElementById("btn-remove-id");
btnRemove.addEventListener("click", imputRemove);

// Fonction qui fait appel au DATA des recettes puis la boucle permet d'incrémenter le DOM par défault ou par filtres
export const mediaIncrement = (values) => {
  if (values === undefined || values.length === 0) {
    values = data;
  }
  for (let i = 0; i < values.length; i++) {
    renderMedia(values[i]);
  }
  numberOfRecipes();
  return (values = []);
};
export default mediaIncrement();
