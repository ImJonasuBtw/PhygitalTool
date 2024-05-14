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
console.log("Managers script loaded");
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.textContent && link.textContent.trim() === "Beheerders") {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                loadManagers();
            });
        }
    });
});
function loadManagers() {
    fetch('/api/Managers/GetManagers/')
        .then(response => response.json())
        .then((managers) => {
        var _a;
        const backOfficeContainer = document.getElementById('backoffice-container');
        if (backOfficeContainer) {
            backOfficeContainer.innerHTML = `
                <h2>Beheerders</h2>
                <div class="list-group">
                    ${managers.map(sup => `
                        <div href="#" class="list-group-item list-group-item-action">
                            <img src="${sup.imageUrl}" alt="${sup.email}" class="img-thumbnail">
                            ${sup.email} 
                        </div>
                    `).join('')}
                </div>
                <button id="add-Manager-button" class="btn btn-primary">Beheerder Toevoegen</button>
                `;
            (_a = document.getElementById('add-Manager-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', addManager);
        }
    })
        .catch(error => console.error('Error loading managers:', error));
}
function addManager() {
    const backOfficeContainer = document.getElementById('backoffice-container');
    if (backOfficeContainer) {
        backOfficeContainer.innerHTML = `
            <h3>Voeg nieuwe begeleider toe</h3>
            <form id="managersForm" enctype="multipart/form-data">
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
                    <label for="backoffice">Backoffice:</label>
                     <select class="form-control" id="backoffice" name="backoffice" required>
                       
                    </select>
                </div>
            <div class="form-group">
                  <label for="file">Profile Image:</label>
                  <input type="file" class="form-control" id="file" name="file" accept=".jpg,.jpeg,.png">
            </div>

                
                <button type="submit" class="btn btn-primary">Beheerder toevoegen</button>
                <button type="button" class="btn btn-secondary" id="cancelButton">Annuleer</button>
            </form>
        `;
        fetchBackOffices();
        const form = document.getElementById("managersForm");
        if (form) {
            form.onsubmit = function (event) {
                return __awaiter(this, void 0, void 0, function* () {
                    event.preventDefault();
                    yield submitManagersForm();
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
                    loadManagers();
                }
                else {
                    console.error('managers is not found or is invalid.');
                }
            };
        }
        else {
            console.error('The cancel button was not found in the DOM.');
        }
    }
    else {
        console.error('The Backoffice container was not found in the DOM.');
    }
}
function submitManagersForm() {
    return __awaiter(this, void 0, void 0, function* () {
        const form = document.getElementById('managersForm');
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
            const backofficeId = Number(document.getElementById('backoffice').value);
            console.log(backofficeId);
            const Response = yield fetch('/api/Managers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email, password, imageUrl, userName,
                    backofficeId
                })
            });
            const data = yield Response.json();
            console.log('Success:', data);
            alert('Managers added successfully!');
            loadManagers();
        }
        catch (error) {
            console.error('Error:', error);
        }
    });
}
function fetchBackOffices() {
    fetch('api/Backoffice/GetBackoffices')
        .then(response => response.json())
        .then(data => {
        const backOfficeSelect = document.getElementById('backoffice');
        if (backOfficeSelect) {
            data.forEach((backOffice) => {
                const option = document.createElement('option');
                option.value = String(backOffice.backOfficeId);
                option.textContent = backOffice.name;
                backOfficeSelect.appendChild(option);
            });
        }
        else {
            console.error('The backoffice select element was not found in the DOM.');
        }
    })
        .catch(error => console.error('Error fetching backoffices:', error));
}
