// import { API_URL } from "../../config";
import { IForm } from "../../interface/form";
import { signUpSchema } from "../../schema/user";
import { validateForm } from "../../utils/validator";
import axios from "axios";
import Toastify from "toastify-js";

const loginForm = document.getElementById("login") as HTMLFormElement;
const signupForm = document.getElementById("signup") as HTMLFormElement;
const submitErrorArea = document.getElementById(
  "error_container"
) as HTMLDivElement;
const loginErrorArea = document.getElementById(
  "login_error_container"
) as HTMLDivElement;

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const target = event.target as HTMLFormElement;

  const loginData = {
    username: target.usernameLogin.value,
    password: target.passwordLogin.value,
  };

  axios
    .post("http://localhost:3000/auth/login", loginData)
    .then((response) => {
      localStorage.setItem(
        "accessToken",
        `${response.data.tokens.accessToken}`
      );

      window.location.href =
        "http://localhost:5173/src/pages/dashboard/index.html";
    })
    .catch((error) => {
      displayErrors(error.response.data.message, loginErrorArea);
    });
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const target = event.target as HTMLFormElement;

  const formData = {
    first_name: target.firstName.value,
    last_name: target.lastName.value,
    username: target.username.value,
    email: target.email.value,
    password: target.password.value,
  };

  const errors = validateForm(formData, signUpSchema);

  if (errors) {
    displayErrors(errors[0].message, submitErrorArea);
  } else {
    submitForm(formData);
  }
});

function displayErrors(errorMessage: string, errorDisplayArea: HTMLDivElement) {
  errorDisplayArea.innerHTML = "";
  const error = document.createElement("p");
  error.innerHTML = "";
  error.innerText = errorMessage;
  error.style.color = "#FF3333";
  errorDisplayArea.appendChild(error);
}

function submitForm(formData: IForm) {
  axios
    .post(`http://localhost:3000/auth/signup`, formData)
    .then((response) => {
      setTimeout(() => {
        window.location.href =
          "http://localhost:5173/src/pages/login/login.html"; // Replace with your desired redirect URL
      }, 3000);
      Toastify({
        text: `Signed up succesfully`,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#6bc070",
          color: "white",
          padding: "10px",
          zIndex: "99",
          position: "absolute",
          left: "10px",
        },
      }).showToast();
    })
    .catch((error) => {
      displayErrors(error.response.data.message, submitErrorArea);
    });
}
