const mainId = document.getElementById("main");

const renderMedia = () => {
  //création de la section tag
  const sectionTag = document.createElement("section");
  sectionTag.classList = "section-tag";
  mainId.appendChild(sectionTag);

  const btnIngredients = document.createElement("button");
  btnIngredients.classList = "btn-tag";
  btnIngredients.id = "btn-ingredients-id";
  btnIngredients.textContent = "Ingrédients";
  sectionTag.appendChild(btnIngredients);

  const btnAppareils = document.createElement("button");
  btnAppareils.classList = "btn-tag";
  btnAppareils.id = "btn-appareils-id";
  btnAppareils.textContent = "Appareils";
  sectionTag.appendChild(btnAppareils);

  const btnUstensiles = document.createElement("button");
  btnUstensiles.classList = "btn-tag";
  btnUstensiles.id = "btn-ustensiles-id";
  btnUstensiles.textContent = "Ustensiles";
  sectionTag.appendChild(btnUstensiles);

  const spanTag = document.createElement("span");
  spanTag.classList = "span-tag";
  sectionTag.appendChild(spanTag);

  const nbRecettes = document.createElement("p");
  nbRecettes.classList = "nb-recettes";
  nbRecettes.id = "nb-recettes-id";
  nbRecettes.textContent = "1500 recettes";
  spanTag.appendChild(nbRecettes);

  //création de la section des médias

  const sectionMedia = document.createElement("section");
  sectionMedia.classList = "section-media";
  sectionMedia.id = "section-media-id";
  mainId.appendChild(sectionMedia);

  const articleMedia = document.createElement("article");
  articleMedia.classList = "article-media";
  articleMedia.id = "article-media-id";
  sectionMedia.appendChild(articleMedia);

  const figureMedia = document.createElement("figure");
  figureMedia.classList = "figure-media";
  figureMedia.id = "figure-id";
  articleMedia.appendChild(figureMedia);

  const imgMedia = document.createElement("img");
  imgMedia.setAttribute("loading", "lazy");
  imgMedia.classList = "img-media";
  imgMedia.id = "img-id";
  figureMedia.appendChild(imgMedia);

  const figcaptionMedia = document.createElement("figcaption");
  figcaptionMedia.classList = "figcaption-media";
  figcaptionMedia.id = "figcaption-id";
  figureMedia.appendChild(figcaptionMedia);

  const divRecette = document.createElement("div");
  divRecette.classList = "div-recette-media";
  articleMedia.appendChild(divRecette);

  const titreRecette = document.createElement("h2");
  titreRecette.classList = "titre-recette-media";
  titreRecette.id = "titre-recette-id";
  titreRecette.textContent = "RECETTE";
  divRecette.appendChild(titreRecette);

  const paragrapheRecette = document.createElement("p");
  paragrapheRecette.classList = "paragraphe-recette-media";
  paragrapheRecette.id = "paragraphe-recette-id";
  divRecette.appendChild(paragrapheRecette);

  const divIngrédient = document.createElement("div");
  divIngrédient.classList = "div-ingrédient-media";
  divIngrédient.id = "div-ingrédient-id";
  articleMedia.appendChild(divIngrédient);

  const titreIngrédient = document.createElement("h2");
  titreIngrédient.classList = "titre-recette-media";
  titreIngrédient.id = "titre-recette-media-id";
  titreIngrédient.textContent = "Ingrédients";
  divIngrédient.appendChild(titreIngrédient);

  const divTitre = document.createElement("div");
  divTitre.classList = "div-titre-media";
  divTitre.id = "div-titre-id";
  divIngrédient.appendChild(divTitre);

  const titreIngredients = document.createElement("h3");
  titreIngredients.classList = "titre-ingrédient-media";
  titreIngredients.id = "titre-ingrédient-id";
  divTitre.appendChild(titreIngredients);

  const quantite = document.createElement("p");
  quantite.classList = "ingredients-recette-media";
  quantite.id = "ingredients-recette-id";
  divTitre.appendChild(quantite);

  const spanTime = document.createElement("span");
  spanTime.classList = "span-time";
  articleMedia.appendChild(spanTime);

  const paragrapheTime = document.createElement("p");
  paragrapheTime.id = "paragraphe-time-id";
  paragrapheTime.textContent = `min`;
  spanTime.appendChild(paragrapheTime);

  import("../data/recipes.js")
    .then((module) => {
      searchMedia(module);
    })
    .catch((err) => console.log("an error occurs", err));
};
renderMedia();

