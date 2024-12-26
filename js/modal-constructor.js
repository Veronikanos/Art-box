

const orderButtons = document.querySelectorAll(".btn-order-js");
const modal = document.getElementById("modal");
const mainBox = document.getElementById("mainbox");
const heroSection = document.querySelector(".hero");
const headerMain = document.querySelector(".header-main");
const backButton = document.getElementById("back");
const toTopBtn = document.querySelector(".top-btn");

// Добавляем начальные стили для модального окна
modal.style.position = "fixed";
modal.style.top = "0";
modal.style.left = "-100%";
modal.style.width = "100%";
modal.style.height = "100%";
modal.style.transition = "left 1s ease";
modal.style.display = "none";
modal.style.zIndex = "1000"; // Выше остальных элементов

// Затемнение фона при активном модальном окне
mainBox.style.transition = "opacity 0.1s ease";

// Показать модальное окно при клике на любую кнопку с классом btn-order
orderButtons.forEach(button => {
    button.addEventListener("click", () => {
        modal.style.display = "block"; // Показываем модальное окно
        setTimeout(() => {
            modal.style.left = "50%"; // Запускаем анимацию выезда
        }, 5); // Небольшая задержка, чтобы transition сработал

        mainBox.style.opacity = "0.5"; // Затемняем фон
        mainBox.style.pointerEvents = "none"; // Отключаем взаимодействие
        heroSection.scrollIntoView({ behavior: "smooth", block: "start" });
       
        setTimeout(() => {
          mainBox.style.display = "none";
         
      }, 900); // Учитываем длительность анимации
     
    });
});

// Закрыть модальное окно
backButton.addEventListener("click", () => {
  mainBox.style.display = "block";
    modal.style.left = "-100%"; // Анимация уезда модального окна
    setTimeout(() => {
        modal.style.display = "none"; // Скрываем модальное окно после завершения анимации
        mainBox.style.opacity = "1"; // Восстанавливаем фон
        mainBox.style.pointerEvents = "auto"; // Включаем взаимодействие
        headerMain.scrollIntoView({ behavior: "smooth", block: "start" });
        
    }, 500); // Учитываем длительность анимации
   
});