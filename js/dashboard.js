// Lấy dữ liệu từ localStorage
let userList = JSON.parse(localStorage.getItem("userList")) || [];
// Lấy phần tử tbody của bảng
let tBody = document.getElementById("table-body");
console.log(tBody);
// Hàm để render bảng
function renderTable() {
  // Xóa nội dung hiện tại của tbody
  tBody.innerHTML = "";
  // Duyệt qua danh sách người dùng và tạo các hàng cho bảng
  userList.forEach((user) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.usercode}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>${user.birthday}</td>
      <td>${user.status}</td>
      <td>
        <button id="${user.usercode}" class="edit-btn" >Edit</button>
        <button id="${user.usercode}" class="delete-btn">Delete</button>
      </td>
    `;
    tBody.appendChild(row);
  });
}
// Gọi hàm renderTable để hiển thị bảng
renderTable();

tBody.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    let deleteUser = e.target.id;
    console.log(deleteUser);
    let deleteIndex = userList.findIndex(
      (user) => user.usercode === deleteUser,
    );
    console.log(deleteIndex);
    userList.splice(deleteIndex, 1);
    localStorage.setItem("userList", JSON.stringify(userList));
    renderTable();
  }
});

let searchBox = document.getElementById("search-box");
searchBox.addEventListener("input", function () {
  let searchName = searchBox.value.toLowerCase().trim();
  // Lọc user theo username
  let filteredUsers = userList.filter((user) =>
    user.username.toLowerCase().includes(searchName),
  );
  // Cập nhật bảng với danh sách đã lọc
  tBody.innerHTML = "";
  filteredUsers.forEach((user) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.usercode}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>${user.birthday}</td>
      <td>${user.status}</td>
      <td>
        <button id="${user.usercode}" class="edit-btn" >Edit</button>
        <button id="${user.usercode}" class="delete-btn">Delete</button>
      </td>
    `;
    tBody.appendChild(row);
  });
});
// Lấy phần tử nút edit
let editButtons = document.querySelectorAll(".edit-btn");
// Duyệt qua từng nút edit
editButtons.forEach((btn) => {
  btn.onclick = function () {
    let userCode = btn.getAttribute("id");
    // Lưu usercode vào localStorage
    localStorage.setItem("editUserCode", userCode);
    // Chuyển hướng đến trang edit.html
    window.location.href = "edit-user.html";
  };
});
