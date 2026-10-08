let userList = JSON.parse(localStorage.getItem("userList")) || [];
let msg = document.getElementById("msg");
let editError = document.getElementById("edit-error");
let check = document.getElementById("username-and-password-empty");
let passMin = document.getElementById("password-min-length-error");

function hiddenError() {
  msg.classList.remove("show");
  editError.classList.add("hidden");
  check.classList.add("hidden");
  passMin.classList.add("hidden");
}
let form = document.getElementById("edit-user-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  hiddenError();
  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value.trim();
  if (username === "" || password === "") {
    msg.classList.add("show");
    editError.classList.remove("hidden");
    check.classList.remove("hidden");
    return;
  }
  if (password.length < 8) {
    msg.classList.add("show");
    editError.classList.remove("hidden");
    passMin.classList.remove("hidden");
    return;
  }
});
