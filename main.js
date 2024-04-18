let url = "http://localhost:8000/users"

function getUser () {
    fetch(url)
    .then(response => {
        return response.json()
    })
    .then(data => {
        let tableBody = document.querySelector('#table tbody')
        tableBody.innerHTML = "";
        data.forEach(user => {
            let row = document.createElement('tr')
            row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.website}</td>
            <td><button class="delBtn" onclick="deleteUser(${user.id})" data-id="${user.id}">Delete</button></td>
            `
            tableBody.appendChild(row);
        })
    })
    .catch(error => {
        alert("Ошибка", error)
    })
}



function delUser (userId) {
    const {id} = userId.target.dataset
    fetch(`${url}/${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if(response.ok) {
        getUser()
        } else {
            alert("Ошибка" + response.status)
        }
    })
    .catch(error => {
        alert("Ошибка", error)
    })

}

getUser()