document.addEventListener("DOMContentLoaded", function () {
  const toppingsLabels = document.querySelectorAll(".toppings-options label");

  // Добавляем обработчик события для каждого лейбла
  toppingsLabels.forEach(function (label) {
    label.addEventListener("click", function (e) {
      // Находим соответствующий чекбокс по id лейбла
      const checkboxId = e.target.getAttribute("for");
      const checkbox = document.getElementById(checkboxId);

      // Обновляем классы для лейбла в зависимости от состояния чекбокса
      if (checkbox.checked) {
        e.target.classList.remove("selected");
      } else {
        e.target.classList.add("selected");
      }
    });
  });

  const sizeLabels = document.querySelectorAll(".size-options label");
  const sizeInputs = document.querySelectorAll(".size-options input");

  const urlParams = new URLSearchParams(window.location.search);
  for (let index = 0; index < sizeInputs.length; index++) {
    if (sizeInputs[index].value == urlParams.get("size")) {
      sizeInputs[index].checked = true;
      sizeLabels[index].classList.add("active");
    }
  }

  // Добавляем обработчик события для каждого лейбла
  sizeLabels.forEach(function (label) {
    label.addEventListener("click", function () {
      // Находим соответствующий инпут по id лейбла
      const inputId = label.getAttribute("for");
      const input = document.getElementById(inputId);

      // Обнуляем состояние checked для всех инпутов
      sizeLabels.forEach(function (label) {
        const inputId = label.getAttribute("for");
        const input = document.getElementById(inputId);
        input.checked = false;
        label.classList.remove("active");
      });

      // Устанавливаем состояние выбранности только для текущего инпута
      input.checked = true;
      label.classList.add("active");
    });
  });

  const decreaseBtn = document.getElementById("decrease");
  const increaseBtn = document.getElementById("increase");
  const quantityInput = document.getElementById("quantity");

  decreaseBtn.addEventListener("click", function () {
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
      quantityInput.value = --quantity;
    }
  });

  increaseBtn.addEventListener("click", function () {
    let quantity = parseInt(quantityInput.value);
    quantityInput.value = ++quantity;
  });

  // Обработка добавления в корзину
  const addToCartBtn = document.getElementById("addToCart");
  addToCartBtn.addEventListener("click", function () {
    const id = document.getElementById("pizzaId").value;
    const name = document.getElementById("pizzaName").innerText;
    const img = document.getElementById("pizzaImg").src;
    const sizeInput = document.querySelector('input[name="size"]:checked');
    if (!sizeInput) {
      showMessage("Please, select the size", "error");
      return;
    }
    const size = parseInt(sizeInput.value);
    const quantity = parseInt(quantityInput.value);

    const toppings = [];
    document
      .querySelectorAll('input[name="toppings"]:checked')
      .forEach(function (topping) {
        toppings.push(topping.value);
      });

    const data = {
      id,
      name,
      img,
      size,
      quantity,
      toppings,
    };
    const cart = JSON.parse(localStorage.getItem("cart") ?? "[]");
    cart.push(data);
    localStorage.setItem("cart", JSON.stringify(cart));
    showMessage("Your pizza has been added to cart");
  });
});
function showMessage(message, color = "success") {
  const messageContainer = document.getElementById("message-container");
  messageContainer.textContent = message;
  messageContainer.classList.add(color);
  messageContainer.style.display = "block";

  setTimeout(function () {
    messageContainer.style.display = "none";
    messageContainer.classList.remove(color);
  }, 3000);
}
