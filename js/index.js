import { renderMedia } from "./50_recettes.js";

const boucleNative = () => {
  import("../data/recipes.js")
    .then((module) => {
      for (const value of module.recipes) {
        renderMedia(value);
      }
    })
    .catch((err) => console.log("an error occurs", err));
};
export default boucleNative();
