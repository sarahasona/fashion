var submitBtn = document.querySelector("#submitBtn");
var email = document.querySelector("#email");
var password = document.querySelector("#password");
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  var getEmail = localStorage.getItem("email");
  var getPassword = localStorage.getItem("password");
  if (email.value == "" || password.value == "") {
    alert("enter required data");
  } else if (
    email.value &&
    email.value.trim() == getEmail &&
    password.value &&
    password.value.trim() == getPassword
  ) {
    submitBtn.setAttribute("disabled", true);
    setInterval(() => {
      window.location = "index.html";
    }, 1500);
  } else {
    alert("Error in password or email");
  }
  // trim email & password
});
