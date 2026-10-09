let userList = JSON.parse(localStorage.getItem("userList")) || [];
// Lấy các phần tử
let msg = document.getElementById("msg");
let addError = document.getElementById("add-error");
let check = document.getElementById("email-username-password-empty");
let emailExist = document.getElementById("email-exist");
let emailError = document.getElementById("email-error");
let passMin = document.getElementById("password-min-length-error");
let passNumber = document.getElementById("password-number-required-error");
let passUpperLower = document.getElementById(
  "password-uppercase-lowercase-error",
);
let roleError = document.getElementById("role-not-admin");
// Hàm ẩn lỗi
function hideError() {
  msg.classList.remove("show");
  addError.classList.add("hidden");
  emailExist.classList.add("hidden");
  emailError.classList.add("hidden");
  passMin.classList.add("hidden");
  passNumber.classList.add("hidden");
  passUpperLower.classList.add("hidden");
  roleError.classList.add("hidden");
  check.classList.add("hidden");
}

let form = document.getElementById("add-new-user-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  hideError();
  let username = document.getElementById("username").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let role = document.getElementById("role").value;
  let birthday = document.getElementById("dob").value;
  let status = document.querySelector('input[name="status"]:checked').value;
  let description = document.getElementById("description").value;
  if (username === "" || email === "" || password === "") {
    msg.classList.add("show");
    addError.classList.remove("hidden");
    check.classList.remove("hidden");
    return;
  }
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    msg.classList.add("show");
    addError.classList.remove("hidden");
    emailError.classList.remove("hidden");
    return;
  }
  if (password.length < 8) {
    msg.classList.add("show");
    addError.classList.remove("hidden");
    passMin.classList.remove("hidden");
    return;
  }
  // Tao một đối tượng user mới
  let newUser = {
    usercode: `U${userList.length + 1}`,
    username: username,
    email: email,
    password: password,
    role: role,
    birthday: birthday,
    status: status,
    description: description,
  };

  // Đưa đối tượng mới vào trong dashboard
  userList.push(newUser);
  // Lưu vào localStorage
  localStorage.setItem("userList", JSON.stringify(userList));
  // Chuyển hướng quay lại use management
  window.location.href = "dashboard.html";
});
let backBtn = document.getElementById("back-btn");
backBtn.addEventListener("click", function () {
  window.location.href = "dashboard.html";
});
