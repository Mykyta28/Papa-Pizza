document.addEventListener("DOMContentLoaded", function () {
  const pizzaLink = document.getElementById("pizza-link");
  const bowlLink = document.getElementById("bowl-link");
  const wingsLink = document.getElementById("wings-link");
  const drinksLink = document.getElementById("drinks-link");
  const desertsLink = document.getElementById("deserts-link");
  const bitesLink = document.getElementById("bites-link");
  const papadiaLink = document.getElementById("papadia-link");
  const sidesLink = document.getElementById("sides-link");

  const bonelessLink = document.getElementById("boneless");
  const traditionalLink = document.getElementById("traditional");

  const boneless = document.querySelector(".boneless");
  const traditional = document.querySelector(".traditional");

  const pizzas = document.querySelector(".pizzas");
  const bowls = document.querySelector(".bowls");
  const wings = document.querySelector(".wings");
  const drinks = document.querySelector(".drinks");
  const deserts = document.querySelector(".deserts");
  const bites = document.querySelector(".bites");
  const papadia = document.querySelector(".papadia");
  const sides = document.querySelector(".sides");

  const addButtons = document.querySelectorAll(".add-button");
  for (const addBtn of addButtons) {
    addBtn.addEventListener("click", (e) => {
      const pizzaItem = e.target.closest(".pizza-item");
      const pizzaSize = pizzaItem.querySelector('input[name="size"]:checked');
      if (!pizzaSize) {
        alert("Please, select the size");
        return;
      }
      const size = parseInt(pizzaSize.value);
      const id = pizzaItem.querySelector("input[name=pizzaId]").value;
      const name = pizzaItem.querySelector(".pizzaName").innerText;
      const img = pizzaItem.querySelector(".pizzaImg").src;
      const quantity = parseInt(
        pizzaItem.querySelector(".plus-mines-button > .value").innerText
      );
      const data = {
        id,
        name,
        img,
        size,
        quantity,
        toppings: [],
      };
      const cart = JSON.parse(localStorage.getItem("cart") ?? "[]");
      cart.push(data);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Your pizza has been added to cart");
    });
  }

  const sizeRadios = document.querySelectorAll(".radio-size");

  for (const sizeRadio of sizeRadios) {
    sizeRadio.addEventListener("click", (e) => {
      const customizeBtn =
        e.target.parentElement.parentElement.parentElement.querySelector(
          ".customize-btn"
        );
      setToCustomizeLink(customizeBtn, { size: e.target.value });
    });
  }

  const decreaseBtns = document.querySelectorAll(".decreaseBtn");
  const increaseBtns = document.querySelectorAll(".increaseBtn");
  for (const decreaseBtn of decreaseBtns) {
    decreaseBtn.addEventListener("click", (e) => {
      amountManiipulate(e.target, -1);
    });
  }
  for (const increaseBtn of increaseBtns) {
    increaseBtn.addEventListener("click", (e) => {
      amountManiipulate(e.target, 1);
    });
  }
  function amountManiipulate(e, delta) {
    const amountHidden = e
      .closest(".title")
      .querySelector('input[name="amount"]');
    const amountText = e.parentElement.querySelector(".value");
    const customizeBtn =
      e.parentElement.parentElement.querySelector(".customize-btn");
    const sum = parseInt(amountHidden.value) + delta;
    if (sum >= 0) {
      amountHidden.value = sum;
      amountText.innerText = sum;
      setToCustomizeLink(customizeBtn, { amount: sum });
    }
  }
  function setToCustomizeLink(linkElem, param) {
    if (!linkElem) return;
    const [left, params] = linkElem.href.split("?");
    const queryParams = new URLSearchParams(params);
    queryParams.set(Object.keys(param)[0], Object.values(param)[0]);
    linkElem.href = left + "?" + queryParams.toString();
  }
  bonelessLink.addEventListener("click", (e) => {
    e.preventDefault();

    traditional.style.display = "none";
    boneless.style.display = "flex";
    bonelessLink.style.border = "1px solid black";
    traditionalLink.style.border = "none";
  });

  traditionalLink.addEventListener("click", (e) => {
    e.preventDefault();

    boneless.style.display = "none";
    traditional.style.display = "flex";
    traditionalLink.style.border = "1px solid black";
    bonelessLink.style.border = "none";
  });

  pizzaLink.addEventListener("click", (e) => {
    e.preventDefault();

    bowls.style.display = "none";
    wings.style.display = "none";
    drinks.style.display = "none";
    deserts.style.display = "none";
    bites.style.display = "none";
    papadia.style.display = "none";
    sides.style.display = "none";

    pizzas.style.display = "flex";

    pizzaLink.style.border = "1px solid black";

    bowlLink.style.border = "none";
    wingsLink.style.border = "none";
    drinksLink.style.border = "none";
    desertsLink.style.border = "none";
    bitesLink.style.border = "none";
    papadiaLink.style.border = "none";
    sidesLink.style.border = "none";
  });

  bowlLink.addEventListener("click", (e) => {
    e.preventDefault();

    pizzas.style.display = "none";
    wings.style.display = "none";
    drinks.style.display = "none";
    deserts.style.display = "none";
    bites.style.display = "none";
    papadia.style.display = "none";
    sides.style.display = "none";

    bowls.style.display = "flex";

    pizzaLink.style.border = "none";
    bowlLink.style.border = "1px solid black";
  });

  wingsLink.addEventListener("click", (e) => {
    e.preventDefault();

    pizzas.style.display = "none";
    bowls.style.display = "none";
    drinks.style.display = "none";
    deserts.style.display = "none";
    bites.style.display = "none";
    papadia.style.display = "none";
    sides.style.display = "none";

    wings.style.display = "flex";

    pizzaLink.style.border = "none";
    bowlLink.style.border = "none";
    drinksLink.style.border = "none";
    wingsLink.style.border = "1px solid black";
  });

  drinksLink.addEventListener("click", (e) => {
    e.preventDefault();

    pizzas.style.display = "none";
    bowls.style.display = "none";
    wings.style.display = "none";
    deserts.style.display = "none";
    bites.style.display = "none";
    papadia.style.display = "none";
    sides.style.display = "none";

    drinks.style.display = "flex";

    pizzaLink.style.border = "none";
    bowlLink.style.border = "none";
    wingsLink.style.border = "none";
    desertsLink.style.border = "none";
    drinksLink.style.border = "1px solid black";
  });

  desertsLink.addEventListener("click", (e) => {
    e.preventDefault();

    pizzas.style.display = "none";
    bowls.style.display = "none";
    wings.style.display = "none";
    drinks.style.display = "none";
    bites.style.display = "none";
    papadia.style.display = "none";
    sides.style.display = "none";

    deserts.style.display = "flex";

    pizzaLink.style.border = "none";
    bowlLink.style.border = "none";
    wingsLink.style.border = "none";
    drinksLink.style.border = "none";
    bitesLink.style.border = "none";
    desertsLink.style.border = "1px solid black";
  });

  bitesLink.addEventListener("click", (e) => {
    e.preventDefault();

    pizzas.style.display = "none";
    bowls.style.display = "none";
    wings.style.display = "none";
    deserts.style.display = "none";
    papadia.style.display = "none";
    sides.style.display = "none";

    bites.style.display = "flex";

    pizzaLink.style.border = "none";
    bowlLink.style.border = "none";
    wingsLink.style.border = "none";
    drinksLink.style.border = "none";
    desertsLink.style.border = "none";
    papadiaLink.style.border = "none";
    bitesLink.style.border = "1px solid black";
  });

  papadiaLink.addEventListener("click", (e) => {
    e.preventDefault();

    pizzas.style.display = "none";
    bowls.style.display = "none";
    wings.style.display = "none";
    deserts.style.display = "none";
    drinks.style.display = "none";
    bites.style.display = "none";
    sides.style.display = "none";

    papadia.style.display = "flex";

    pizzaLink.style.border = "none";
    bowlLink.style.border = "none";
    wingsLink.style.border = "none";
    drinksLink.style.border = "none";
    desertsLink.style.border = "none";
    bitesLink.style.border = "none";
    sidesLink.style.border = "none";
    papadiaLink.style.border = "1px solid black";
  });

  sidesLink.addEventListener("click", (e) => {
    e.preventDefault();

    pizzas.style.display = "none";
    bowls.style.display = "none";
    wings.style.display = "none";
    deserts.style.display = "none";
    drinks.style.display = "none";
    bites.style.display = "none";
    papadia.style.display = "none";

    sides.style.display = "flex";

    pizzaLink.style.border = "none";
    bowlLink.style.border = "none";
    wingsLink.style.border = "none";
    drinksLink.style.border = "none";
    desertsLink.style.border = "none";
    bitesLink.style.border = "none";
    papadiaLink.style.border = "none";
    sidesLink.style.border = "1px solid black";
  });
});
