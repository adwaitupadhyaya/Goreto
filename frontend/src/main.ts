import axios from "axios";
import { IItinerary } from "./interface/itinerary";

const exploreWrapper = document.getElementById(
  "explore__wrapper"
) as HTMLDivElement;

axios.get("http://localhost:3000/itineraries").then((response) => {
  response.data.forEach((itinerary: IItinerary) => {
    const exploreCard = document.createElement("div");
    exploreCard.innerHTML = `        <div
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
              class="block font-sans text-base antialiased font-light leading-relaxed text-inherit"
            >
              ${itinerary.description}
            </p>
            <p
              class="block font-sans text-sm antialiased font-light leading-relaxed text-inherit mt-2"
            >
              <i class="fa-solid fa-star"></i> &nbsp; ${itinerary.numberOfDays} days &nbsp;
              <i class="fa-solid fa-circle-dot"></i>&nbsp; ${itinerary.difficulty}
            </p>
          </div>
        </div>`;

    exploreWrapper.appendChild(exploreCard);
  });
});
