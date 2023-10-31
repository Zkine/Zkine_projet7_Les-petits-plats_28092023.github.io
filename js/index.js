import data from "../data/recipes.js";
import { renderMedia, numberOfRecipes } from "./recipe.js";
import { creationCriteriaTable, imputFilter } from "./filtered_input.js";

//  fonction qui recherche dans le tableau des critères de recherche "repiceSearch" si le
//  ou les caractères saisis par l'utilisateur correspondent puis retourne le résultat
export const dataFilterSearch = (e, result) => {
  if (e.target.value.length >= 3) {
    const { repiceSearch } = creationCriteriaTable(data);
    result = repiceSearch.filter(
      (el) =>
        JSON.stringify(el)
          .toLowerCase()
          .indexOf(e.target.value.toLowerCase()) !== -1
    );
  }
  imputFilter(e, result);
};

const imputSearch = document.getElementById("site-search");
imputSearch.addEventListener("input", dataFilterSearch);
// Suppression des recettes
export const deleteItems = () => {
  const sectionMedias = document.getElementById("section-media-id");
  while (sectionMedias.hasChildNodes()) {
    sectionMedias.removeChild(sectionMedias.firstChild);
  }
};

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
