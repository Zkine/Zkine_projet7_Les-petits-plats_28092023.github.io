import data from "../data/recipes.js";
import { renderMedia } from "./recipe.js";
import { numberOfRecipes } from "./recipe.js";

// let values;

// export const dataSearch = (result) => {
//   console.log(result);
//   for (const n in result) {
//     for (const values of data) {
//       if (values.name === result[n].textContent) {
//         // arrayFilter(value);
//         mediaIncrement(values);
//       } else if (values.description === result[n].textContent) {
//         arrayFilter(values);
//       } else {
//         for (const element of values.ingredients) {
//           if (element.ingredient === result[n].textContent) {
//             const value = element.ingredient;
//             arrayFilter(values);
//           }
//         }
//       }
//     }
//   }
// };
// Fonction qui fait appel au DATA des recettes puis la boucle permet d'incrémenter le DOM par défault ou par filtres
export const mediaIncrement = (values) => {
  if (values === undefined || values.length === 0) {
    values = data;
  }
  for (const value of values) {
    renderMedia(value);
    numberOfRecipes();
  }
};
export default mediaIncrement();
