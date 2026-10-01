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
      <td>${user.actions}</td>
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
// Lấy tất cả các nút edit, delete và checkbox
let editButtons = document.querySelectorAll(".edit-btn");
let deleteButtons = document.querySelectorAll(".delete-btn");
let checkboxes = document.querySelectorAll(".checkbox");
