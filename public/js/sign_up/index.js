document.addEventListener("DOMContentLoaded", function () {
  const togglePassword = document.getElementById("togglePassword");
  const password = document.getElementById("password");

  togglePassword.addEventListener("click", function () {
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    this.textContent = type === "password" ? "visibility" : "visibility_off";
  });
  const registrationForm = document.getElementById("registrationForm");
  const errorBlock = document.getElementById("errorBlock");

  registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const data = new URLSearchParams();

    for (const pair of new FormData(registrationForm))
      data.append(pair[0], pair[1]);

    fetch(registrationForm.action, {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          errorBlock.textContent = data.error;
          errorBlock.style.display = "block";
        } else {
          window.location.href = "/login";
        }
      })
      .catch((error) => console.error("Error:", error));
  });

  registrationForm.addEventListener("submit", function () {
    errorBlock.style.display = "none";
  });
});
