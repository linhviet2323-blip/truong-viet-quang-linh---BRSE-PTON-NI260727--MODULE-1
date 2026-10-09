// Lấy usercode trên local về
let userId = localStorage.getItem("editUserCode");
console.log(userId);
// Lấy danh sách userList
let userList = JSON.parse(localStorage.getItem("userList")) || [];
// Tìm user cần sửa
let user = userList.find((u) => u.usercode === userId);
// Đưa dữ liệu lên form
document.getElementById("user-code").value = user.usercode;
document.getElementById("username").value = user.username;
document.getElementById("email").value = user.email;
document.getElementById("password").value = user.password;
document.getElementById("role").value = user.role;
document.getElementById("dob").value = user.birthday;
document.querySelector('input[name="status"]:checked').value = user.status;
document.querySelector(".description-text-input").value = user.description;
// Lấy các lỗi sang
let msg = document.getElementById("msg");
let editError = document.getElementById("edit-error");
let check = document.getElementById("username-and-password-empty");
let passMin = document.getElementById("password-min-length-error");
// Ân lỗi
function hiddenError() {
  msg.classList.remove("show");
  editError.classList.add("hidden");
  check.classList.add("hidden");
  passMin.classList.add("hidden");
}
// Kiểm tra userName
function checkUserName() {
  let username = document.getElementById("username").value.trim();
  if (username === "") {
    msg.classList.add("show");
    editError.classList.remove("hidden");
    check.classList.remove("hidden");
    return false;
  }
  return true;
}
// Kiểm tra Pass
function checkPass() {
  let password = document.getElementById("password").value.trim();
  if (password === "") {
    msg.classList.add("show");
    editError.classList.remove("hidden");
    check.classList.remove("hidden");
    return false;
  }
  if (password.length < 8) {
    msg.classList.add("show");
    editError.classList.remove("hidden");
    passMin.classList.remove("hidden");
    return false;
  }
  return true;
}
// lấy dữ liệu form sang
let form = document.getElementById("edit-user-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  hiddenError();
  let okUserName = checkUserName();
  let okPass = checkPass();
  if (!okUserName || !okPass) {
    return;
  }
  // Tìm vị trí user cần sửa
  let index = userList.findIndex((u) => u.usercode === userId);
  // Lấy dữ liệu mới
  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value.trim();
  let role = document.getElementById("role").value;
  let birthday = document.getElementById("dob").value;
  let status = document.querySelector('input[name="status"]:checked').value;
  let description = document.querySelector(".description-text-input").value;
  // Thay dữ liệu mới vào
  if (okUserName && okPass) {
    userList[index].username = username;
    userList[index].password = password;
    userList[index].role = role;
    userList[index].birthday = birthday;
    userList[index].status = status;
    userList[index].description = description;
    // Lưu lại vào Local
    localStorage.setItem("userList", JSON.stringify(userList));
    alert("Sửa thông tin thành công");
    window.location.href = "dashboard.html";
  }
});
let backBtn = document.getElementById("back-btn");
backBtn.addEventListener("click", function () {
  window.location.href = "dashboard.html";
});
