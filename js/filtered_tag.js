import { characterControlUser } from "./filtered_input.js";

const btnRemoveTag = document.getElementById("btn-remove-tag-id");
const navTag = document.getElementById("nav-tag-id");
const userSelectionIngredient = document.getElementById(
  "tag-selection-ingrédients"
);

const searchTag = document.getElementById("search-tag-id");
//Initialisation des critères de recherche
let ingredient;
let newUlTag;

// Mise à jour des ingrédients selon les caractères saisis de l'utilisateur
export function uptadeTags(e, data) {
  if (e.target !== undefined && e.target.nodeName === "DIV") {
    ingredient = data;
    tagRender(ingredient);
  } else {
    const { result } = characterControlUser(e, ingredient);
    tagRender(result);
  }
}

// Fonction qui met à jour la liste des tags non sélectionnés
function filterArray(dataIngredients, liTag) {
  const value = dataIngredients.filter(
    (el) => !liTag.some((item) => item === el)
  );
  return { value };
}

// Supprime les tags
function removeTag(btnRemoveTags) {
  for (let el = 0; el < btnRemoveTags.length; el++) {
    btnRemoveTags[el].addEventListener("click", function (e) {
      btnRemoveTags[el].remove();
      console.log(e);
    });
  }
}

let liTagClone;
// Création du DOM des div tag - ingrédients, les ustensiles ou les appareils.
function tagRender(dataIngredients) {
  const tagUl = navTag.getElementsByClassName("ul-tag");
  newUlTag = tagUl[0];
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
    liTagClone = tagUl[0].lastChild.cloneNode(true);
  } else if (navTag.hasChildNodes()) {
    const liTags = document.getElementsByClassName("li-tag");

    let liTag = [];
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

    const btnRemoveTags = document.querySelectorAll(
      ".li-tag-active>.remove-tag"
    );
    return btnRemoveTags.length >= 1 && removeTag(btnRemoveTags);
  }
}

let userSelection;
let btnIngredient;
// fonction qui gère extension des boutons
export function tagData(e, ingredient) {
  btnIngredient = ingredient;
  if (
    e !== undefined &&
    e.target.classList.contains("btn-tag") &&
    !e.target.classList.contains("btn-tag-active")
  ) {
    e.target.classList.add("btn-tag-active");
  }

  leaveTag();
  searchManagement();
  return { searchTag };
}

//Recherche des critères de recherche dans la barre de recherche des tags
function searchManagement(e) {
  const itemIngredient = document.getElementsByClassName("li-tag");
  if (searchTag.value.length >= 3) {
    uptadeTags(e, ingredient);
    btnRemoveTag.classList.add("btn-remove-tag-active");
    for (let el = 0; el < itemIngredient.length; el++) {
      itemIngredient[el].classList.add("li-tag-click");
      itemIngredient[el].addEventListener("click", function () {
        const liTagsActive = document.querySelectorAll(
          ".ul-tag .li-tag-active"
        );
        itemIngredient[el].classList.add("li-tag-active");
        userSelection = itemIngredient[el].cloneNode(true);
        if (liTagsActive.length === 0) {
          newUlTag.insertBefore(itemIngredient[el], newUlTag.firstChild);
        } else {
          for (let e = liTagsActive.length - 1; e >= 0; e--) {
            newUlTag.insertBefore(
              itemIngredient[el],
              liTagsActive[e].nextSibling
            );
            break;
          }
        }
        userSelectionIngredient.appendChild(userSelection);
      });
    }
  }
}
searchTag.addEventListener("input", searchManagement);

// Supprime les caractères de input
function removeSearchTag() {
  const formTag = document.getElementById("form-tag-id");
  btnRemoveTag.classList.contains("btn-remove-tag-active") &&
    btnRemoveTag.classList.remove("btn-remove-tag-active");
  tagRender(ingredient);
  return formTag.reset();
}
btnRemoveTag.addEventListener("click", removeSearchTag);

// Le bouton se réinitialise lorsque le curseur sort du champ du bouton
function leaveTag() {
  btnIngredient !== undefined &&
    btnIngredient.addEventListener("mouseleave", function () {
      if (this.classList.contains("btn-tag-active")) {
        this.classList.remove("btn-tag-active");
        return removeSearchTag();
      }
    });
}
