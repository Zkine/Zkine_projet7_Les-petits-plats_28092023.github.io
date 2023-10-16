const sectionMedia = document.getElementById("section-media-id");

// Création du DOM pour une recette
export const renderMedia = (value) => {
  const articleMedia = document.createElement("article");
  articleMedia.classList = "article-media";
  articleMedia.id = "article-media-id";
  sectionMedia.appendChild(articleMedia);

  const figureMedia = document.createElement("figure");
  figureMedia.classList = "figure-media";
  articleMedia.appendChild(figureMedia);

  const imgMedia = document.createElement("img");
  imgMedia.setAttribute("loading", "lazy");
  imgMedia.classList = "img-media";
  imgMedia.id = "img-id";
  imgMedia.setAttribute(
    "src",
    `../assets/Photos P7 JS Les petits plats/${value.image}`
  );
  imgMedia.setAttribute("alt", `${value.name}`);
  figureMedia.appendChild(imgMedia);

  const figcaptionMedia = document.createElement("figcaption");
  figcaptionMedia.classList = "figcaption-media";
  figcaptionMedia.id = "figcaption-id";
  figcaptionMedia.textContent = `${value.name}`;
  figureMedia.appendChild(figcaptionMedia);

  const divRecette = document.createElement("div");
  divRecette.classList = "div-recipe-media";
  articleMedia.appendChild(divRecette);

  const titreRecette = document.createElement("h2");
  titreRecette.classList = "title-recipe-media";
  titreRecette.textContent = "RECETTE";
  divRecette.appendChild(titreRecette);

  const paragrapheRecette = document.createElement("p");
  paragrapheRecette.classList = "paragraph-recipe-media";
  paragrapheRecette.id = "paragraph-recipe-id";
  paragrapheRecette.textContent = `${value.description}`;
  divRecette.appendChild(paragrapheRecette);

  const divIngrédient = document.createElement("div");
  divIngrédient.classList = "div-ingrédient-media";
  articleMedia.appendChild(divIngrédient);

  const titreIngrédient = document.createElement("h2");
  titreIngrédient.classList = "title-recipe-media";
  titreIngrédient.textContent = "Ingrédients";
  divIngrédient.appendChild(titreIngrédient);

  for (const element of value.ingredients) {
    const divTitre = document.createElement("div");
    divTitre.classList = "div-title-media";
    divIngrédient.appendChild(divTitre);

    const titreIngredients = document.createElement("h3");
    titreIngredients.classList = "title-ingredient-media";
    titreIngredients.id = "title-ingredient-id";
    titreIngredients.textContent = `${element.ingredient}`;
    divTitre.appendChild(titreIngredients);

    const quantite = document.createElement("p");
    quantite.classList = "ingredients-recipe-media";
    quantite.textContent =
      `${element.quantity}` !== "undefined" && `${element.unit}` !== "undefined"
        ? `${element.quantity} ${element.unit}`
        : `${element.quantity}` !== "undefined" &&
          `${element.unit}` === "undefined"
        ? `${element.quantity}`
        : `${element.quantity}` === "undefined" &&
          `${element.unit}` === "undefined" &&
          null;

    `${element.quantity}` !== "undefined" && divTitre.appendChild(quantite);
  }

  const paragrapheTime = document.createElement("p");
  paragrapheTime.classList = "paragraph-time";
  paragrapheTime.id = "time-id";
  paragrapheTime.textContent = `${value.time}min`;
  articleMedia.appendChild(paragrapheTime);
};

// Affichage du nombre de recette(s)
export const numberOfRecipes = () => {
  setTimeout(() => {
    const nbRecette = document.getElementById("nb-recipe-id");
    nbRecette.textContent = `${sectionMedia.children.length} recettes`;
  }, 1);
};
numberOfRecipes();
