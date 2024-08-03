import axiosInstance from "../../axios";
import { IItinerary } from "../../interface/itinerary";
import swal from "sweetalert2";

const exploreWrapper = document.getElementById(
  "explore__wrapper",
) as HTMLDivElement;
const profileHeaderElement = document.getElementById(
  "profileHeader",
) as HTMLDivElement;

const updateFormData = {
  title: document.getElementById("trekTitle") as HTMLInputElement,
  numberOfDays: document.getElementById("numberOfDays") as HTMLInputElement,
  difficulty: document.getElementById("difficulty") as HTMLInputElement,
  description: document.getElementById("description") as HTMLInputElement,
};
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
  firstName.value = userDetails.data.firstName;
  lastName.value = userDetails.data.lastName;
  username.value = userDetails.data.username;
  email.value = userDetails.data.email;

  profileHeaderElement.innerHTML = `
                <div class="profile__header--img h-44 w-44">
          <img
            class="h-full w-full rounded-full object-cover"
            src="${userDetails.data.profilePicture}"
            alt=""
          />
        </div>
        <div>
          <p class="profile__header--username flex items-center text-xl font-bold">${userDetails.data.username}</p>
          <p class="p-1 font-sans text-lg">${userDetails.data.firstName} ${userDetails.data.lastName}</p>
          <p class="text-md p-1 font-sans text-gray-500">${userDetails.data.email}</p>
        </div>

              
  `;
  const userItineraries = await axiosInstance.get("/itineraries/getByUserss");
  userItineraries.data.forEach((itinerary: IItinerary) => {
    const exploreCard = document.createElement("div");
    exploreCard.style.position = "relative";

    exploreCard.innerHTML = /*HTML*/ `
          <div
            class="relative flex flex-col mt-6 text-gray-700 bg-white bg-clip-border rounded-xl w-96"
          >
            <div
              class="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40"
            >
                 <a href = "http://localhost:5173/src/pages/details/index.html?id=${itinerary.id}">
              <img
                src="${itinerary.photoUrl}"
                class="transition-transform duration-300 ease-in-out transform hover:scale-105"
              />
                    </a>
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
                <button class="p-3 self-end" data-dialog-target="dialog-lg-${itinerary.id}" id="dialog-lg-${itinerary.id}">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
              </p>
            </div>
          </div>
  `;

    exploreWrapper.appendChild(exploreCard);

    const updateButton = document.getElementById(
      `dialog-lg-${itinerary.id}`,
    ) as HTMLButtonElement;
    const updateModal = document.getElementById(
      `updateModal`,
    ) as HTMLDivElement;
    const closeModal = document.getElementById(
      "closeModal",
    ) as HTMLButtonElement;

    closeModal.addEventListener("click", () => {
      updateModal.classList.remove("flex");
      updateModal.classList.add("hidden");
    });

    updateButton.addEventListener("click", async () => {
      updateModal.classList.remove("hidden");
      updateModal.classList.add("flex");

      try {
        const data = await axiosInstance.get(`/itineraries/${itinerary.id}`);
        updateFormData.description.value = data.data[0].description;
        updateFormData.numberOfDays.value = data.data[0].numberOfDays;
        updateFormData.title.value = data.data[0].title;
        updateFormData.difficulty.value = data.data[0].difficulty;

        // update itineraries section
        const updateItinerary = document.getElementById(
          "updateForm",
        ) as HTMLFormElement;

        updateItinerary.addEventListener("submit", async (event) => {
          event.preventDefault();
          const target = event.target as HTMLFormElement;

          const formData = {
            title: target.trekTitle.value,
            numberOfDays: target.numberOfDays.value,
            description: target.description.value,
            difficulty: target.difficulty.value,
          };
          updateFunction(formData, itinerary.id);
        });
      } catch (error: any) {
        swal.fire({
          title: `${error.response.data.error}`,
          icon: "error",
          showCancelButton: true,
          timer: 1500,
        });
      }
    });
  });
} catch (error: any) {
  swal.fire({
    title: `${error.response.data.error}`,
    icon: "error",
    showCancelButton: true,
    timer: 1500,
  });

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
  } catch (error: any) {
    swal.fire({
      title: `${error.response.data.error}`,
      icon: "error",
      showCancelButton: true,
      timer: 1500,
    });
  }
});

async function updateFunction(
  formData: {
    title: string;
    numberOfDays: number;
    description: string;
    difficulty: string;
  },
  id: string,
) {
  try {
    const data = await axiosInstance.put(`/itineraries/${id}`, formData);

    swal.fire({
      title: `${data.data.message}`,
      icon: "success",
      showCancelButton: true,
    });

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } catch (error: any) {
    swal.fire({
      title: `${error.response.data.error}`,
      icon: "error",
      showCancelButton: true,
      timer: 1500,
    });
  }
}
