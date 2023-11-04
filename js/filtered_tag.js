const btnRemoveTag = document.getElementById("btn-remove-tag-id");
const navTag = document.getElementById("nav-tag-id");
// Création dynamique du DOM des bouttons tag - ingrédients, les ustensiles ou les appareils.
function tagRender(repices) {
  if (!navTag.hasChildNodes()) {
    const ulTag = document.createElement("ul");
    ulTag.className = "ul-tag";
    ulTag.id = "ul-tag-id";
    navTag.appendChild(ulTag);

    for (let i = 0; i < repices.length; i++) {
      const liTag = document.createElement("li");
      liTag.className = "li-tag";
      liTag.id = "li-tag-id";
      ulTag.appendChild(liTag);

      const pTag = document.createElement("p");
      pTag.textContent = `${repices[i]}`;
      liTag.appendChild(pTag);
    }
  } else if (navTag.hasChildNodes() && repices.length !== 0) {
    const ulTagID = document.getElementById("ul-tag-id");
    const liTagID = document.getElementById("li-tag-id");
    while (ulTagID.hasChildNodes()) {
      ulTagID.removeChild(ulTagID.firstChild);
    }
    for (let i = 0; i < repices.length; i++) {
      let liTagClone = liTagID.cloneNode(true);
      liTagClone.textContent = `${repices[i]}`;
      ulTagID.appendChild(liTagClone);
    }
  }
}

export function searchManagement(result) {
  btnRemoveTag.classList.add("btn-remove-tag-active");
  tagRender(result);
}

// fonction qui gère extension des boutons
function tagData(e) {
  if (
    !e.target.classList.contains("btn-tag-active") &&
    e.target.classList.contains("btn-tag")
  ) {
    e.target.classList.add("btn-tag-active");
  }
}
const btnIngredient = document.getElementById("btn-ingredient-id");
btnIngredient.addEventListener("click", tagData);

// Supprime les caractères de recherches au click sur la croix
function removeSearchTag() {
  btnRemoveTag.classList.contains("btn-remove-tag-active") &&
    btnRemoveTag.classList.remove("btn-remove-tag-active");
  const formTag = document.getElementById("form-tag-id");
  return formTag.reset();
}
btnRemoveTag.addEventListener("click", removeSearchTag);

// Le bouton se réinitialise lorsque le curseur sort du champ du bouton
function tagLeave(e) {
  if (e.target.classList.contains("btn-tag-active")) {
    e.target.classList.remove("btn-tag-active");
    removeSearchTag();
  }
}
btnIngredient.addEventListener("mouseleave", tagLeave);
