const form = document.querySelector(".form-container");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  const { isValidate, message } = await login(false);
  console.log(isValidate);
  if (isValidate) {    
    window.location.href = "./admin.html";
  } else {
    messageError(message);
  }
});
//Funcion que maneja el mensaje de error
function messageError(message) {
  const divMessageError = document.querySelector(".error-message");
  console.log(message);
  divMessageError.textContent = message;
  setTimeout(() => {
    divMessageError.textContent = '';
  }, 4000);
}

async function login(isValidate) {
  return isValidate
    ? { isValidate , message: "Exitoso" }
    : {
        isValidate,
        message: "El usuario o la contraseña es incorrecto",
      };
}
