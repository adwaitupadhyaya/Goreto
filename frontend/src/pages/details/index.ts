import axios from "axios";
import { Accordion } from "../../utils/accordion";
import axiosInstance from "../../axios";
import { IReview } from "../../interface/review";
import { getTimeAgo } from "../../utils/getTimeAgo";
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
      <div class="itinerary_details w-8/12 bg-white p-5 rounded-md">
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
    paths.classList.add("rounded-md");
    paths.style.width = "63.3%";
    paths.style.backgroundColor = "white";
    paths.style.paddingLeft = "30px";
    paths.style.marginBottom = "30px";
    let day = 1;
    for (const path of itineraryInfo) {
      const accordionItem = document.createElement("div");
      accordionItem.className = "accordion-item mb-2 w-1/2 rounded-md";
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
    new Accordion("myAccordion");
  })
  .catch((err) => {
    console.log(err);
  });

try {
  const response = await axiosInstance.get(`/itineraries/${id}/reviews`);
  const reviewItem = document.createElement("div");
  reviewItem.style.display = "flex";
  reviewItem.style.flexDirection = "column";
  reviewItem.style.gap = "8px";
  reviewItem.innerHTML = `
  <h1 class="font-bold text-xl -mt-5 ">Reviews</h1>
  `;
  reviewItem.style.width = "65%";
  response.data.forEach((review: IReview) => {
    console.log(review);
    let ratings: string = "";
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(review.rating)) {
        ratings += `<i class="fa-solid fa-star"></i> &nbsp;`;
      } else if (i === Math.floor(review.rating) && review.rating % 1 >= 0.5) {
        ratings += `<i class="fa-solid fa-star-half-stroke"></i> &nbsp;`;
      } else {
        ratings += `<i class="fa-regular fa-star"></i> &nbsp;`;
      }
    }

    const ago = getTimeAgo(review.createdAt);

    reviewItem.innerHTML += `<article class="bg-white w-full  p-3 rounded-md">
    <div class="flex items-center mb-4">
        <img class="w-10 h-10 me-4 rounded-full" src="${review.profilePicture}" alt="">
        <div class="font-medium">
            <p>${review.username}</p>
            <p>${ratings} </p>
        </div>
    </div>
    <div class="flex flex-col items-start mb-1 space-x-1 rtl:space-x-reverse justify-start">
        <h3 class="ms-2 text-sm font-semibold text-gray-900 dark:text-white">${review.content}</h3>
        <h3 class="text-gray-700 text-xs">${ago}</h3>       
    </div>
  
</article>
`;
    detailsContainer?.appendChild(reviewItem);
  });
} catch (error) {
  console.log(error);
}
