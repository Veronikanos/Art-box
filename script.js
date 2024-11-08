document.addEventListener("DOMContentLoaded", function () {
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

      // Перевірка обов'язкових полів
      if (!name || !phone || !address || !color || !gloveSize || !flowerType) {
        alert("Будь ласка, заповніть всі обов'язкові поля.");
        return;
      }

      // Формуємо текст повідомлення
      const message = `
      🔹 Ім'я: ${name}
      🔹 Телефон: ${phone}
      🔹 Адреса для доставки: ${address}
      🔹 Коментар: ${comment || "Немає"}
      🔹 Колір барвника: ${color}
      🔹 Розмір рукавиць: ${gloveSize}
      🔹 Вид сухоцвітів: ${flowerType}
    `;

      // Параметри для відправки повідомлення
      const botToken = "7354150090:AAHBwvwriUroFKv6unHt6tO3MtIz83uhDHI";
      const chatId = "-1002158696597";
      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
      const params = {
        chat_id: chatId,
        text: message,
      };

      // Відправка запиту до Telegram API
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      })
        .then((response) => {
          if (response.ok) {
            alert("Ваше замовлення успішно відправлено!");
            document.getElementById("artboxForm").reset(); // Очищення форми після успішної відправки
          } else {
            alert(
              "Виникла помилка при відправці замовлення. Спробуйте ще раз."
            );
          }
        })
        .catch((error) => {
          console.error("Помилка:", error);
          alert(
            "Неможливо відправити замовлення. Перевірте підключення до інтернету."
          );
        });
    });

  // Функція для додавання класу "selected" до вибраного label
  document.querySelectorAll("fieldset").forEach((fieldset) => {
    const radioButtons = fieldset.querySelectorAll('input[type="radio"]');

    radioButtons.forEach((radio) => {
      radio.addEventListener("change", () => {
        // Видаляємо клас "selected" з усіх елементів у поточному fieldset
        fieldset.querySelectorAll("label").forEach((label) => {
          label.classList.remove("selected");
        });

        // Додаємо клас "selected" до обраного елемента
        radio.parentElement.classList.add("selected");
      });
    });
  });
});
