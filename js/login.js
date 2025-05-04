const form = document.querySelector(".form-container");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const inputUsername = document.querySelector("#username");
  const inputPassword = document.querySelector("#user-password");

  const formData = {
    username: inputUsername.value,
    password: inputPassword.value,
  };

  const response = await login(formData);

  if (response?.isValidate) {
    window.localStorage.setItem("token", response.token);
    window.location.href = "./admin.html";
  } else {
    messageError(response?.message);
  }
});

//Funcion que maneja el mensaje de error
function messageError(message) {
  const divMessageError = document.querySelector(".error-message");
  divMessageError.textContent = message;
  setTimeout(() => {
    divMessageError.textContent = "";
  }, 4000);
}

async function login(formData) {
  try {
    const data = await fetch("http://localhost:5008/auth/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData),
    });
    const responseError = {
      isValidate: false,
      message: "Usuario o Contraseña incorrecta",
      token: "",
    };

    if (!data.ok) {
      return responseError;
    } else {
      response = await data.json();
      return { isValidate: true, message: "Exitoso", token: response.token };
    }
  } catch (e) {
    return responseError;
  }
}
