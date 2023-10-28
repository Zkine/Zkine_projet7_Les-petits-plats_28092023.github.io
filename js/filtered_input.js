import { mediaIncrement } from "./index.js";

//Fonction qui filtre les recettes en fonction du ou des caractères saisis par l'utilisateur puis
// fait appel à la fonction mediaIncrement qui affichera les recettes recherchées
export const dataSearch = (result, data) => {
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
