document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.getElementById("cart-items");
  const checkoutBtn = document.getElementById("checkout-btn");

  let cartData = JSON.parse(localStorage.getItem("cart")) || [];
  if (!cartData.length) checkoutBtn.disabled = true;
  function renderCartItems() {
    cartItemsContainer.innerHTML = "";

    cartData.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");

      cartItem.innerHTML = `
      <div class="cart-item" data-index="${index}">
                <img src="${item.img}" alt="${item.name}">
                <div class="cart-item-info">
                    <p class="cart-item-title">${item.name}</p>
                    <div class="cart-item-details">
                        <label>Size:</label>
                        <select class="size-select">
                            <option value="10" ${
                              item.size === 10 ? "selected" : ""
                            }>10"</option>
                            <option value="12" ${
                              item.size === 12 ? "selected" : ""
                            }>12"</option>
                            <option value="14" ${
                              item.size === 14 ? "selected" : ""
                            }>14"</option>
                            <option value="16" ${
                              item.size === 16 ? "selected" : ""
                            }>16"</option>
                        </select>
                    </div>
                    <div class="cart-item-details">
                        <label>Quantity:</label>
                        <input type="number" class="quantity-input" value="${
                          item.quantity
                        }" min="1" max="99">
                    </div>
                    <div class="cart-item-details">
                        <label>Ingredients:</label>
                        <div class="ingredients">
                            <input type="checkbox" class="ingredient-checkbox pepperoni-cb" value="Pepperoni" ${
                              item.toppings.includes("Pepperoni")
                                ? "checked"
                                : ""
                            }>
                            <label>Pepperoni</label>
                            <input type="checkbox" class="ingredient-checkbox sausage-cb" value="Sausage" ${
                              item.toppings.includes("Sausage") ? "checked" : ""
                            }>
                            <label>Sausage</label>

                            <input type="checkbox" class="ingredient-checkbox salami-cb" value="Salami" ${
                              item.toppings.includes("Salami") ? "checked" : ""
                            }>
                            <label>Salami</label>

                            <input type="checkbox" class="ingredient-checkbox greenPepper-cb" value="Green pepper" ${
                              item.toppings.includes("Green pepper")
                                ? "checked"
                                : ""
                            }>
                            <label>Green Pepper</label>

                            <input type="checkbox" id="" class="ingredient-checkbox tomato-cb" value="Tomato" ${
                              item.toppings.includes("Tomato") ? "checked" : ""
                            }>
                            <label>Tomato</label>

                            <input type="checkbox" class="ingredient-checkbox blackOlives-cb" value="Black olives" ${
                              item.toppings.includes("Black olives")
                                ? "checked"
                                : ""
                            }>
                            <label>Black Olives</label>

                            <input type="checkbox" class="ingredient-checkbox threeCheese-cb" value="Three cheese" ${
                              item.toppings.includes("Three cheese")
                                ? "checked"
                                : ""
                            }>
                            <label>Three Cheese</label>
                        </div>
                    </div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" data-action="decrease">-</button>
                    <button class="quantity-btn" data-action="increase">+</button>
                </div>
                <button class="remove-btn">Remove</button>
                </div>
            `;

      cartItemsContainer.appendChild(cartItem);
    });
  }

  renderCartItems();

  checkoutBtn.addEventListener("click", function () {
    cartData = cartData.map((item) => {
      const { name, img, ...rest } = item;
      return rest;
    });
    fetch("/orders/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Ошибка при отправке заказа");
      })
      .then((data) => {
        cartData = [];
        renderCartItems();
        updateLocalStorage();
        alert("Заказ успешно оформлен!");
        window.location.href = "/view_orders";
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        alert("Произошла ошибка при оформлении заказа");
      });
  });

  // Обработчик кнопок изменения количества
  cartItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("quantity-btn")) {
      const action = event.target.dataset.action;
      const index = event.target.closest(".cart-item").dataset.index;
      const item = cartData[index];

      if (action === "decrease") {
        if (item.quantity > 1) {
          item.quantity--;
        }
      } else if (action === "increase") {
        item.quantity++;
      }

      renderCartItems();
      updateLocalStorage();
    }
  });

  // Обработчик кнопок удаления позиции
  cartItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-btn")) {
      const index = event.target.closest(".cart-item").dataset.index;
      cartData = cartData.filter((item, _index) => index != _index);

      // Обновление отображения и localStorage
      renderCartItems();
      updateLocalStorage();
    }
  });

  // Обработчик изменения количества в инпуте
  cartItemsContainer.addEventListener("change", function (event) {
    if (event.target.classList.contains("quantity-input")) {
      const newValue = parseInt(event.target.value);
      const index = event.target.closest(".cart-item").dataset.index;
      const item = cartData[index];

      if (!isNaN(newValue) && newValue >= 1 && newValue <= 99) {
        item.quantity = newValue;
      } else {
        event.target.value = item.quantity;
      }

      // Обновление отображения и localStorage
      renderCartItems();
      updateLocalStorage();
    }
  });

  // Обработчик изменения размера пиццы
  cartItemsContainer.addEventListener("change", function (event) {
    if (event.target.classList.contains("size-select")) {
      const newSize = parseInt(event.target.value);
      const index = event.target.closest(".cart-item").dataset.index;
      const item = cartData[index];

      item.size = newSize;

      // Обновление отображения и localStorage
      renderCartItems();
      updateLocalStorage();
    }
  });

  // Обработчик изменения выбранных ингредиентов
  cartItemsContainer.addEventListener("change", function (event) {
    if (event.target.classList.contains("ingredient-checkbox")) {
      const ingredient = event.target.value;
      const index = event.target.closest(".cart-item").dataset.index;
      const item = cartData[index];

      if (event.target.checked) {
        if (!item.toppings.includes(ingredient)) {
          item.toppings.push(ingredient);
        }
      } else {
        item.toppings = item.toppings.filter(
          (topping) => topping !== ingredient
        );
      }

      // Обновление отображения и localStorage
      renderCartItems();
      updateLocalStorage();
    }
  });

  // Функция обновления данных в localStorage
  function updateLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cartData));
  }
});
