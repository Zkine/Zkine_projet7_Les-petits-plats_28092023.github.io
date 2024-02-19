import data from "../data/recipes.js";
import { renderMedia, numberOfRecipes } from "./recipe.js";
import { dataFilterSearch } from "./repiceSearch.js";
import { creationCriteriaTable } from "./filtered_input.js";
import { uptadeTags } from "./filtered_tag.js";
// Fonction qui fait appel au DATA des recettes puis la boucle permet d'incrémenter le DOM par défault ou par filtres

const sectionMedias = document.getElementById("section-media-id");
export function mediaIncrement(e) {
  if (
    (e !== undefined && e.target.className === "btn-tag") ||
    (e !== undefined && e.target.className === "tag-search")
  )
    return tag();
  const { value } = dataFilterSearch(e, data, imputSearch);
  if (value) {
    const { repiceIngredients, repiceAppliance, repiceUstensils } =
      creationCriteriaTable(e, value);
    uptadeTags(e, repiceIngredients, repiceAppliance, repiceUstensils);
  } else {
    return {};
  }
  while (sectionMedias.hasChildNodes()) {
    sectionMedias.removeChild(sectionMedias.firstChild);
  }
  for (let i = 0; i < value.length; i++) {
    renderMedia(value[i]);
  }
  numberOfRecipes();
  tag();
}
const imputSearch = document.getElementById("site-search");
imputSearch.addEventListener("input", mediaIncrement);

function tag() {
  const itemIngredient = document.getElementsByClassName("li-tag");
  const itemIngredients = Promise.resolve(itemIngredient);
  itemIngredients.then((value) => {
    for (let el = 0; el < value.length; el++) {
      value[el].addEventListener("click", mediaIncrement);
    }
  });
}
export default mediaIncrement();
