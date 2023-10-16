import data from "../data/recipes.js";
import { mediaIncrement } from "./index.js";
//Cette fonction indique à l'utilisateur si au moins trois lettres saisies correspondent aux critères de recherche
let values;
export const imputFilter = (e) => {
  const paragraphSearch = document.getElementById("paragraph-search-id");
  values = data.filter((el) => {
    if (el.name === e.target.value) {
      return el.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
    } else if (el.description === e.target.value) {
      return (
        el.description.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
        -1
      );
    } else {
      for (const i of el.ingredients)
        if (i.ingredient === e.target.value) {
          return (
            i.ingredient.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
            -1
          );
        }
    }
  });
  if (e.target.value.length >= 3 && values.length === 0) {
    paragraphSearch.setAttribute("data-error-visible", "true");
    const result = paragraphSearch
      .getAttribute("data-error")
      .replace("XXX", e.target.value);
    paragraphSearch.setAttribute("data-error", result);
  } else {
    paragraphSearch.setAttribute("data-error-visible", "false");
  }
};
const imputSearch = document.getElementById("site-search");
imputSearch.addEventListener("input", (e) => imputFilter(e));

const userSearch = () => {
  const articleMedia = document.querySelectorAll("#article-media-id");
  for (const a in articleMedia) {
    articleMedia[a].parentNode !== undefined &&
      articleMedia[a].parentNode.removeChild(articleMedia[a]);
  }
  mediaIncrement(values);
};
const btnSearch = document.getElementById("btn-search-id");
btnSearch.addEventListener("click", userSearch);
