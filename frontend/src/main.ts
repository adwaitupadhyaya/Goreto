import axios from "axios";

axios.get("http://localhost:3000/itineraries").then((response) => {
  response.data.forEach((itinerary) => {
    console.log(itinerary);
  });
});
