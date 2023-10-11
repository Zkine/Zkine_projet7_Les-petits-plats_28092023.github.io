import { renderMedia } from "./recipe.js";

// Fonction qui fait appel au DATA des recettes puis la boucle permet d'incrémenter le DOM par défault ou par filtres
const mediaIncrement = () => {
  import("../data/recipes.js")
    .then((module) => {
      for (const value of module.recipes) {
        renderMedia(value);
      }
    })
    .catch((err) => console.log("an error occurs", err));
};
export default mediaIncrement();
