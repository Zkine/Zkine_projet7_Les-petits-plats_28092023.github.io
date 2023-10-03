const btnSearch = document.getElementById("btn-search-id");
const dataErreur = document.getElementById("paragraphe-search-id");
const articleMedia = document.getElementById("article-media-id");
const elementSearch = [...document.querySelectorAll("#input-id")];

const textSearch = elementSearch.map((e) => e.textContent);

const inputUser = (e) => {
  console.log(e);
  // for (const value of textSearch) {
  // console.log(value);
  const values = textSearch.indexOf(e.target.value);
  console.log(values);
  if (e.target.value.length >= 3 && values == -1) {
    // console.log(value.textContent.indexOf(e.target.value));dataErreur.setAttribute("data-error-visible", true);
    const dataErreurText = dataErreur.getAttribute("data-error");
    dataErreur.setAttribute(
      "data-error",
      dataErreurText.replace("XXX", e.target.value)
    );
  } else if (e.target.value.length >= 3 && values !== -1) {
    dataErreur.setAttribute("data-error-visible", false);
  }
  // }
};
const inputSearch = document.getElementById("site-search");
inputSearch.addEventListener("input", inputUser);