const searchMedia = (obj) => {
  const sectionMediaId = document.getElementById("section-media-id");
  const articleMediaId = document.getElementById("article-media-id");
  const imgId = document.getElementById("img-id");
  const figcaptionId = document.getElementById("figcaption-id");
  const recetteId = document.getElementById("paragraphe-recette-id");
  const divTitreId = document.getElementById("div-titre-id");
  const divIngredient = document.getElementById("div-ingrédient-id");
  const timeId = document.getElementById("paragraphe-time-id");

  // const divIngredientClone = divIngredient.cloneNode(true);
  // const divTitreIdClone = divIngredientClone.querySelector("#div-titre-id");

  for (const value of obj.recipes) {
    const cloneArticle = articleMediaId.cloneNode(true);
    const imgIdClone = cloneArticle.querySelector("#img-id");
    const figcaptionIdClone = cloneArticle.querySelector("#figcaption-id");
    const recetteIdClone = cloneArticle.querySelector("#paragraphe-recette-id");
    const IngredientClone = cloneArticle.querySelector("#div-ingrédient-id");

    const timeIdClone = cloneArticle.querySelector("#paragraphe-time-id");

    const divIngredientClone = IngredientClone.cloneNode(true);
    const divTitreIdClone = divIngredientClone.querySelector("#div-titre-id");

    const divTitreIdAll = document.querySelectorAll("#div-titre-id");

    if (value.id === 1) {
      imgId.setAttribute(
        "src",
        `../assets/Photos P7 JS Les petits plats/${value.image}`
      );
      imgId.setAttribute("alt", `${value.name}`);

      figcaptionId.textContent = `${value.name}`;

      recetteId.textContent = `${value.description}`;
    } else {
      imgIdClone.setAttribute(
        "src",
        `../assets/Photos P7 JS Les petits plats/${value.image}`
      );
      imgIdClone.setAttribute("alt", `${value.name}`);

      figcaptionIdClone.textContent = `${value.name}`;

      recetteIdClone.textContent = `${value.description}`;
    }
    for (const element of value.ingredients) {
      const cloneDivIngredient = divTitreIdClone.cloneNode(true);
      const titreIngredientsIdClone = cloneDivIngredient.querySelector(
        "#titre-ingrédient-id"
      );
      const quantiteIdClone = cloneDivIngredient.querySelector(
        "#ingredients-recette-id"
      );
      const titreIngredientsId = document.getElementById("titre-ingrédient-id");
      const quantiteId = document.getElementById("ingredients-recette-id");
      if (
        value.ingredients[0].ingredient === element.ingredient &&
        value.id === 1
      ) {
        titreIngredientsId.textContent = `${element.ingredient}`;

        quantiteId.textContent =
          `${element.quantity}` !== "undefined" &&
          `${element.unit}` !== "undefined"
            ? `${element.quantity} ${element.unit}`
            : `${element.quantity}` !== "undefined" &&
              `${element.unit}` === "undefined"
            ? `${element.quantity}`
            : `${element.quantity}` === "undefined" &&
              `${element.unit}` === "undefined" &&
              null;

        `${element.quantity}` !== "undefined" &&
          divTitreId.appendChild(quantiteId);
      } else {
        titreIngredientsIdClone.textContent = `${element.ingredient}`;

        quantiteIdClone.textContent =
          `${element.quantity}` !== "undefined" &&
          `${element.unit}` !== "undefined"
            ? `${element.quantity} ${element.unit}`
            : `${element.quantity}` !== "undefined" &&
              `${element.unit}` === "undefined"
            ? `${element.quantity}`
            : `${element.quantity}` === "undefined" &&
              `${element.unit}` === "undefined" &&
              null;

        `${element.quantity}` !== "undefined" &&
          cloneDivIngredient.appendChild(quantiteIdClone);

        const parentDiv = IngredientClone.parentNode;

        if (value.id === 1) {
          divIngredient.appendChild(cloneDivIngredient);
        } else if (
          value.id >= 2 &&
          divIngredientClone.childNodes.length - 1 === value.ingredients.length
          //   &&
          // parentDiv === "null"
        ) {
          parentDiv.replaceChild(divIngredientClone, IngredientClone);
        } else {
          if (
            value.id === 2 &&
            divIngredientClone.childNodes.length - 1 === divTitreIdAll.length
          ) {
            for (let i = 1; i < divIngredientClone.childNodes.length; i++) {
              for (let d in divTitreIdAll) {
                while (
                  divIngredientClone.children.length !== 1 &&
                  divIngredientClone.childNodes[i].textContent ===
                    divTitreIdAll[d].textContent
                ) {
                  divIngredientClone.removeChild(divIngredientClone.lastChild);
                }
              }
            }
          }
          divIngredientClone.appendChild(cloneDivIngredient);
        }
      }
    }
    value.id === 1
      ? (timeId.textContent = `${value.time}min`)
      : (timeIdClone.textContent = `${value.time}min`);
    value.id !== 1 && sectionMediaId.appendChild(cloneArticle);
  }
};
