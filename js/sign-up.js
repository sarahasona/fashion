var submitBtn = document.querySelector("#submitBtn");
var Name = document.querySelector("#name");
var email = document.querySelector("#email");
var password = document.querySelector("#password");
var password2 = document.querySelector("#password2");

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (Name.value && email.value && email.value && password2.value) {
    if (password.value === password2.value) {
      localStorage.setItem("userName", Name.value);
      localStorage.setItem("email", email.value);
      localStorage.setItem("password", password.value);
      submitBtn.setAttribute("disabled", true);
      setInterval(() => {
        window.location = "login.html";
      }, 3000);
    } else {
      alert("Pleaze check your password again!!");
    }
  } else {
    alert("plz enter required data");
  }
});
