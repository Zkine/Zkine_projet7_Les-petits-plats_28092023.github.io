import { characterControlUser, imputRemove } from "./filtered_input.js";

const btnRemoveTag = document.getElementById("btn-remove-tag-id");
const navTag = document.getElementById("nav-tag-id");
const userSelectionIngredient = document.getElementById(
  "tag-selection-ingrédients"
);
const searchTag = document.getElementById("search-tag-id");

//Initialisation des critères de recherche.
let ingredient;

// Fonction qui met à jour la liste des tags non sélectionnés lorsqu'on supprime un tag.
function filterArray(dataIngredients, liTag) {
  const value = dataIngredients.filter(
    (el) => !liTag.some((item) => item === el)
  );
  return { value };
}

let liTag = [];
// Fonction qui supprime les tags.
function removeTag(e) {
  if (e) {
    const sectionTags = e.target.closest("#section-tag-id");
    if (sectionTags !== null) {
      const liTags = sectionTags.getElementsByClassName("li-tag-active");
      for (let i = 0; i < liTags.length; i++) {
        while (
          liTags[i] !== undefined &&
          e.target.parentNode.textContent === liTags[i].textContent
        ) {
          liTags[i].remove();
        }
        liTag.splice(liTag.indexOf(e.target.parentNode.textContent), 1);
      }
      return btnRemovetag(), tagRender(e, ingredient);
    }
  }
  return {};
}

function btnRemovetag() {
  setTimeout(() => {
    const btnRemoveTags = document.querySelectorAll(
      ".li-tag-active>.remove-tag"
    );
    for (let r = 0; r < btnRemoveTags.length; r++) {
      btnRemoveTags[r].addEventListener("click", removeTag), { once: true };
    }
  }, 0);
}
btnRemovetag();

let liTagClone;
let newUlTag;

//Met à jour la liste des tags.
const tagUl = navTag.getElementsByClassName("ul-tag");
export function uptadeTags(e, data) {
  e !== undefined && e.stopPropagation();
  if (
    e !== undefined &&
    e.target.getAttribute("name") === "tag-search-ingredient"
  ) {
    const { resultControl } = characterControlUser(e, ingredient);
    return tagRender(e, resultControl);
  } else if (e === undefined || tagUl[0].children.length !== data.length) {
    ingredient = data;
    tagRender(e, ingredient);
  } else {
    return {};
  }
}

// Création du DOM des div tag - ingrédients, les ustensiles ou les appareils.
function tagRender(e, dataIngredients) {
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

      const btnRemoveTags = document.createElement("button");
      btnRemoveTags.className = "remove-tag";
      liTag.appendChild(btnRemoveTags);
    }

    newUlTag = tagUl[0];
    liTagClone = newUlTag.lastChild.cloneNode(true);
  } else if (navTag.hasChildNodes()) {
    const liTags = document.getElementsByClassName("li-tag");
    for (let e = liTags.length - 1; e >= 0; e--) {
      if (!liTags[e].classList.contains("li-tag-active")) {
        newUlTag.removeChild(liTags[e]);
      } else if (
        liTags[e].classList.contains("li-tag-active") &&
        liTag.indexOf(liTags[e].textContent) === -1
      ) {
        liTag.push(liTags[e].textContent);
      }
    }
    if (liTag.length > 0) {
      const { value } = filterArray(dataIngredients, liTag);
      for (let i = 0; i < value.length; i++) {
        const liTagClones = liTagClone.cloneNode(true);
        liTagClones.children[0].textContent = `${value[i]}`;
        newUlTag.appendChild(liTagClones);
      }
    } else {
      for (let i = 0; i < dataIngredients.length; i++) {
        const liTagClones = liTagClone.cloneNode(true);
        liTagClones.children[0].textContent = `${dataIngredients[i]}`;
        newUlTag.appendChild(liTagClones);
      }
    }
    if (
      e !== undefined &&
      e.target.nodeName === "BUTTON" &&
      e.target.getAttribute("class") === "remove-tag"
    ) {
      return removeTag(e);
    }
    return {};
  }
}

// fonction qui gère extension des tags
export function tagData(e) {
  if (
    e !== undefined &&
    e.target.classList.contains("btn-tag") &&
    !e.target.classList.contains("btn-tag-active")
  ) {
    e.target.classList.add("btn-tag-active");
  }
  removeTag();
  return leaveTag(btnIngredient);
}
const btnIngredient = document.getElementById("btn-ingredient-id");
btnIngredient.addEventListener("click", tagData);

//Recherche des critères de recherche dans la barre de recherche des tags
function searchManagement(e) {
  if (this.value.length !== 0) {
    btnRemoveTag.classList.add("btn-remove-tag-active");
  } else {
    btnRemoveTag.classList.remove("btn-remove-tag-active");
  }
  uptadeTags(e, ingredient);
  return tagSelection();
}
searchTag.addEventListener("input", searchManagement);

// Selection d'un tag
export function tagSelection(e) {
  const liTag = e.target.closest(".li-tag");
  if (!liTag.classList.contains("li-tag-active")) {
    const liTagsActive = document.querySelectorAll(".ul-tag .li-tag-active");
    liTag.classList.add("li-tag-active");
    const userSelection = liTag.cloneNode(true);
    if (liTagsActive.length === 0) {
      newUlTag.insertBefore(liTag, newUlTag.firstChild);
    } else {
      for (let e = liTagsActive.length - 1; e >= 0; e--) {
        newUlTag.insertBefore(liTag, liTagsActive[e].nextSibling);
        break;
      }
    }
    userSelectionIngredient.appendChild(userSelection);
    return btnRemovetag(), tagRender(e, ingredient);
  }
}

// Supprime les caractères de input
function removeSearchTag() {
  const formTag = document.getElementById("form-tag-id");
  btnRemoveTag.classList.contains("btn-remove-tag-active") &&
    btnRemoveTag.classList.remove("btn-remove-tag-active");
  // tagRender(e, ingredient);
  return formTag.reset();
}
btnRemoveTag.addEventListener("click", removeSearchTag, { once: true });

// La div se réinitialise lorsque le curseur sort du champ des tags
function leaveTag() {
  btnIngredient.addEventListener("mouseleave", function () {
    if (this.classList.contains("btn-tag-active")) {
      this.classList.remove("btn-tag-active");
      return removeSearchTag();
    }
  });
}
