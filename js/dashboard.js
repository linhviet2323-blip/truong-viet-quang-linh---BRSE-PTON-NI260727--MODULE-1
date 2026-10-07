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
// Hiển thị số trang tương ứng 5 đối tượng trên mỗi trang
let currentPage = 1; // Biến để lưu trang hiện tại
let perPage = 5; // Số đối tượng trên mỗi trang
// Hàm để tính tổng số trang
function getTotalPages() {
  return Math.ceil(userList.length / perPage);
}
// Hàm để hiển thị các đối tượng trên trang hiện tại
function renderPage(page) {
  tBody.innerHTML = "";

  let start = (page - 1) * perPage;
  let end = start + perPage;

  let usersToShow = userList.slice(start, end);

  usersToShow.forEach((user) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.usercode}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>${user.birthday}</td>
      <td>${user.status}</td>
      <td>
        <button data-id="${user.usercode}" class="edit-btn">Edit</button>
        <button data-id="${user.usercode}" class="delete-btn">Delete</button>
      </td>
    `;
    tBody.appendChild(row);
  });
}
// Điều hướng <- và -> giữa các trang
function renderPagination() {
  // Lấy các phần tử nút điều hướng
  let prevBtn = document.querySelector(".arrow-left");
  let nextBtn = document.querySelector(".arrow-right");
  // Lấy tổng số trang
  let totalPages = getTotalPages();
  // Nếu currentPage vượt quá tổng trang (ví dụ sau khi xóa user)
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }
  // Nút <- (prevBtn)
  prevBtn.onclick = function () {
    if (currentPage > 1) {
      currentPage--;
      renderPage(currentPage);
      renderPagination();
    }
  };
  // Nút -> (nextBtn)
  nextBtn.onclick = function () {
    if (currentPage < totalPages) {
      currentPage++;
      renderPage(currentPage);
      renderPagination();
    }
  };
}
renderPage(currentPage);
renderPagination();

// Lấy phần tử nút edit
let editButtons = document.querySelectorAll(".edit-btn");
// Duyệt qua từng nút edit
editButtons.forEach((btn) => {
  btn.onclick = function () {
    let usercode = btn.getAttribute("id");
    // Lưu usercode vào localStorage
    localStorage.setItem("editUserCode", usercode);
    // Chuyển hướng đến trang edit.html
    window.location.href = "edit-user.html";
  };
});
