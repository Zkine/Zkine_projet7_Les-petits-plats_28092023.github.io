import data from "../data/recipes.js";
import { renderMedia, numberOfRecipes } from "./recipe.js";
import { characterControlUser } from "./filtered_input.js";

export const dataFilterSearch = (e) => {
  if (imputSearch.value.length < 3) {
    return characterControlUser(e, imputSearch, data);
  }
  const { result } = characterControlUser(e, imputSearch, data);
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
  return values.length !== 0 && mediaIncrement(values);
};
const imputSearch = document.getElementById("site-search");
imputSearch.addEventListener("input", dataFilterSearch);

// Fonction qui fait appel au DATA des recettes puis la boucle permet d'incrémenter le DOM par défault ou par filtres
const sectionMedias = document.getElementById("section-media-id");
export const mediaIncrement = (values) => {
  while (sectionMedias.hasChildNodes()) {
    sectionMedias.removeChild(sectionMedias.firstChild);
  }
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
