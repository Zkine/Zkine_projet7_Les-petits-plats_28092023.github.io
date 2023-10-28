import { mediaIncrement } from "./index.js";

//Fonction qui filtre les recettes en fonction du ou des caractères saisis par l'utilisateur puis
// fait appel à la fonction mediaIncrement qui affichera les recettes recherchées

export const dataSearch = (result, data) => {
  let values = [];
  for (let repice = 0; repice < data.length; repice++) {
    if (
      result.includes(data[repice].name) ||
      result.includes(data[repice].description)
    ) {
      values.push(data[repice]);
    } else {
      for (
        let element = 0;
        element < data[repice].ingredients.length;
        element++
      ) {
        for (let n = 0; n < result.length; n++) {
          if (
            result[n] !== undefined &&
            result[n].toLowerCase() ===
              data[repice].ingredients[element].ingredient.toLowerCase()
          ) {
            values.push(data[repice]);
          }
        }
      }
    }
  }
  return mediaIncrement(values);
};
