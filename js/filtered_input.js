import { mediaIncrement } from "./index.js";

//Fonction qui filtre les recettes en fonction du ou des caractères saisis par l'utilisateur puis
// fait appel à la fonction mediaIncrement qui affichera les recettes recherchées

export const dataSearch = (result, data) => {
  let values = [];
  for (const repice of Object.values(data)) {
    for (const element of repice.ingredients) {
      for (const n in result) {
        if (result.includes(repice.name)) {
          values.push(repice);
        } else if (result.includes(repice.description)) {
          values.push(repice);
        } else if (
          result[n].ingredient !== undefined &&
          result[n].ingredient.includes(element.ingredient)
        ) {
          values.push(repice);
        }
      }
    }
  }
  return mediaIncrement(values);
};

// export const dataSearch = (result, data) => {
//   const values = data.filter((val) => {
//     for (const element of val.ingredients) {
//       for (const n in result) {
//         if (
//           result.includes(val.name) ||
//           result.includes(val.description) ||
//           (result[n].ingredient !== undefined &&
//             result[n].ingredient.includes(element.ingredient))
//         ) {
//           return val;
//         }
//       }
//     }
//   });
//   return mediaIncrement(values);
// };

// export const dataSearch = (result, data) => {
//   for (const n in result) {
//     const values = data
//       .filter(
//         (o) =>
//           result.includes(o.name) ||
//           result.includes(o.description) ||
//           (result[n].ingredient !== undefined &&
//             result[n].ingredient.includes(element.ingredient))
//       )
//       .map((obj) => obj);
//     return mediaIncrement(values);
//   }
// };
