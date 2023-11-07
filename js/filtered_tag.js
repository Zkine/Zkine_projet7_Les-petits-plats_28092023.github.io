import { characterControlUser } from "./filtered_input.js";
import { itemSelection } from "./index.js";

const btnRemoveTag = document.getElementById("btn-remove-tag-id");
const navTag = document.getElementById("nav-tag-id");
const userSelectionIngredient = document.getElementById(
  "tag-selection-ingrédients"
);
let ingredients;
let result;
//Initialisation des critères de recherche
export function arrayInitialization(dataIngredients) {
  ingredients = dataIngredients;
  tagRender(dataIngredients);
}
// Création du DOM des div tag - ingrédients, les ustensiles ou les appareils.
function tagRender(dataIngredients) {
  const ulTag = document.querySelector(".ul-tag");
  if (!navTag.hasChildNodes()) {
    const ulTag = document.createElement("ul");
    ulTag.className = "ul-tag";
    navTag.appendChild(ulTag);

    for (let i = 0; i < dataIngredients.length; i++) {
      const liTag = document.createElement("li");
      liTag.className = "li-tag";
      ulTag.appendChild(liTag);

      const pTag = document.createElement("p");
      pTag.textContent = `${dataIngredients[i]}`;
      liTag.appendChild(pTag);

      const btnRemoveTag = document.createElement("button");
      btnRemoveTag.className = "remove-tag";
      liTag.appendChild(btnRemoveTag);
    }
  } else if (navTag.hasChildNodes() && dataIngredients.length !== 0) {
    const liTag = document.querySelector(".li-tag");
    while (ulTag.hasChildNodes()) {
      ulTag.removeChild(ulTag.firstChild);
    }
    for (let i = 0; i < dataIngredients.length; i++) {
      let liTagClone = liTag.cloneNode(true);
      liTagClone.children[0].textContent = `${dataIngredients[i]}`;
      ulTag.appendChild(liTagClone);
    }
    return itemSelection(ulTag);
  }
}

//Recherche des critères de recherche dans la barre de recherche des tags
function searchManagement(e) {
  btnRemoveTag.classList.add("btn-remove-tag-active");

  return (
    this.value.length >= 3 &&
    (({ result } = characterControlUser(e, ingredients)), tagRender(result))
  );
}
const searchTag = document.getElementById("search-tag-id");
searchTag.addEventListener("input", searchManagement);

let userSelection;
// fonction qui gère extension des boutons
function tagData() {
  if (
    this !== undefined &&
    this.classList.contains("btn-tag") &&
    !this.classList.contains("btn-tag-active")
  ) {
    this.classList.add("btn-tag-active");
  }
  return (
    userSelectionIngredient.hasChildNodes() &&
    userSelection.classList.add("tag-selection-remove")
  );
}
const btnIngredient = document.getElementById("btn-ingredient-id");
btnIngredient.addEventListener("click", tagData);

// Supprime les caractères de input
function removeSearchTag() {
  btnRemoveTag.classList.contains("btn-remove-tag-active") &&
    btnRemoveTag.classList.remove("btn-remove-tag-active");
  const formTag = document.getElementById("form-tag-id");
  return formTag.reset();
}
btnRemoveTag.addEventListener("click", removeSearchTag);

// Selection d'un ingredient
// function itemSelection(ulTags) {
//   const itemIngredient = document.querySelectorAll(".li-tag");
//   setTimeout(() => {
//     searchTag.value.length >= 3 &&
//       itemIngredient.forEach((el) => {
//         el.classList.add("li-tag-click");
//         el.addEventListener("click", function () {
//           if (!this.classList.contains("li-tag-active")) {
//             this.classList.add("li-tag-active");
//             ulTags.insertBefore(el, ulTags.firstChild);
//           }
//           const clonedItemSelection = el.cloneNode(true);
//           userSelection = clonedItemSelection;
//           userSelectionIngredient.appendChild(clonedItemSelection);
//         });
//       });
//   }, 0);
// }
// itemSelection();

// Le bouton se réinitialise lorsque le curseur sort du champ du bouton
function tagLeave() {
  if (this.classList.contains("btn-tag-active")) {
    this.classList.remove("btn-tag-active");
    userSelectionIngredient.hasChildNodes() &&
      userSelection.classList.remove("tag-selection-remove");
    return removeSearchTag();
  }
}
btnIngredient.addEventListener("mouseleave", tagLeave);
