import { mediaIncrement } from "./index.js";

//Fonction qui filtre les recettes en fonction du ou des caractères saisis par l'utilisateur puis
// fait appel à la fonction mediaIncrement qui affichera les recettes recherchées
export const dataSearch = (result, data) => {
  const values = data.filter((val) => {
    for (const element of val.ingredients) {
      for (const n in result) {
        if (
          result.includes(val.name) ||
          result.includes(val.description) ||
          (result[n].ingredient !== undefined &&
            result[n].ingredient.includes(element.ingredient))
        ) {
          return val;
        }
      }
    }
  });
  return mediaIncrement(values);
};
// export const imputFilter = (e) => {
//   const paragraphSearch = document.getElementById("paragraph-search-id");

//   const repiceName = data.map((obj) => {
//     const rObj = obj.name;
//     return rObj;
//   });

//   const repiceDescription = data.map((obj) => {
//     const rObj = obj.description;
//     return rObj;
//   });

//   const repiceIngredients = data.map((obj) => {
//     for (const o of obj.ingredients) {
//       const rObj = { ...o };
//       return rObj;
//     }
//   });

//   const repiceSearch = [
//     ...repiceName,
//     ...repiceDescription,
//     ...repiceIngredients,
//   ];

//   if (e.target.value.length >= 3) {
//     result = repiceSearch.filter(
//       (el) =>
//         JSON.stringify(el)
//           .toLowerCase()
//           .indexOf(e.target.value.toLowerCase()) !== -1
//     );
//   }

//   if (
//     (e.target.value.length <= 3 || result.length === 0) &&
//     imputSearch.value !== "" &&
//     result.length <= 0
//   ) {
//     paragraphSearch.setAttribute("data-error-visible", "true");
//     const regex = new RegExp(/([^‘]*)(?=\’)/);

//     const result = paragraphSearch
//       .getAttribute("data-error")
//       .replace(regex, e.target.value);

//     paragraphSearch.setAttribute("data-error", result);
//   } else {
//     paragraphSearch.setAttribute("data-error-visible", "false");
//   }
// };
// const imputSearch = document.getElementById("site-search");
// imputSearch.addEventListener("input", (e) => imputFilter(e));
