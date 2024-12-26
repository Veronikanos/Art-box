document.addEventListener("DOMContentLoaded", function () {
    // Функція для показу модального вікна з повідомленням
    function showModal(message) {
      const modal = document.getElementById("modal");
      const modalMessage = document.getElementById("modal-message");
      modalMessage.innerHTML = message; // Додаємо HTML для форматованого тексту
      modal.style.display = "block";
    }
  
    // Закриття модального вікна
    document.querySelector(".close").onclick = function () {
      document.getElementById("modal").style.display = "none";
    };
  
    // Закриття модального вікна при кліку поза вікном
    window.onclick = function (event) {
      const modal = document.getElementById("modal");
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  
    document
      .getElementById("artboxForm")
      .addEventListener("submit", function (event) {
        event.preventDefault();
  
        // Отримуємо значення полів форми
        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const address = document.getElementById("address").value.trim();
        const comment = document.getElementById("comment").value.trim();
        const color = document.querySelector(
          'input[name="color"]:checked'
        )?.value;
        const gloveSize = document.querySelector(
          'input[name="glove_size"]:checked'
        )?.value;
        const flowerType = document.querySelector(
          'input[name="flower-type"]:checked'
        )?.value;
  
        // Перевірка на заповненість обов'язкових полів
        let missingFields = [];
        if (!name) missingFields.push("Ім'я");
        if (!phone) missingFields.push("Телефон");
        if (!address) missingFields.push("Адреса для доставки");
        if (!color) missingFields.push("Колір барвника");
        if (!gloveSize) missingFields.push("Розмір рукавиць");
        if (!flowerType) missingFields.push("Вид сухоцвітів");
  
        // Якщо є пропущені обов'язкові поля
        if (missingFields.length > 0) {
          let errorMessage =
            "<p>Будь ласка, заповніть всі обов'язкові поля:</p><ul>";
          missingFields.forEach((field) => {
            errorMessage += `<li>${field}</li>`;
          });
          errorMessage += "</ul>";
          showModal(errorMessage);
          return; // Не очищаємо форму та дозволяємо користувачу дозаповнити
        }
  
        // Якщо всі обов'язкові поля заповнено, формуємо повідомлення для відправки
        const message = `
        🔹 Ім'я: ${name}
        🔹 Телефон: ${phone}
        🔹 Адреса для доставки: ${address}
        🔹 Коментар: ${comment || "Немає"}
        🔹 Колір барвника: ${color}
        🔹 Розмір рукавиць: ${gloveSize}
        🔹 Вид сухоцвітів: ${flowerType}
      `;
  
        const botToken = "7354150090:AAHBwvwriUroFKv6unHt6tO3MtIz83uhDHI";
        const chatId = "-1002158696597";
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const params = {
          chat_id: chatId,
          text: message,
        };
  
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        })
          .then((response) => {
            if (response.ok) {
              const successMessage = `
              <p>${name}, Ваше замовлення успішно відправлено! Ми зв'яжемось з вами найближчим часом.</p>
             <br>
              <p><strong>Вибрані варіанти:</strong></p>
              <ul>
                <li>Колір барвника: ${color}</li>
                <li>Розмір рукавиць: ${gloveSize}</li>
                <li>Вид сухоцвітів: ${flowerType}</li>
              </ul>
              <p class="additional-info">Ваше замовлення буде скомплектовано з обраним вами наповненням.</p>
            `;
              showModal(successMessage);
              document.getElementById("artboxForm").reset();
            } else {
              showModal(
                "Виникла помилка при відправці замовлення. Спробуйте ще раз."
              );
            }
          })
          .catch((error) => {
            console.error("Помилка:", error);
            showModal(
              "Неможливо відправити замовлення. Перевірте підключення до інтернету."
            );
          });
      });
  });
  