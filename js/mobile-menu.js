const navMenu = document.querySelector(".header__menu")
const menuMobile = document.querySelector(".menu__list-mobile")
const menuBtn = document.querySelector(".header-mobile-menu-btn")

menuBtn.addEventListener('click', () => {

    navMenu.classList.toggle('menu--open');
});

menuMobile.addEventListener('click', () => {

    navMenu.classList.toggle('menu--open');
});