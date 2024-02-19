import { characterControlUser, imputRemove } from "./filtered_input.js";

const btnRemoveIngredient = document.getElementById("btn-remove-ingredient-id");
const btnRemoveAppliance = document.getElementById("btn-remove-appliance-id");
const btnRemoveUstensil = document.getElementById("btn-remove-ustensil-id");
const navIngredient = document.getElementById("nav-ingredients-id");
const navAppliance = document.getElementById("nav-appliance-id");
const navUstensil = document.getElementById("nav-ustensil-id");
const userDivSelection = document.getElementById("tag-selection-id");
const searchIngredient = document.getElementById("search-ingredient-id");
const searchAppliance = document.getElementById("search-appliance-id");
const searchUstensil = document.getElementById("search-ustensil-id");

//Initialisation des critères de recherche.
let ingredient;
let appliance;
let ustensil;

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
      return btnRemovetag(), tagRender(e, ingredient, appliance, ustensil);
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

let liTagCloneIngredients;
let newUlIngredients;
let liTagCloneAppliance;
let newUlAppliance;
let liTagCloneUstensil;
let newUlUstensil;
//Met à jour la liste des tags.
const tagUlIngredient = navIngredient.getElementsByClassName("ul-tag");
const tagUlAppliance = navAppliance.getElementsByClassName("ul-tag");
const tagUlUstensil = navUstensil.getElementsByClassName("ul-tag");
export function uptadeTags(e, ingredientsData, applianceData, ustensilData) {
  e !== undefined && e.stopPropagation();
  if (
    (e !== undefined &&
      e.target.getAttribute("name") === "tag-search-ingredient") ||
    (e !== undefined &&
      e.target.getAttribute("name") === "tag-search-appliance") ||
    (e !== undefined && e.target.getAttribute("name") === "tag-search-ustensil")
  ) {
    if (ingredientsData) {
      const { resultControl } = characterControlUser(e, ingredientsData);
      return tagRender(e, resultControl);
    } else if (applianceData) {
      const { resultControl } = characterControlUser(e, applianceData);
      return tagRender(e, ingredientsData, resultControl);
    } else if (ustensilData) {
      const { resultControl } = characterControlUser(e, ustensilData);
      return tagRender(e, ingredientsData, applianceData, resultControl);
    }
  } else {
    ingredient = ingredientsData;
    appliance = applianceData;
    ustensil = ustensilData;
    if (e === undefined || e.target.nodeName === "P") {
      e === undefined ||
        (e.target.getAttribute("id") !== "btn-remove-id" && tagSelection(e));
    }
    return tagRender(e, ingredient, appliance, ustensil);
  }
  // else {
  //   return {};
  // }
}
function incrementaTag(newUl, data, liTagClone) {
  const liTags = newUl.getElementsByClassName("li-tag");

  for (let e = liTags.length - 1; e >= 0; e--) {
    if (!liTags[e].classList.contains("li-tag-active")) {
      newUl.removeChild(liTags[e]);
    } else if (
      liTags[e].classList.contains("li-tag-active") &&
      liTag.indexOf(liTags[e].textContent) === -1
    ) {
      liTag.push(liTags[e].textContent);
    }
  }
  if (liTag.length > 0) {
    const { value } = filterArray(data, liTag);
    for (let i = 0; i < value.length; i++) {
      const liTagClones = liTagClone.cloneNode(true);
      liTagClones.children[0].textContent = `${value[i]}`;
      newUl.appendChild(liTagClones);
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      const liTagClones = liTagClone.cloneNode(true);
      liTagClones.children[0].textContent = `${data[i]}`;
      newUl.appendChild(liTagClones);
    }
  }
  // liTag = [];
}
// Création du DOM des div tag - ingrédients, les ustensiles ou les appareils.
function tagRender(e, dataIngredients, dataAppliance, dataUstensil) {
  if (!navIngredient.hasChildNodes()) {
    const ulTag = document.createElement("ul");
    ulTag.className = "ul-tag";
    navIngredient.appendChild(ulTag);

    const ulTagAppliance = document.createElement("ul");
    ulTagAppliance.className = "ul-tag";
    navAppliance.appendChild(ulTagAppliance);

    const ulTagUstensil = document.createElement("ul");
    ulTagUstensil.className = "ul-tag";
    navUstensil.appendChild(ulTagUstensil);

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

    for (let f = 0; f < dataAppliance.length; f++) {
      const liTagAppliance = document.createElement("li");
      liTagAppliance.className = "li-tag";
      ulTagAppliance.appendChild(liTagAppliance);

      const pTagAppliance = document.createElement("p");
      pTagAppliance.textContent = `${dataAppliance[f]}`;
      liTagAppliance.appendChild(pTagAppliance);

      const btnRemoveTagAppliance = document.createElement("button");
      btnRemoveTagAppliance.className = "remove-tag";
      liTagAppliance.appendChild(btnRemoveTagAppliance);
    }

    for (let u = 0; u < dataUstensil.length; u++) {
      const liTagUstensil = document.createElement("li");
      liTagUstensil.className = "li-tag";
      ulTagUstensil.appendChild(liTagUstensil);

      const pTagUstensil = document.createElement("p");
      pTagUstensil.textContent = `${dataUstensil[u]}`;
      liTagUstensil.appendChild(pTagUstensil);

      const btnRemoveTagUstensil = document.createElement("button");
      btnRemoveTagUstensil.className = "remove-tag";
      liTagUstensil.appendChild(btnRemoveTagUstensil);
    }

    newUlIngredients = tagUlIngredient[0];
    liTagCloneIngredients = newUlIngredients.lastChild.cloneNode(true);
    newUlAppliance = tagUlAppliance[0];
    liTagCloneAppliance = newUlAppliance.lastChild.cloneNode(true);
    newUlUstensil = tagUlUstensil[0];
    liTagCloneUstensil = newUlUstensil.lastChild.cloneNode(true);
  } else {
    dataIngredients &&
      incrementaTag(newUlIngredients, dataIngredients, liTagCloneIngredients);
    dataAppliance &&
      incrementaTag(newUlAppliance, dataAppliance, liTagCloneAppliance);
    dataUstensil &&
      incrementaTag(newUlUstensil, dataUstensil, liTagCloneUstensil);
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
function tagData(e) {
  if (
    e !== undefined &&
    e.target.classList.contains("btn-tag") &&
    !e.target.classList.contains("btn-tag-active")
  ) {
    e.target.classList.add("btn-tag-active");
  }
  return removeTag(), leaveTag(btnIngredient, btnAppliance, btnUtensil);
}
const btnIngredient = document.getElementById("btn-ingredient-id");
btnIngredient.addEventListener("click", tagData);
const btnAppliance = document.getElementById("btn-appliance-id");
btnAppliance.addEventListener("click", tagData);
const btnUtensil = document.getElementById("btn-utensil-id");
btnUtensil.addEventListener("click", tagData);

//Recherche des critères de recherche dans la barre de recherche des tags
function searchManagement(e) {
  if (this.value.length !== 0) {
    this.name === "tag-search-ingredient"
      ? btnRemoveIngredient.classList.add("btn-remove-tag-active")
      : this.name === "tag-search-appliance"
      ? btnRemoveAppliance.classList.add("btn-remove-tag-active")
      : btnRemoveUstensil.classList.add("btn-remove-tag-active");
  }

  return e.target.getAttribute("name") === "tag-search-ingredient"
    ? (uptadeTags(e, ingredient), imputRemove(e))
    : e.target.getAttribute("name") === "tag-search-appliance"
    ? (uptadeTags(e, undefined, appliance), imputRemove(e))
    : (uptadeTags(e, undefined, undefined, ustensil), imputRemove(e));
}
searchIngredient.addEventListener("input", searchManagement);
searchAppliance.addEventListener("input", searchManagement);
searchUstensil.addEventListener("input", searchManagement);

// Selection d'un tag
function tagSelection(e) {
  const liTag = e !== undefined && e.target.closest(".li-tag");
  const tagUl = e.target.closest(".ul-tag");
  if (e !== undefined && !liTag.classList.contains("li-tag-active")) {
    liTag.classList.add("li-tag-active");
    const liTagsActive = e.target.closest(".ul-tag .li-tag-active");
    const userSelection = liTag.cloneNode(true);
    if (liTagsActive.length === 0) {
      tagUl.insertBefore(liTag, tagUl.firstChild);
    } else {
      for (let e = liTagsActive.length - 1; e >= 0; e--) {
        tagUl.insertBefore(liTag, liTagsActive[e].nextSibling);
        break;
      }
    }
    userDivSelection.appendChild(userSelection);
    return removeSearchTag(e), btnRemovetag();
  }
  return {};
}

// Supprime les caractères de input
function removeSearchTag(e) {
  const formIngredient = document.getElementById("form-ingredient-id");
  const formAppliance = document.getElementById("form-appliance-id");
  const formUstensil = document.getElementById("form-ustensil-id");
  btnRemoveIngredient.classList.remove("btn-remove-tag-active");
  btnRemoveAppliance.classList.remove("btn-remove-tag-active");
  btnRemoveUstensil.classList.remove("btn-remove-tag-active");
  if (e.target.nodeName === "P" || e.target.className === "btn-tag") {
    console.log(e.type);
    e.type === "mouseleave" && e.target.id === "btn-ingredient-id"
      ? (formIngredient.reset(),
        tagRender(e, ingredient),
        imputRemove(e, formIngredient))
      : e.type === "mouseleave" && e.target.id === "btn-appliance-id"
      ? (formAppliance.reset(),
        tagRender(e, undefined, appliance),
        imputRemove(e, formAppliance))
      : formUstensil.reset(),
      tagRender(e, undefined, undefined, ustensil),
      imputRemove(e, formUstensil);
  } else {
    return (
      e.target.id === "btn-ingredient-id"
        ? (tagRender(e, ingredient), imputRemove(e, formIngredient))
        : e.target.id === "btn-appliance-id"
        ? (tagRender(e, undefined, appliance), imputRemove(e, formAppliance))
        : tagRender(e, undefined, undefined, ustensil),
      imputRemove(e, formUstensil)
    );
  }
}
btnRemoveIngredient.addEventListener("click", removeSearchTag, { once: true });

// La div se réinitialise lorsque le curseur sort du champ des tags
function leaveTag(btnIngredient, btnAppliance, btnUtensil) {
  function removeClass(e) {
    return this.classList.remove("btn-tag-active"), removeSearchTag(e);
  }
  btnIngredient.addEventListener("mouseleave", removeClass, { once: true });
  btnAppliance.addEventListener("mouseleave", removeClass, { once: true });
  btnUtensil.addEventListener("mouseleave", removeClass, { once: true });
}
