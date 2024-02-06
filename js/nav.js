const userName = localStorage.getItem("userName");
const mainNav = document.querySelectorAll(".main-nav");
const loginNav = document.querySelector(".log-nav");
const getUserName = document.querySelector(".username");
const logOut = document.querySelector(".logout");
if (userName) {
  loginNav.setAttribute("style", "display:none!important");
  mainNav.forEach((item) => {
    item.setAttribute("style", "display:flex!important");
  });
  getUserName.innerHTML += userName;
} else {
  loginNav.setAttribute("style", "display:flex!important");
  mainNav.forEach((item) => {
    item.setAttribute("style", "display:none!important");
  });
}
logOut.addEventListener("click", function () {
  localStorage.removeItem("userName");
  setTimeout(() => {
    window.location = "login.html";
  }, 1000);
});
