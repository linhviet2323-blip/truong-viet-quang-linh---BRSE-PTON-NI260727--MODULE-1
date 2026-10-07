// Lấy tất cả phần tử cần dùng
let form = document.getElementById("sign-in-form");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let msg = document.getElementById("msg");
console.log(msg, form, emailInput, passwordInput);
let validation = document.getElementById("login-validation");
let passwordBlank = document.querySelector(".password-cannot-blank");
let emailBlank = document.querySelector(".email-cannot-blank");
let loginError = document.getElementById("login-error");
let toast = document.getElementById("login-toast");
let emailError = document.getElementById("email-error");
console.log(
  validation,
  passwordBlank,
  emailBlank,
  loginError,
  toast,
  emailError,
);

// Hàm ẩn lỗi
function hideError() {
  msg.classList.remove("show");
  validation.classList.add("hidden");
  passwordBlank.classList.add("hidden");
  emailBlank.classList.add("hidden");
  loginError.classList.add("hidden");
  toast.classList.add("hidden");
  emailError.classList.add("hidden");
}

// Kiểm tra email
function checkEmail() {
  let email = emailInput.value.trim();
  if (email === "") {
    msg.classList.add("show");
    validation.classList.remove("hidden");
    emailBlank.classList.remove("hidden");
    return false;
  }
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    msg.classList.add("show");
    validation.classList.remove("hidden");
    emailError.classList.remove("hidden");
    return false;
  }
  return true;
}
// Kiểm tra password
function checkPassword() {
  let password = passwordInput.value.trim();
  if (password === "") {
    msg.classList.add("show");
    validation.classList.remove("hidden");
    passwordBlank.classList.remove("hidden");
    return false;
  }
  return true;
}
let users = JSON.parse(localStorage.getItem("userList")) || [];
form.addEventListener("submit", function (e) {
  e.preventDefault();
  hideError();
  let isEmailValid = checkEmail();
  let isPasswordValid = checkPassword();
  if (isEmailValid && isPasswordValid) {
    // Kiểm tra thông tin đăng nhập
    let user = users.find(function (u) {
      return (
        u.email === emailInput.value.trim() &&
        u.password === passwordInput.value.trim()
      );
    });
    if (!user) {
      msg.classList.add("show");
      loginError.classList.remove("hidden");
      return;
    }
    localStorage.setItem("currentUser", JSON.stringify(user));
    toast.classList.remove("hidden");
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
      window.location.href = "dashboard.html";
    }, 1800);
  }
});
