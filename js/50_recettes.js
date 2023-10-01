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
  mainId.appendChild(sectionMedia);
  import("../data/recipes.js")
    .then((module) => {
      for (const value of module.recipes) {
        const articleMedia = document.createElement("article");
        articleMedia.classList = "article-media";
        sectionMedia.appendChild(articleMedia);

        const figureMedia = document.createElement("figure");
        figureMedia.classList = "figure-media";
        articleMedia.appendChild(figureMedia);

        const imgMedia = document.createElement("img");
        imgMedia.setAttribute("loading", "lazy");
        imgMedia.classList = "img-media";
        imgMedia.setAttribute(
          "src",
          `../assets/Photos P7 JS Les petits plats/${value.image}`
        );
        imgMedia.setAttribute("alt", `${value.name}`);
        figureMedia.appendChild(imgMedia);

        const figcaptionMedia = document.createElement("figcaption");
        figcaptionMedia.classList = "figcaption-media";
        figcaptionMedia.textContent = `${value.name}`;
        figureMedia.appendChild(figcaptionMedia);

        const divRecette = document.createElement("div");
        divRecette.classList = "div-recette-media";
        articleMedia.appendChild(divRecette);

        const titreRecette = document.createElement("h2");
        titreRecette.classList = "titre-recette-media";
        titreRecette.textContent = "RECETTE";
        divRecette.appendChild(titreRecette);

        const paragrapheRecette = document.createElement("p");
        paragrapheRecette.classList = "paragraphe-recette-media";
        paragrapheRecette.textContent = `${value.description}`;
        divRecette.appendChild(paragrapheRecette);

        const divIngrédient = document.createElement("div");
        divIngrédient.classList = "div-ingrédient-media";
        articleMedia.appendChild(divIngrédient);

        const titreIngrédient = document.createElement("h2");
        titreIngrédient.classList = "titre-recette-media";
        titreIngrédient.textContent = "Ingrédients";
        divIngrédient.appendChild(titreIngrédient);

        for (const element of value.ingredients) {
          const divTitre = document.createElement("div");
          divTitre.classList = "div-titre-media";
          divIngrédient.appendChild(divTitre);

          const titreIngredients = document.createElement("h3");
          titreIngredients.classList = "titre-ingrédient-media";
          titreIngredients.textContent = `${element.ingredient}`;
          divTitre.appendChild(titreIngredients);

          const quantite = document.createElement("p");
          quantite.classList = "ingredients-recette-media";
          quantite.textContent =
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
            divTitre.appendChild(quantite);
        }
        const spanTime = document.createElement("span");
        spanTime.classList = "span-time";
        divIngrédient.appendChild(spanTime);

        const paragrapheTime = document.createElement("p");
        paragrapheTime.classList = "paragrophe-time";
        paragrapheTime.textContent = `${value.time}min`;
        spanTime.appendChild(paragrapheTime);
      }
    })
    .catch((err) => console.log("an error occurs", err));
};
renderMedia();
