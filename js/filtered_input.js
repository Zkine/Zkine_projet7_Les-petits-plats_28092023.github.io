import { mediaIncrement } from "./index.js";

//Création d'un tableau "repiceSearch" des critères de recherches
export const creationCriteriaTable = (datas, ingredients, repiceSearch) => {
  const repiceName = datas.map((obj) => {
    const rObj = obj.name;
    return rObj;
  });

  const repiceDescription = datas.map((obj) => {
    const rObj = obj.description;
    return rObj;
  });

  const repiceIngredients = datas
    .map((objs) =>
      objs.ingredients.map((obj) => {
        const rObj = obj.ingredient.toLowerCase();
        return rObj;
      })
    )
    .flat();

  ingredients = [...new Set(repiceIngredients)];
  repiceSearch = [...repiceName, ...repiceDescription, ...ingredients];
  return { ingredients, repiceSearch };
};

export const characterControlUser = (e, imputSearch, data) => {
  const { repiceSearch } = creationCriteriaTable(data);
  const result = repiceSearch.filter(
    (el) =>
      JSON.stringify(el).toLowerCase().indexOf(e.target.value.toLowerCase()) !==
      -1
  );

  validationEnteredCharacters(e, imputSearch, result);
  return { result };
};

//fonction qui indique à l'utilisateur si au moins trois lettres saisies correspondent aux critères de recherche
const formSearch = document.getElementById("form-search-id");
const spanSearch = document.getElementById("span-search-id");
const paragraphSearch = document.getElementById("paragraph-search-id");
export const validationEnteredCharacters = (e, imputSearch, result) => {
  // const { repiceSearch } = creationCriteriaTable(data);
  // const result = repiceSearch.filter(
  //   (el) =>
  //     JSON.stringify(el).toLowerCase().indexOf(e.target.value.toLowerCase()) !==
  //     -1
  // );
  const btnRemove = formSearch[1];
  if (
    (e.target.value.length <= 2 || result.length === 0) &&
    imputSearch.value !== ""
  ) {
    paragraphSearch.setAttribute("data-error-visible", "true");
    const regex = new RegExp(/([^‘]*)(?=\’)/);
    if (e.target.value.length <= 5 || e.target.value.length <= 20) {
      const characterInput = paragraphSearch
        .getAttribute("data-error")
        .replace(regex, e.target.value);
      paragraphSearch.setAttribute("data-error", characterInput);

      spanSearch.classList.contains("span-search-active") &&
        spanSearch.classList.remove("span-search-active");
    }
    spanSearch.classList.remove("span-search-active");
    btnRemove.classList.add("btn-remove-delete");
    return { result };
  } else if (e.target.value.length >= 3) {
    paragraphSearch.setAttribute("data-error-visible", "false");
    btnRemove.classList.contains("btn-remove-delete") &&
      btnRemove.classList.remove("btn-remove-delete");
    spanSearch.classList.add("span-search-active");
    return { result };
  } else {
    paragraphSearch.setAttribute("data-error-visible", "false");
    btnRemove.classList.contains("btn-remove-delete") &&
    imputSearch.value !== ""
      ? btnRemove.classList.remove("btn-remove-delete")
      : spanSearch.classList.contains("span-search-active") &&
        spanSearch.classList.remove("span-search-active"),
      btnRemove.classList.remove("btn-remove-delete");
    return mediaIncrement();
  }
};
// fonction qui supprime les caractères dans la barre de recherche
const imputRemove = () => {
  formSearch.reset();
  btnRemove.classList.remove("btn-remove-delete");
  paragraphSearch.setAttribute("data-error-visible", "false");
  return mediaIncrement();
};
const btnRemove = document.getElementById("btn-remove-id");
btnRemove.addEventListener("click", imputRemove);
