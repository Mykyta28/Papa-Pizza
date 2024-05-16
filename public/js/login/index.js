document.addEventListener("DOMContentLoaded", function () {
  const togglePassword = document.getElementById("togglePassword");
  const password = document.getElementById("password");

  togglePassword.addEventListener("click", function () {
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    this.textContent = type === "password" ? "visibility" : "visibility_off";
  });
  const loginForm = document.getElementById("loginForm");
  const errorBlock = document.getElementById("errorBlock");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const data = new URLSearchParams();

    for (const pair of new FormData(loginForm)) {
      data.append(pair[0], pair[1]);
    }

    fetch(loginForm.action, {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          errorBlock.textContent = data.error;
          errorBlock.style.display = "block";
        } else {
          window.location.href = "/";
        }
      })
      .catch((error) => console.error("Error:", error));
  });

  loginForm.addEventListener("submit", function () {
    errorBlock.style.display = "none";
  });
});
