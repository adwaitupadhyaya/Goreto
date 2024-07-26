import axios from "axios";
import { Accordion } from "../../utils/accordion";
// import { Accordion } from "../../utils/accordion";
const searchParams = new URLSearchParams(window.location.search);
const loader = document.querySelector(".loader") as HTMLDivElement;
const detailsContainer = document.querySelector(".details__container");

setTimeout(() => {
  loader.style.display = "none";
}, 1000);

const id = searchParams.toString().split("=")[1];

axios
  .get(`http://localhost:3000/itineraries/${id}`)
  .then((res) => {
    const itineraryInfo = res.data;
    const itineraryDetails = document.createElement("div");
    itineraryDetails.style.display = "flex";
    itineraryDetails.style.flexDirection = "column";
    itineraryDetails.style.justifyContent = "center";
    itineraryDetails.style.alignItems = "center";
    itineraryDetails.style.width = "95%";
    itineraryDetails.innerHTML = `      <div class="itinerary_image flex flex-col items-center relative w-8/12">
        <img
          class="w-full rounded-md h-[400px] object-cover"
          src="${itineraryInfo[0].photoUrl}"
          alt=""
        />
        <h1
          class="absolute text-3xl text-white font-extrabold top-1/2 left-1/2 translate-x-[-50%]"
        >
          ${itineraryInfo[0].title}
        </h1>
      </div>
      <div class="itinerary_details w-8/12 bg-white p-10">
        <div class="facts flex gap-10">
          <p class="capitalize">
            <span class="font-extrabold">
              <i class="fa-solid fa-triangle-exclamation text-[#075755]"></i>
              &nbsp; Difficulty:</span
            >
            ${itineraryInfo[0].difficulty}
          </p>
          <p>
            <span class="font-extrabold">
              <i class="fa-solid fa-clock text-[#075755]"></i> &nbsp;
              Days:</span
            >
            ${itineraryInfo[0].numberOfDays}
          </p>
          <p>
            <span class="font-extrabold  text">
              <i class="fa-solid fa-star text-[#075755]"></i> &nbsp;
              Rating:</span
            >
            4.5
          </p>
        </div>
        <p class="font-bold text-xl mt-8 ">Description</p>
        <p class="text-gray-700 text-justify">
          ${itineraryInfo[0].description}
        </p>
        <p class="font-bold text-xl mt-8 ">Path</p>
      </div>`;
    const paths = document.createElement("div");
    paths.id = "myAccordion";
    paths.style.width = "63.3%";
    paths.style.backgroundColor = "white";
    paths.style.paddingLeft = "30px";
    paths.style.marginBottom = "30px";
    let day = 1;
    for (const path of itineraryInfo) {
      const accordionItem = document.createElement("div");
      accordionItem.className = "accordion-item mb-4 w-1/2";
      accordionItem.innerHTML = `
        <div class="accordion-header cursor-pointer bg-gray-200 p-2 rounded flex justify-between">
        <p>
        Day ${day}: ${path.locationName}
        </p>
        <i class="fa-solid fa-arrow-down"></i>
        </div>
        <div class="accordion-content bg-white">
          <p>Information about ${path.locationName} here</p>
        </div>
      `;
      paths.appendChild(accordionItem);
      day++;
    }

    detailsContainer?.appendChild(itineraryDetails);
    detailsContainer?.appendChild(paths);

    // Initialize the accordion after adding it to the DOM
    const accordion = new Accordion("myAccordion");
    // accordion.init();
  })
  .catch((err) => {
    console.log(err);
  });
