let userList = JSON.parse(localStorage.getItem("userList")) || [];

let tBody = document.getElementById("table-body");
console.log(tBody);

function renderTable() {
  tBody.innerHTML = "";
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

renderTable();

let editButtons = document.querySelectorAll(".edit-btn");
