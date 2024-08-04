// import { API_URL } from "../../config";
import swal from "sweetalert2";
import axiosInstance from "../../axios";
import { IForm } from "../../interface/form";
import { signUpSchema } from "../../schema/user";
import { validateForm } from "../../utils/validator";
import { config } from "../../config";

const loginForm = document.getElementById("login") as HTMLFormElement;
const signupForm = document.getElementById("signup") as HTMLFormElement;
const submitErrorArea = document.getElementById(
  "error_container",
) as HTMLDivElement;
const loginErrorArea = document.getElementById(
  "login_error_container",
) as HTMLDivElement;

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const target = event.target as HTMLFormElement;

  const loginData = {
    username: target.usernameLogin.value,
    password: target.passwordLogin.value,
  };

  try {
    const response = await axiosInstance.post("/auth/login", loginData);
    localStorage.setItem("accessToken", `${response.data.tokens.accessToken}`);

    window.location.href = `${config.API_URL}/src/pages/dashboard/index.html`;
  } catch (error: any) {
    displayErrors(error.response.data.message, loginErrorArea);
  }
});

signupForm.addEventListener("submit", async (event) => {
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
    await submitForm(formData);
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

async function submitForm(formData: IForm) {
  try {
    await axiosInstance.post("/auth/signup", formData);
    setTimeout(() => {
      window.location.href = `${config.API_URL}/src/pages/login/login.html`; // Replace with your desired redirect URL
    }, 2000);
    swal.fire({
      title: `Signed up successfully`,
      icon: "error",
      showCancelButton: true,
      timer: 1500,
    });
  } catch (error: any) {
    displayErrors(error.response.data.message, submitErrorArea);
  }
}
