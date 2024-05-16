// Функция для создания элемента списка заказов
function createOrderListItem(order) {
  const listItem = document.createElement("li");
  listItem.textContent = `Order ID: ${order._id}, Status: ${order.status}`;
  return listItem;
}

// Функция для загрузки всех заказов
async function loadOrders() {
  const response = await fetch("/orders/all");
  const orders = await response.json();
  const orderList = document.getElementById("orderList");
  orderList.innerHTML = "";
  orders.forEach((order) => {
    const listItem = createOrderListItem(order);
    orderList.appendChild(listItem);
  });
}

// Функция для отправки данных заказа
async function submitOrder(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const jsonData = {};
  formData.forEach((value, key) => {
    jsonData[key] = value;
  });
  const response = await fetch("/orders/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  });
  if (response.ok) {
    alert("Order placed successfully!");
    form.reset();
  } else {
    alert("Failed to place order");
  }
}

// Функция для инициализации
function init() {
  const createOrderForm = document.getElementById("orderForm");
  const viewOrdersButton = document.getElementById("viewOrders");

  createOrderForm.addEventListener("submit", submitOrder);
  viewOrdersButton.addEventListener("click", loadOrders);
}

init();
