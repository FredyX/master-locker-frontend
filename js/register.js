const formContainer = document.querySelector(".form-container");

formContainer.addEventListener("submit", async (event) => {
  event.preventDefault();
  const { isValid, message } = validateInpust();

  if (!isValid) {
    messageError(message);
  } else {
    const values = getValuesForm();
    const { pass1, pass2, ...res } = values;
    const formData = { password: pass1, ...res };
    const {status, message} = await registerAccount(formData);
    console.log(status);
    if(status){
        alert('Cuenta creada con exito');
        window.location.href = "./login.html"
    }
  }
});

function validateInpust() {
  const valid = { isValid: true, message: "sucessful" };
  const values = getValuesForm();

  if (values.pass1 != values.pass2) {
    valid.isValid = false;
    valid.message = "Las contraseñas no coinciden";

    return valid;
  }
  return valid;
}

function getValuesForm() {
  const { value: name } = document.querySelector("#input-name");
  const { value: lastName } = document.querySelector("#input-lastname");
  const { value: dni } = document.querySelector("#input-dni");
  const { value: phone } = document.querySelector("#input-phone");
  const { value: country } = document.querySelector("#input-country");
  const { value: department } = document.querySelector("#input-department");
  const { value: municipality } = document.querySelector("#input-municipio");
  const { value: address } = document.querySelector("#input-address");
  const { value: email } = document.querySelector("#input-email");
  const { value: pass1 } = document.querySelector("#input-password-1");
  const { value: pass2 } = document.querySelector("#input-password-2");
  return {
    name,
    lastName,
    dni,
    phone,
    country,
    department,
    municipality,
    address,
    email,
    pass1,
    pass2,
  };
}

function messageError(message) {
  const divMessageError = document.querySelectorAll(".error-message");
  for (const element of divMessageError) {
    element.textContent = message;
    setTimeout(() => {
      element.textContent = "";
    }, 3000);
  }
}

async function registerAccount(formData) {
  try {
    const response = await fetch("http://localhost:5008/auth/register", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data =  await response.json();
    console.log(data.errors);
    if(response.ok){
        return {status: true, message:'Cuenta creada correctamente'};
    }   
    
    return {status: false, message:'Cuenta creada correctamente'} 
  } catch (e) {
    console.log(e);
  }
}
