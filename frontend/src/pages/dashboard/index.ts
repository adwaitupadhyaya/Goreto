import axiosInstance from "../../axios";
import Toastify from "toastify-js";
import { IItinerary } from "../../interface/itinerary";
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
const removeLocationButton = document.getElementById(
  "removeLocation",
) as HTMLButtonElement;
const createForm = document.getElementById("createForm") as HTMLFormElement;
const itinerariesContainer = document.getElementById(
  "itineraries__container",
) as HTMLDivElement;
import swal from "sweetalert2";
import { config } from "../../config";

try {
  const response = await axiosInstance.get("/users/me");
  userBreadcrumb.innerText = `Hello ${response.data.username}`;
} catch (error: any) {
  document.body.innerHTML = `${error.response.data.error}`;
}

logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = `${config.API_URL}`;
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

removeLocationButton.addEventListener("click", (e) => {
  e.preventDefault();

  const fieldToRemove = document.getElementById(
    `location${counter}`,
  ) as HTMLInputElement;

  fieldToRemove.remove();
  counter--;
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
  } catch (error: any) {
    swal.fire({
      title: `${error.response.data.error}`,
      icon: "error",
      showCancelButton: true,
      timer: 1500,
    });
  }
});

try {
  const response = await axiosInstance.get("/itineraries");
  let exploreCard = document.createElement("div");
  exploreCard.style.width = "100%";
  exploreCard.style.display = "flex";
  exploreCard.style.flexWrap = "wrap";
  exploreCard.innerHTML = ``;

  response.data.forEach((itinerary: IItinerary) => {
    exploreCard.innerHTML += `        
    <a href = "${config.API_URL}/src/pages/details/index.html?id=${itinerary.id}">

        <div
          class="relative flex flex-col mt-6 text-gray-700 bg-white bg-clip-border rounded-xl w-96"
        >
          <div
            class="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40"
          >
            <img
              src="${itinerary.photoUrl}"
              class="transition-transform duration-300 ease-in-out transform hover:scale-105"
            />
          </div>
          <div class="p-6">
            <h5
              class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900"
            >
              ${itinerary.title}
            </h5>
            <p
              class="block font-sans text-sm antialiased font-light leading-relaxed text-inherit mt-2 capitalize"
            >
              <i class="fa-solid fa-star"></i> &nbsp; ${itinerary.numberOfDays} days &nbsp;
              <i class="fa-solid fa-circle-dot"></i>&nbsp; ${itinerary.difficulty}
            </p>
          </div>
        </div>

    </a>
    
`;
  });
  itinerariesContainer.appendChild(exploreCard);
} catch (error: any) {
  swal.fire({
    title: `${error.response.data.error}`,
    icon: "error",
    showCancelButton: true,
    timer: 1500,
  });
}
