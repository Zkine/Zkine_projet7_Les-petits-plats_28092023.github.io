import { mediaIncrement } from "./index.js";

//Création d'un tableau "repiceSearch" des critères de recherches
export function creationCriteriaTable(
  e,
  data,
  ingredients,
  repiceSearch,
  appliance,
  ustensils
) {
  function name() {
    const repiceName = data.map(function (obj) {
      const rObj = obj.name;
      return rObj;
    });
    return repiceName;
  }

  function description() {
    const repiceDescription = data.map(function (obj) {
      const rObj = obj.description;
      return rObj;
    });
    return repiceDescription;
  }

  function ingredients() {
    const repiceIngredients = data
      .map(function (objs) {
        return objs.ingredients.map(function (obj) {
          const rObj = obj.ingredient.toLowerCase();
          return rObj;
        });
      })
      .flat();
    return repiceIngredients;
  }

  function appliance() {
    const repiceAppliance = data.map(function (obj) {
      const rObj = obj.appliance.toLowerCase();
      return rObj;
    });
    return repiceAppliance;
  }

  function ustensils() {
    const repiceUstensils = data
      .map(function (objs) {
        return objs.ustensils.map(function (obj) {
          const rObj = obj.toLowerCase();
          return rObj;
        });
      })
      .flat();
    return repiceUstensils;
  }
  let repiceIngredients;
  let repiceAppliance;
  let repiceUstensils;
  if (
    (e !== undefined && e.target.getAttribute("name") === `main-search`) ||
    (e !== undefined && e.target.nodeName === "BUTTON")
  ) {
    const Name = name();
    const Description = description();
    const Ingredients = ingredients();
    repiceIngredients = [...new Set(Ingredients)];
    repiceAppliance = appliance();
    repiceAppliance = [...new Set(repiceAppliance)];
    repiceUstensils = ustensils();
    repiceUstensils = [...new Set(repiceUstensils)];
    repiceSearch = [...Name, ...Description, ...Ingredients];
    return {
      repiceSearch,
      repiceIngredients,
      repiceAppliance,
      repiceUstensils,
    };
  } else {
    repiceIngredients = ingredients();
    repiceIngredients = [...new Set(repiceIngredients)];
    repiceAppliance = appliance();
    repiceAppliance = [...new Set(repiceAppliance)];
    repiceUstensils = ustensils();
    repiceUstensils = [...new Set(repiceUstensils)];
    return { repiceIngredients, repiceAppliance, repiceUstensils };
  }
}

//Fonction qui filtrer le contenu du tableau des critères de recherche - fonction creationCriteriaTable - selon les données saisies par l'utilisateur
//et crée un tableau : constante result.
export function characterControlUser(e, repiceSearch) {
  const inputText = e.value
    ? e.value
    : e.target.textContent !== ""
    ? e.target.textContent
    : e.target.value !== "" && e.target.value;

  const resultControl = repiceSearch.filter(function (el) {
    return (
      JSON.stringify(el).toLowerCase().indexOf(inputText.toLowerCase()) !== -1
    );
  });
  return { resultControl };
}

//Fonction qui indique à l'utilisateur si au moins trois lettres saisies correspondent aux critères de recherche
const formSearch = document.getElementById("form-search-id");
const spanSearch = document.getElementById("span-search-id");
const paragraphSearch = document.getElementById("paragraph-search-id");
export function validationCharacters(e, resultMainSearch) {
  const inputText = e.value ? e.value : e.target.value !== "" && e.target.value;
  const btnRemove = formSearch[1];
  if (resultMainSearch !== undefined && resultMainSearch.length === 0) {
    const regex = new RegExp(/([^‘]*)(?=\’)/);
    const characterInput = paragraphSearch
      .getAttribute("data-error")
      .replace(regex, inputText);
    inputText.length <= 20 &&
      paragraphSearch.setAttribute("data-error", characterInput);
    paragraphSearch.setAttribute("data-error-visible", "true");
    spanSearch.classList.add("span-search-active");
    btnRemove.classList.add("btn-remove-delete");
    return {};
  } else if (
    (resultMainSearch !== undefined &&
      resultMainSearch.length !== 0 &&
      e.target !== undefined &&
      inputText.length >= 3) ||
    (resultMainSearch !== undefined &&
      resultMainSearch.length !== 0 &&
      e.nodeName === "INPUT")
  ) {
    paragraphSearch.setAttribute("data-error-visible", "false");
    !btnRemove.classList.contains("btn-remove-delete") &&
      btnRemove.classList.add("btn-remove-delete");
    spanSearch.classList.contains("span-search-active") &&
      spanSearch.classList.remove("span-search-active");
    return { resultMainSearch };
  } else {
    paragraphSearch.setAttribute("data-error-visible", "false");
    btnRemove.classList.remove("btn-remove-delete");
    spanSearch.classList.remove("span-search-active");
    if (
      e.code !== "Backspace" &&
      e.code !== "Delete" &&
      inputText.length <= 2 &&
      e.target.attributes[0].textContent !== "button"
    ) {
      return {};
    }
    return imputRemove(e);
  }
}
const btnRemove = document.getElementById("btn-remove-id");
btnRemove.addEventListener("click", validationCharacters);

const input = document.getElementById("site-search");

// Ecoute sur l'imput pincipal qui permet de sélectionner les caractères que l'utilisateur met en surbrillance en maintenant le clique droit
// let selectedText;
// input.addEventListener("mouseup", (e) => {
//   e.stopPropagation();
//   selectedText = document.activeElement.value.substring(
//     document.activeElement.selectionStart,
//     document.activeElement.selectionEnd
//   );
// });
// input.addEventListener("keydown", (e) => {
//   e.stopPropagation();
//   if (
//     ((e.code === "Backspace" || e.code === "Delete") &&
//       selectedText.length === input.value.length) ||
//     ((e.code === "Backspace" || e.code === "Delete") &&
//       input.value.length === 1)
//   ) {
//     input.value = "";
//     return validationCharacters(e);
//   }
//   return {};
// });

// fonction qui supprime les caractères dans la barre de recherche
export function imputRemove(e, imputTag) {
  return e.target.id === "btn-remove-id"
    ? (formSearch.reset(), mediaIncrement(e))
    : e.type === "mouseleave" ||
      e.target.id === "btn-remove-ingredient-id" ||
      e.target.id === "btn-remove-appliance-id" ||
      e.target.id === "btn-remove-ustensil-id"
    ? (imputTag.reset(), mediaIncrement(e))
    : mediaIncrement(e);
}
