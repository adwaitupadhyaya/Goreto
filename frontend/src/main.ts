import axios from "axios";
// import axiosInstance from "./axios";
import { IItinerary } from "./interface/itinerary";
import axiosInstance from "./axios";
import swal from "sweetalert2";

const exploreWrapper = document.getElementById(
  "explore__wrapper",
) as HTMLDivElement;
const filter = document.getElementById("filter-by") as HTMLSelectElement;

const searchForm = document.getElementById("searchForm") as HTMLFormElement;

axios.get("http://localhost:3000/itineraries").then((response) => {
  response.data.forEach((itinerary: IItinerary) => {
    const exploreCard = document.createElement("div");
    exploreCard.innerHTML = `        
    <a href = "./src/pages/details/index.html?id=${itinerary.id}">

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
              <i class="fa-solid fa-star"></i> &nbsp; ${itinerary.averageRating} &nbsp;
              <i class="fa-solid fa-circle-dot"></i>&nbsp; ${itinerary.difficulty} &nbsp;
              <i class="fa-solid fa-clock"></i>&nbsp; ${itinerary.numberOfDays} Days
            </p>
          </div>
        </div>

    </a>
    
`;
    exploreWrapper.appendChild(exploreCard);
  });
});

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  exploreWrapper.innerHTML = ``;
  const target = event.target as HTMLFormElement;
  const searchQuery: string = target.searchbar.value;

  try {
    const data = await axiosInstance.get(`/itineraries?title=${searchQuery}`);
    data.data.forEach((itinerary: IItinerary) => {
      const exploreCard = document.createElement("div");
      exploreCard.innerHTML = /*HTML*/ `        
        <a href = "./src/pages/details/index.html?id=${itinerary.id}">
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
              <i class="fa-solid fa-star"></i> &nbsp; ${itinerary.averageRating} &nbsp;
              <i class="fa-solid fa-circle-dot"></i>&nbsp; ${itinerary.difficulty} &nbsp;
              <i class="fa-solid fa-clock"></i>&nbsp; ${itinerary.numberOfDays} Days
            </p>
          </div>
        </div>

    </a>
    
`;
      exploreWrapper.appendChild(exploreCard);
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

filter.addEventListener("change", async (event) => {
  exploreWrapper.innerHTML = ``;
  const target = event.target as HTMLSelectElement;

  try {
    const data = await axiosInstance.get(`/itineraries?filter=${target.value}`);
    data.data.forEach((itinerary: IItinerary) => {
      const exploreCard = document.createElement("div");

      exploreCard.innerHTML = /*HTML*/ `        
        <a href = "./src/pages/details/index.html?id=${itinerary.id}">
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
              <i class="fa-solid fa-star"></i> &nbsp; ${itinerary.averageRating} &nbsp;
              <i class="fa-solid fa-circle-dot"></i>&nbsp; ${itinerary.difficulty} &nbsp;
              <i class="fa-solid fa-clock"></i>&nbsp; ${itinerary.numberOfDays} Days
            </p>
          </div>
        </div>

    </a>
    
`;
      exploreWrapper.appendChild(exploreCard);
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
