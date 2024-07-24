import axios from "axios";

const userBreadcrumb = document.getElementById(
  "userBreadcrumb"
) as HTMLDivElement;
const logoutBtn = document.getElementById("logout-btn") as HTMLButtonElement;

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
    document.body.innerHTML = "Forbidden Page";
  });

logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "http://localhost:5173/";
});
