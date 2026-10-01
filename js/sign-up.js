// Lấy tất cả phần tử cần dùng

let form = document.getElementById("sign-up-form");
let emailInput = document.getElementById("email");
let usernameInput = document.getElementById("username");
let passwordInput = document.getElementById("password");
console.log(form, emailInput, usernameInput, passwordInput);
let msg = document.getElementById("msg");
let validation = document.getElementById("sign-up-validation");
let emailBlank = document.querySelector(".email-cannot-blank");
let usernameBlank = document.querySelector(".username-cannot-blank");
let passwordBlank = document.querySelector(".password-cannot-blank");
let toast = document.getElementById("sign-up-toast");
console.log(validation, emailBlank, usernameBlank, passwordBlank, toast, msg);
let emailExist = document.querySelector(".email-exist");
let emailError = document.querySelector(".email-error");
let passMin = document.querySelector(".password-min-length-error");
let passNumber = document.querySelector(".password-number-required-error");
let passUpperLower = document.querySelector(
  ".password-uppercase-lowercase-error",
);
let signupError = document.getElementById("sign-up-error");
console.log(emailExist, emailError, passMin, passNumber, passUpperLower);
console.log(signupError);

// Hàm ẩn lỗi
function hideError() {
  msg.classList.remove("show");

  validation.classList.add("hidden");
  emailBlank.classList.add("hidden");
  usernameBlank.classList.add("hidden");
  passwordBlank.classList.add("hidden");

  toast.classList.add("hidden");

  emailError.classList.add("hidden");
  emailExist.classList.add("hidden");
  passMin.classList.add("hidden");
  passNumber.classList.add("hidden");
  passUpperLower.classList.add("hidden");

  signupError.classList.add("hidden");
}

// Kiểm tra email
function checkEmail() {
  let email = emailInput.value.trim();
  if (email === "") {
    hideError();
    msg.classList.add("show");
    validation.classList.remove("hidden");
    emailBlank.classList.remove("hidden");
    return false;
  }
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    hideError();
    msg.classList.add("show");
    validation.classList.remove("hidden");
    emailError.classList.remove("hidden");
    return false;
  }
  return true;
}
// Kiem tra userName
function checkUserName() {
  let username = usernameInput.value.trim();
  if (username === "") {
    hideError();
    msg.classList.add("show");
    validation.classList.remove("hidden");
    usernameBlank.classList.remove("hidden");
    return false;
  }
  return true;
}
// Kiem tra passWord
function checkPassWord() {
  let password = passwordInput.value.trim();
  if (password === "") {
    hideError();
    msg.classList.add("show");
    validation.classList.remove("hidden");
    passwordBlank.classList.remove("hidden");
    return false;
  }
  if (password.length < 8) {
    hideError();
    msg.classList.add("show");
    validation.classList.remove("hidden");
    passMin.classList.remove("hidden");
    return false;
  }
  let hasUpper = /[A-Z]/;
  let hasLower = /[a-z]/;
  let hasNumber = /\d/;

  if (
    !hasUpper.test(password) ||
    !hasLower.test(password) ||
    !hasNumber.test(password)
  ) {
    hideError();
    msg.classList.add("show");
    validation.classList.remove("hidden");
    passUpperLower.classList.remove("hidden");
    return false;
  }

  return true;
}
// Hien thi toast
function showToast() {
  toast.classList.remove("hidden");
  toast.classList.add("show");
  // An toast sau roi chuyen trang
  setTimeout(() => {
    toast.classList.remove("show");
    window.location.href = "sign-in.html";
  }, 1000);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let okEmail = checkEmail();
  let okUser = checkUserName();
  let okPass = checkPassWord();
  if (okEmail && okUser && okPass) {
    console.log("Submit thanh cong");
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let newUser = {
      email: emailInput.value.trim(),
      username: usernameInput.value.trim(),
      password: passwordInput.value.trim(),
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    showToast();
  }
});
