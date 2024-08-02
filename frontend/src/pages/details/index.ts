import axios from "axios";
import { Accordion } from "../../utils/accordion";
import axiosInstance from "../../axios";
import { IReview } from "../../interface/review";
import { getTimeAgo } from "../../utils/getTimeAgo";
import swal from "sweetalert2";
import { IUser } from "../../interface/user";
import emailjs from "@emailjs/browser";
// import { Accordion } from "../../utils/accordion";
const searchParams = new URLSearchParams(window.location.search);
const loader = document.querySelector(".loader") as HTMLDivElement;
const detailsContainer = document.querySelector(
  ".details__container",
) as HTMLDivElement;
const loginButtons = document.getElementById("loginButtons") as HTMLDivElement;

const accessToken = localStorage.getItem("accessToken");
const config = {
  headers: { Authorization: `Bearer ${accessToken}` },
};

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
    itineraryDetails.innerHTML = /*HTML*/ `      
    <div class="itinerary_image flex flex-col items-center relative w-8/12">
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
              <i class="fa-solid fa-clock text-[#075755] "></i> &nbsp;
              Days:</span
            >
            ${itineraryInfo[0].numberOfDays}
          </p>
          <p>
            <span class="font-extrabold  text">
              <i class="fa-solid fa-star text-[#075755]"></i> &nbsp;
              Rating:</span
            >
            ${itineraryInfo[0].averageRating.toPrecision(3)}
          </p>
          </div>

          <div class="formWrapper flex gap-10 absolute">
          <form id="shareForm" class="flex flex-col self-end bg-gray-200 w-52 p-3 mt-5 rounded-md">

          
          <label for="shareUsername" class="flex justify-between">
          <span>
          Share to: 
          </span>
          <button type="submit">
          <i class="fa-regular fa-paper-plane"></i>
          </button>
          </label>
            <input id="shareUsername" type="text" placeholder="Search user" class="p-2 rounded-md">

          
            </form>
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
  .catch((error) => {
    swal.fire({
      title: `${error.response.data.error}`,
      icon: "error",
      showCancelButton: true,
      timer: 1500,
    });
  });

try {
  const response = await axiosInstance.get(`/itineraries/${id}/reviews`);
  const reviewItem = document.createElement("div");
  reviewItem.style.display = "flex";
  reviewItem.style.flexDirection = "column";
  reviewItem.style.gap = "8px";
  reviewItem.innerHTML = `
  <h1 class="font-bold text-xl -mt-5 ">Reviews</h1>
  <form method="post" id="reviewForm">
    <input type="text" placeholder="Give a review" class="p-3 rounded-md mb-3" id="reviewText" />

    <div class = "flex justify-between">
    <div> 
    <label class="mt-3" for="cars">Give a rating :</label>
    <select id="rating" name="cars" class="rounded-md p-2">
    <option></option>
    <option value="0.5">0.5</option>
    <option value="1">1</option>
    <option value="1.5">1.5</option>
    <option value="2">2</option>
    <option value="2.5">2.5</option>
    <option value="3">3</option>
    <option value="3.5">3.5</option>
    <option value="4">4</option>
    <option value="4.5">4.5</option>    
    <option value="5">5</option>
    </select>
    </div>
    <button class="w-1/6 cursor-pointer select-none rounded-lg bg-[#075755] px-4 py-2 text-center align-middle font-sans text-xs uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block type="submit">Submit</button>
    </div>
    
  </form>
  `;
  reviewItem.style.width = "65%";
  response.data.forEach((review: IReview) => {
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
        <img class="w-10 h-10 me-4 rounded-full object-cover" src="${review.profilePicture}" alt="">
        <div class="font-medium">
            <p>${review.username}</p>
            <p>${ratings} </p>
        </div>
    </div>
    <div class="flex flex-col items-start mb-1 space-x-1 rtl:space-x-reverse justify-start">
        <h3 class="ms-2 text-sm font-semibold text-gray-900 dark:text-white">${review.content}</h3>
        <h3 class="text-gray-700 text-xs mt-2">${ago}</h3>       
    </div>
  
</article>
`;
    detailsContainer?.appendChild(reviewItem);
  });
} catch (error: any) {
  swal.fire({
    title: `${error.response.data.error}`,
    icon: "error",
    showCancelButton: true,
    timer: 1500,
  });
}
let currentUser: string;
// form section
try {
  const data = await axiosInstance.get("users/me", config);
  currentUser = data.data.username;
  loginButtons.innerHTML = `
  <button onclick="history.back()" class="cursor-pointer select-none rounded-lg bg-[#075755] px-4 py-2 text-center align-middle font-sans text-xs uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block">Back</button>
  `;
} catch (error) {
  const reviewInput = document.getElementById("reviewText") as HTMLInputElement;
  const reviewRating = document.getElementById("rating") as HTMLSelectElement;
  reviewInput.disabled = true;
  reviewRating.disabled = true;
}

