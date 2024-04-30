"use strict";
console.log("Supervisor script loaded");
const scriptElement = document.getElementById('supervisor-script');
const backOfficeId = scriptElement === null || scriptElement === void 0 ? void 0 : scriptElement.getAttribute('data-backoffice-id');
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.textContent && link.textContent.trim() === "Begeleiders") {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                loadSupervisors(Number(backOfficeId));
            });
        }
    });
});
function loadSupervisors(backofficeId) {
    console.log(backofficeId);
    fetch('/api/supervisors/Getsupervisors/' + backofficeId)
        .then(response => response.json())
        .then((supervisors) => {
        var _a;
        const projectsContainer = document.getElementById('projects-container');
        if (projectsContainer) {
            projectsContainer.innerHTML = `
                <h2>Begeleiders</h2>
                <div class="list-group">
                    ${supervisors.map(sup => `
                        <div href="#" class="list-group-item list-group-item-action">
                            <img src="${sup.imageUrl}" alt="${sup.email}" class="img-thumbnail">
                            ${sup.email} 
                        </div>
                    `).join('')}
                </div>
                <button id="add-supervisor-button" class="btn btn-primary">Add Begeleider</button>
                `;
            (_a = document.getElementById('add-supervisor-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', addSupervisor);
        }
    })
        .catch(error => console.error('Error loading supervisors:', error));
}
function addSupervisor() {
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        projectsContainer.innerHTML = `
            <h3>Add New Supervisor</h3>
            <form id="supervisorForm">
                <div class="form-group">
                    <label for="userName">Name:</label>
                    <input type="text" class="form-control" id="userName" name="userName" required>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" class="form-control" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" class="form-control" id="password" name="password" required>
                </div>
                <div class="form-group">
                    <label for="imageUrl">Image URL:</label>
                    <input type="text" class="form-control" id="imageUrl" name="imageUrl">
                </div>
                
                <button type="submit" class="btn btn-primary">Add Supervisor</button>
                <button type="button" class="btn btn-secondary" id="cancelButton">Cancel</button>
            </form>
        `;
        const form = document.getElementById("supervisorForm");
        if (form) {
            form.onsubmit = function (event) {
                event.preventDefault();
                submitSupervisorForm();
            };
        }
        else {
            console.error('The form element was not found in the DOM.');
        }
        const cancelButton = document.getElementById("cancelButton");
        if (cancelButton) {
            cancelButton.onclick = function () {
                if (backOfficeId) {
                    loadSupervisors(Number(backOfficeId));
                }
                else {
                    console.error('backOfficeId is not found or is invalid.');
                }
            };
        }
        else {
            console.error('The cancel button was not found in the DOM.');
        }
    }
    else {
        console.error('The projects container was not found in the DOM.');
    }
}
function submitSupervisorForm() {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const imageUrl = document.getElementById('imageUrl');
    fetch('/api/supervisors', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value,
            imageUrl: imageUrl.value,
            BackOfficeId: Number(backOfficeId)
        })
    })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        alert('Supervisor added successfully!');
        loadSupervisors(Number(backOfficeId));
    })
        .catch(error => {
        console.error('Error:', error);
        loadSupervisors(Number(backOfficeId));
    });
}
