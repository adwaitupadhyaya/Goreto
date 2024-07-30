import axiosInstance from "../../axios";
import { IItinerary } from "../../interface/itinerary";
import swal from "sweetalert2";

const exploreWrapper = document.getElementById(
  "explore__wrapper",
) as HTMLDivElement;

const profileHeaderElement = document.getElementById(
  "profileHeader",
) as HTMLDivElement;
const profileDetailsElement = document.getElementById(
  "profileDetails",
) as HTMLDivElement;

// form elements
const firstName = document.getElementById("firstName") as HTMLInputElement;
const lastName = document.getElementById("lastName") as HTMLInputElement;
const username = document.getElementById("username") as HTMLInputElement;
const email = document.getElementById("email") as HTMLInputElement;

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

try {
  const userDetails = await axiosInstance.get("/users/me");
  console.log(userDetails);
  firstName.value = userDetails.data.first_name;
  lastName.value = userDetails.data.last_name;
  username.value = userDetails.data.username;
  email.value = userDetails.data.email;

  profileHeaderElement.innerHTML = `
                <div class="profile__header--img h-44 w-44">
          <img
            class="h-full w-full rounded-full object-cover"
            src="${userDetails.data.profile_picture}"
            alt=""
          />
        </div>
        <span
          class="profile__header--username flex items-center text-xl font-bold"
          >${userDetails.data.username}</span
        >
  `;
  profileDetailsElement.innerHTML = `
          <span class="p-1 font-sans text-lg">${userDetails.data.first_name} ${userDetails.data.last_name}</span>
        <span class="text-md p-1 font-sans text-gray-500">${userDetails.data.email}</span>
  `;

  const userItineraries = await axiosInstance.get("/itineraries/getByUserss");
  userItineraries.data.forEach((itinerary: IItinerary) => {
    const exploreCard = document.createElement("div");

    exploreCard.innerHTML = `
      <a href = "http://localhost:5173/src/pages/details/index.html?id=${itinerary.id}">

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
    exploreWrapper.appendChild(exploreCard);
  });
} catch (error) {
  document.body.innerHTML = `Unauthorized`;
}

const logoutBtn = document.getElementById("logout-btn") as HTMLButtonElement;
logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "http://localhost:5173/";
});

const updateForm = document.getElementById("update") as HTMLFormElement;
updateForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const updateFormData = {
    firstName: firstName.value,
    lastName: lastName.value,
    username: username.value,
    email: email.value,
  };

  try {
    const response = await axiosInstance.put("/users", updateFormData);

    swal.fire({
      title: `${response.data.message}`,
      icon: "success",
      showCancelButton: true,
    });

    setTimeout(() => {
      window.location.reload();
    }, 3000);
  } catch (error) {
    console.log(error);
  }
});
