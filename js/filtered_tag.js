import { characterControlUser, imputRemove } from "./filtered_input.js";

const btnRemoveTag = document.getElementById("btn-remove-tag-id");
const navTag = document.getElementById("nav-tag-id");
const userSelectionIngredient = document.getElementById(
  "tag-selection-ingrédients"
);
const searchTag = document.getElementById("search-tag-id");

//Initialisation des critères de recherche.
let ingredient;
let newUlTag;

export function ShearchTags(recipe, result, value) {
  const ingredient = recipe.ingredients.map((el) =>
    el.ingredient.toLowerCase()
  );
  value = result
    .map(function (e) {
      if (ingredient.includes(e) === true) {
        return recipe;
      }
    })
    .every(function (e) {
      e !== undefined;
    });

  return { value };
}

//Met à jour la liste des tags lors du lancement de l'application ainsi qu'à la recherche de l'utilisateur .
export function uptadeTags(e, data) {
  if (
    e !== undefined &&
    e.target.getAttribute("name") === "tag-search-ingredient"
  ) {
    const { resultControl } = characterControlUser(e, ingredient);
    return tagRender(e, resultControl);
  } else {
    ingredient = data;
    return tagRender(e, ingredient);
  }
}

// Fonction qui met à jour la liste des tags non sélectionnés lorsqu'on supprime un tag.
let liTag = [];
function filterArray(dataIngredients, liTag) {
  const value = dataIngredients.filter(
    (el) => !liTag.some((item) => item === el)
  );
  return { value };
}

// Fonction qui supprime les tags
function removeTag(e) {
  const btnRemoveTags = document.querySelectorAll(".li-tag-active>.remove-tag");
  if (btnRemoveTags.length > 0) {
    for (let r = 0; r < btnRemoveTags.length; r++) {
      btnRemoveTags[r].addEventListener(
        "click",
        function (e) {
          const sectionTags = btnRemoveTags[r].closest("#section-tag-id");
          if (sectionTags !== null) {
            const liTags = sectionTags.getElementsByClassName("li-tag-active");
            for (let i = 0; i < liTags.length; i++) {
              while (
                liTags[i] !== undefined &&
                btnRemoveTags[r].parentNode.textContent ===
                  liTags[i].textContent
              ) {
                liTags[i].remove();
              }
              liTag.splice(
                liTag.indexOf(btnRemoveTags[r].parentNode.textContent),
                1
              );
            }
            return tagRender(e, ingredient);
          }
        },
        { once: true }
      );
    }
  }
  return e !== undefined && imputRemove(e);
}
let liTagClone;
// Création du DOM des div tag - ingrédients, les ustensiles ou les appareils.
function tagRender(e, dataIngredients) {
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
    return (
      e !== undefined &&
      e.target.nodeName === "BUTTON" &&
      e.target.getAttribute("class") === "remove-tag" &&
      removeTag(e)
    );
  }
}

let userSelection;
let btnIngredient;
// fonction qui gère extension des tags
export function tagData(e, ingredient) {
  btnIngredient = ingredient;
  if (
    e !== undefined &&
    e.target.classList.contains("btn-tag") &&
    !e.target.classList.contains("btn-tag-active")
  ) {
    e.target.classList.add("btn-tag-active");
  }

  tagSelection();
  removeTag();
  return leaveTag();
}

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
function tagSelection() {
  const itemIngredient = document.getElementsByClassName("li-tag");
  for (let el = 0; el < itemIngredient.length; el++) {
    itemIngredient[el].addEventListener(
      "click",
      function (e) {
        if (
          itemIngredient[el] !== undefined &&
          !itemIngredient[el].classList.contains("li-tag-active") &&
          e.target.nodeName === "P"
        ) {
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
          return tagRender(e, ingredient);
        }
      },
      { once: true }
    );
  }
}

// Supprime les caractères de input
function removeSearchTag(e) {
  const formTag = document.getElementById("form-tag-id");
  btnRemoveTag.classList.contains("btn-remove-tag-active") &&
    btnRemoveTag.classList.remove("btn-remove-tag-active");
  tagRender(e, ingredient);
  return formTag.reset();
}
btnRemoveTag.addEventListener("click", removeSearchTag, { once: true });

// La div se réinitialise lorsque le curseur sort du champ des tags
function leaveTag() {
  btnIngredient !== undefined &&
    btnIngredient.addEventListener("mouseleave", function () {
      if (this.classList.contains("btn-tag-active")) {
        this.classList.remove("btn-tag-active");
        return removeSearchTag();
      }
    });
}
