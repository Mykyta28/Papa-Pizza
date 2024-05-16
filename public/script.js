document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("order-form");
  const summaryList = document.getElementById("summary-list");
  const totalPrice = document.getElementById("total-price");
  const pizzaOptions = [
    { name: "Margherita", price: { small: 9.99, medium: 11.99, large: 13.99 } },
    { name: "Pepperoni", price: { small: 10.99, medium: 12.99, large: 14.99 } },
    {
      name: "Vegetarian",
      price: { small: 11.99, medium: 13.99, large: 15.99 },
    },
    // Add more pizza options here
  ];

  // Dynamically create pizza options
  pizzaOptions.forEach((pizza) => {
    const pizzaDiv = document.createElement("div");
    pizzaDiv.innerHTML = `
            <input type="number" min="0" value="0" id="${pizza.name.toLowerCase()}-quantity">
            <label for="${pizza.name.toLowerCase()}-quantity">${
      pizza.name
    }</label>
        `;
    document.getElementById("pizza-options").appendChild(pizzaDiv);
  });

  // Calculate and display order summary
  form.addEventListener("change", () => {
    summaryList.innerHTML = "";
    let total = 0;
    pizzaOptions.forEach((pizza) => {
      const quantity = parseInt(
        document.getElementById(`${pizza.name.toLowerCase()}-quantity`).value
      );
      if (quantity > 0) {
        const subtotal = calculateSubtotal(pizza, quantity);
        total += subtotal;
        const li = document.createElement("li");
        li.textContent = `${pizza.name} x${quantity}: $${subtotal.toFixed(2)}`;
        summaryList.appendChild(li);
      }
    });
    total *= 1.1; // Apply 10% tax
    totalPrice.textContent = `Total Price: $${total.toFixed(2)}`;
  });

  // Helper function to calculate subtotal for a pizza
  function calculateSubtotal(pizza, quantity) {
    const size = "medium"; // Default size, you can change this
    return pizza.price[size] * quantity;
  }

  // Handle form submission (AJAX)
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = {
      customer: {
        name: document.getElementById("name").value,
        address: document.getElementById("address").value,
        phone: document.getElementById("phone").value,
      },
      pizzas: [],
      comments: document.getElementById("comments").value,
    };

    pizzaOptions.forEach((pizza) => {
      const quantity = parseInt(
        document.getElementById(`${pizza.name.toLowerCase()}-quantity`).value
      );
      if (quantity > 0) {
        formData.pizzas.push({
          name: pizza.name,
          size: "medium", // Default size, you can change this
          quantity: quantity,
          toppings: [], // Add toppings if needed
        });
      }
    });

    fetch("/orders/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response from server
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  });
});
