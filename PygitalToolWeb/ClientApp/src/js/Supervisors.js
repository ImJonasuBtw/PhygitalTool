"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
            <form id="supervisorForm" enctype="multipart/form-data">
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
                  <label for="file">Profile Image:</label>
                  <input type="file" class="form-control" id="file" name="file" accept=".jpg,.jpeg,.png">
            </div>

                
                <button type="submit" class="btn btn-primary">Add Supervisor</button>
                <button type="button" class="btn btn-secondary" id="cancelButton">Cancel</button>
            </form>
        `;
        const form = document.getElementById("supervisorForm");
        if (form) {
            form.onsubmit = function (event) {
                return __awaiter(this, void 0, void 0, function* () {
                    event.preventDefault();
                    yield submitSupervisorForm();
                });
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
    return __awaiter(this, void 0, void 0, function* () {
        const form = document.getElementById('supervisorForm');
        const formData = new FormData(form);
        try {
            const fileResponse = yield fetch('/api/files/uploadFile', {
                method: 'POST',
                body: formData
            });
            const fileResult = yield fileResponse.json();
            const imageUrl = fileResult.url;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const userName = document.getElementById('userName').value;
            const supervisorResponse = yield fetch('/api/supervisors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email, password, imageUrl, userName,
                    BackOfficeId: Number(backOfficeId)
                })
            });
            const data = yield supervisorResponse.json();
            console.log('Success:', data);
            alert('Supervisor added successfully!');
            loadSupervisors(Number(backOfficeId));
        }
        catch (error) {
            console.error('Error:', error);
        }
    });
}
