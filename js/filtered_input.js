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
  if (e !== undefined && e.target.getAttribute("name") === `main-search`) {
    const repiceName = data.map(function (obj) {
      const rObj = obj.name;
      return rObj;
    });

    const repiceDescription = data.map(function (obj) {
      const rObj = obj.description;
      return rObj;
    });

    const repiceIngredients = data
      .map(function (objs) {
        return objs.ingredients.map(function (obj) {
          const rObj = obj.ingredient.toLowerCase();
          return rObj;
        });
      })
      .flat();

    ingredients = [...new Set(repiceIngredients)];
    repiceSearch = [
      ...repiceName,
      ...repiceDescription,
      ...new Set(ingredients),
    ];
    return { ingredients, repiceSearch };
  } else {
    const titreIngredient =
      e !== undefined && e.target.closest("#btn-ingredient-id");

    const titreAppliance =
      e !== undefined && e.target.closest("#btn-appliance-id");

    const titreUtensil = e !== undefined && e.target.closest("#btn-utensil-id");

    const repiceIngredients =
      (titreIngredient !== null ||
        e === undefined ||
        e.target.nodeName === "BUTTON") &&
      data
        .map(function (objs) {
          return objs.ingredients.map(function (obj) {
            const rObj = obj.ingredient.toLowerCase();
            return rObj;
          });
        })
        .flat();
    repiceIngredients && (ingredients = [...new Set(repiceIngredients)]);

    const repiceAppliance =
      (titreAppliance !== null ||
        e === undefined ||
        e.target.nodeName === "BUTTON") &&
      data.map(function (obj) {
        const rObj = obj.appliance.toLowerCase();
        return rObj;
      });
    repiceAppliance && (appliance = [...new Set(repiceAppliance)]);

    const repiceUstensils =
      (titreUtensil !== null ||
        e === undefined ||
        e.target.nodeName === "BUTTON") &&
      data
        .map(function (objs) {
          return objs.ustensils.map(function (obj) {
            const rObj = obj.toLowerCase();
            return rObj;
          });
        })
        .flat();
    repiceUstensils && (ustensils = [...new Set(repiceUstensils)]);

    return { ingredients, appliance, ustensils };
  }
}

//Fonction qui filtrer le contenu du tableau des critères de recherche - fonction creationCriteriaTable - selon les données saisies par l'utilisateur
//et crée un tableau : constante result.
export function characterControlUser(e, repiceSearch) {
  repiceSearch !== undefined &&
    e.target.value === undefined &&
    (e.target.value = e.target.textContent);
  const resultControl = repiceSearch.filter(function (el) {
    return (
      JSON.stringify(el).toLowerCase().indexOf(e.target.value.toLowerCase()) !==
      -1
    );
  });
  return { resultControl };
}

//Fonction qui indique à l'utilisateur si au moins trois lettres saisies correspondent aux critères de recherche
const formSearch = document.getElementById("form-search-id");
const spanSearch = document.getElementById("span-search-id");
const paragraphSearch = document.getElementById("paragraph-search-id");
export function validationCharacters(e, resultMainSearch) {
  const btnRemove = formSearch[1];
  if (resultMainSearch !== undefined && resultMainSearch.length === 0) {
    const regex = new RegExp(/([^‘]*)(?=\’)/);
    const characterInput = paragraphSearch
      .getAttribute("data-error")
      .replace(regex, e.target.value);
    e.target.value.length <= 20 &&
      paragraphSearch.setAttribute("data-error", characterInput);
    paragraphSearch.setAttribute("data-error-visible", "true");
    spanSearch.classList.add("span-search-active");
    btnRemove.classList.add("btn-remove-delete");
    return {};
  } else if (
    resultMainSearch !== undefined &&
    resultMainSearch.length !== 0 &&
    e.target.value.length >= 3
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
      e.target.value.length <= 2 &&
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
    : e.type === "mouseleave" || e.target.id === "btn-remove-tag-id"
    ? (imputTag.reset(), mediaIncrement(e))
    : mediaIncrement(e);
}
