const themeChange = document.getElementById("rail");
const themeText = document.querySelectorAll("h3");
const darkTheme = document.querySelector("body");
const darkThemeMain = document.querySelector("main");
const darkList = document.querySelectorAll("li");
const darkOptionsField = document.querySelector(".container__options");
const darkRaffleField = document.getElementById("draw_result");
const darkListText = document.getElementById("list_options");

themeChange.addEventListener("click", () => {
  themeChange.classList.toggle("dark");
  darkTheme.classList.toggle("dark");
  darkThemeMain.classList.toggle("dark");
  darkOptionsField.classList.toggle("dark");
  darkRaffleField.classList.toggle("dark");
  darkListText.classList.toggle("dark");

  themeText.forEach(function (h3) {
    h3.classList.toggle("dark");
  });
  darkList.forEach(function (li) {
    li.classList.toggle("dark");
  });
});
