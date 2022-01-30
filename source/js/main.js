const windowWidth = window.innerWidth ;
const TABLET_DESKTOP = 768;
const exampleSlider = document.querySelector(".example__slider");

if (exampleSlider) {
  if (TABLET_DESKTOP <= windowWidth) {
    const btnBefore = document.querySelector(".example__button--before");
    const btnAfter = document.querySelector(".example__button--after");

    const sliderRange = document.querySelector(".example__slider-range");

    const imageBefore = document.querySelector(".example__image-after");
    const imageAfter = document.querySelector(".example__image-before");

    sliderRange.addEventListener("input", () => {
      imageBefore.style.width = `${100 - sliderRange.value}%`;
      imageAfter.style.width =  `${sliderRange.value}%`;
    });

    btnBefore.addEventListener("click", () => {
      imageBefore.style.width = `${100}%`;
      imageAfter.style.width = `${0}%`;
    });

    btnAfter.addEventListener("click", () => {
      imageBefore.style.width = `${0}%`;
      imageAfter.style.width = `${100}%`;
    });
  }
}

const btnHumburger = document.querySelector(".humburger");
const menu = document.querySelector(".menu__list");
const menuNoJs = document.querySelector(".menu__list-no-js");
const btnBurgerNoJs = document.querySelector(".humburger--no-js-none");

btnHumburger.classList.remove("humburger--active");
menuNoJs.classList.remove("menu__list-no-js")
btnBurgerNoJs.classList.remove("humburger--no-js-none")

btnHumburger.addEventListener("click", () => {
  menu.classList.toggle("menu__list--active");
  btnHumburger.classList.toggle("humburger--active");
});
