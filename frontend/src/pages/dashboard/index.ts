import axios from "axios";
import axiosInstance from "../../axios";
import Toastify from "toastify-js";
const userBreadcrumb = document.getElementById(
  "userBreadcrumb",
) as HTMLDivElement;
const logoutBtn = document.getElementById("logout-btn") as HTMLButtonElement;
const locationContainer = document.getElementById(
  "locations",
) as HTMLDivElement;
const addLocationButton = document.getElementById(
  "addLocation",
) as HTMLButtonElement;
const createForm = document.getElementById("createForm") as HTMLFormElement;

const accessToken = localStorage.getItem("accessToken");
const config = {
  headers: { Authorization: `Bearer ${accessToken}` },
};

axios
  .get("http://localhost:3000/users/me", config)
  .then((res) => {
    userBreadcrumb.innerText = `Hello ${res.data.username}`;
  })
  .catch((err) => {
    document.body.innerHTML = `${err.response.data.error}`;
  });

logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "http://localhost:5173/";
});

document.addEventListener("DOMContentLoaded", function () {
  const backdrop = document.querySelector("[data-dialog-backdrop]");
  const dialog = document.querySelector("[data-dialog]");

  if (backdrop && dialog) {
    backdrop.addEventListener("click", function (event) {
      if (event.target === backdrop) {
        backdrop.classList.remove("pointer-events-none", "opacity-0");
        backdrop.classList.add("opacity-100");
        setTimeout(() => {
          backdrop.classList.add("pointer-events-none", "opacity-0");
          backdrop.classList.remove("opacity-100");
        }, 300);
      }
    });
  }
});

let counter = 1;
addLocationButton?.addEventListener("click", (e) => {
  console.log("clicked");
  e.preventDefault();
  const newLocation = document.createElement("div");
  newLocation.style.width = "20%";
  newLocation.innerHTML = `
              <input
              required
                id="location${counter + 1}"
                type="text"
                name="title"
                 class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                 placeholder="Location Name"
              />
  `;
  counter++;

  locationContainer.appendChild(newLocation);
});

createForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const path: string[] = [];
  const target = e.target as HTMLFormElement;

  for (let i = 1; i <= counter; i++) {
    let location = target[`location${i}`].value;
    path.push(location);
  }

  const formData = {
    title: target.trekTitle.value,
    number_of_days: target.numberOfDays.value,
    difficulty: target.difficulty.value,
    description: target.description.value,
    path: path,
  };

  try {
    const response = await axiosInstance.post(
      "http://localhost:3000/itineraries",
      formData,
    );

    setTimeout(() => {
      window.location.reload();
    }, 2000);

    Toastify({
      text: `${response.data.message}`,
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
  } catch (error) {
    console.log(error);
  }
});
