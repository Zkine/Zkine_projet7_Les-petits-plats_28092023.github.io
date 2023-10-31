// import { dataFilterSearch } from "./index.js";

// const tagRender = (data) => {
//   const navTag = document.getElementById("nav-tag-id");
//   const ulTag = document.createElement("ul");
//   ulTag.className = "ul-tag";
//   navTag.appendChild(ulTag);

//   for (let i = 0; i < data.length; i++) {
//     const liTag = document.createElement("li");
//     liTag.className = "li-tag";
//     liTag.textContent = `${data[i]}`;
//     ulTag.appendChild(liTag);
//   }
// };

// export const tagData = (e) => {
//   if (!e.target.classList.contains("btn-tag-active")) {
//     e.target.classList.add("btn-tag-active");
//   }
//   const { ingredients } = dataFilterSearch();
//   tagRender(ingredients);
// };
// const btnIngredient = document.getElementById("btn-ingredient-id");
// btnIngredient.addEventListener("click", tagData);

// const tagLeave = (e) => {
//   if (e.target.classList.contains("btn-tag-active")) {
//     e.target.classList.remove("btn-tag-active");
//   }
// };
// btnIngredient.addEventListener("mouseleave", tagLeave);
