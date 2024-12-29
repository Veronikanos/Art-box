

const navMenu = document.querySelector(".header__menu");
const menuBtn = document.querySelector(".header-mobile-menu-btn");
const menuCloseBtn = document.querySelector(".header-menu-btn-close");
const mainSection = document.querySelector("main");

// Обробник відкриття меню
menuBtn.addEventListener('pointerdown', () => {
    navMenu.classList.toggle('menu--open');
    // Додати обробник для закриття меню поза межами
    mainSection.addEventListener('pointerdown', closeMenuOnPointerDownOutside);
});

// Закриття меню через кнопку закриття
menuCloseBtn.addEventListener('pointerdown', () => {
    navMenu.classList.remove('menu--open');
});

// Закриття меню, якщо натискається поза меню
function closeMenuOnPointerDownOutside(event) {
    // Перевіряємо, чи натискається поза межами меню
    if (!navMenu.contains(event.target) && !menuBtn.contains(event.target)) {
        navMenu.classList.remove('menu--open');
        mainSection.removeEventListener('pointerdown', closeMenuOnPointerDownOutside); // Видаляємо слухача після закриття
    }
}