const reviewForm = document.getElementById("reviewForm") as HTMLFormElement;
reviewForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const target = e.target as HTMLFormElement;
  const reviewFormData = {
    content: target.reviewText.value,
    rating: target.rating.value,
  };

  try {
    await axiosInstance.post(`/itineraries/${id}/reviews`, reviewFormData);

    swal.fire({
      title: "Reviewed Succesfully",
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
});

// share form section
const shareForm = document.getElementById("shareForm") as HTMLFormElement;
const shareSearch = document.getElementById(
  "shareUsername",
) as HTMLInputElement;

const usersSearchResult = document.createElement("div");
shareSearch.addEventListener("input", async (event) => {
  const target = event.target as HTMLInputElement;
  usersSearchResult.innerHTML = ``;
  if (target.value) {
    try {
      const data = await axiosInstance.get(`/users?name=${target.value}`);
      data.data.forEach((element: IUser) => {
        const userInfo = document.createElement("div") as HTMLDivElement;
        userInfo.innerHTML = /*HTML*/ `
          <div class="user-option bg-white p-1 cursor-pointer hover:bg-gray-300 transition-all mt-4 rounded-sm text-sm">${element.username} <span class="text-xs text-gray-600">(${element.email})</span>  </div>
        `;
        usersSearchResult.appendChild(userInfo);

        userInfo.addEventListener("click", (event) => {
          const clickedElement = event.target as HTMLElement;
          const username = element.username;
          shareSearch.value = username;
          usersSearchResult.innerHTML = ""; // Clear the search results
        });
      });
    } catch (error: any) {
      swal.fire({
        title: `${error.response.data.error}`,
        icon: "error",
        showCancelButton: true,
        timer: 1500,
      });
    }
  } else {
    usersSearchResult.innerHTML = "";
  }

  shareForm.appendChild(usersSearchResult);
});

shareForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const target = event.target as HTMLFormElement;
  const recipientUser = target.shareUsername.value;

  try {
    const data = await axiosInstance.get(`/users?name=${recipientUser}`);
    const destinationEmail = data.data[0].email;

    // EmailJS configuration
    const serviceID = "service_ef7qh7i";
    const templateID = "template_74wh7fd";
    const userID = "RdzxzoqmlBUcFRBdk";

    const templateParams = {
      to_email: destinationEmail,
      from_name: currentUser,
      to_name: recipientUser,
      message: `${currentUser} thinks you might enjoy this itinerary. Check it out!`,
      itinerary_link: window.location.href,
    };

    emailjs.send(serviceID, templateID, templateParams, userID).then(
      (response) => {
        swal.fire({
          title: "Itinerary Shared Successfully",
          text: `An email has been sent to ${recipientUser} (${destinationEmail})`,
          icon: "success",
          timer: 2000,
        });
      },
      (error) => {
        swal.fire({
          title: "Error Sharing Itinerary",
          text: "There was a problem sending the email. Please try again later.",
          icon: "error",
          timer: 2000,
        });
      },
    );
  } catch (error) {
    swal.fire({
      title: "Error Sharing Itinerary",
      text: "User not found or an error occurred.",
      icon: "error",
      timer: 2000,
    });
  }
});
