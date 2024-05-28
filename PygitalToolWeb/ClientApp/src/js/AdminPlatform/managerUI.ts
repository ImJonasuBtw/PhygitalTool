import {fetchBackOffices, submitManagersForm, loadManagers} from "./managerRestClient";
import {Managers} from "./managers";

// Renders the list of managers with their details and an option to add a new manager.
export function renderManagers(managers: Managers[]): void {
    const backOfficeContainer = document.getElementById('backoffice-container');
    if (backOfficeContainer) {
        backOfficeContainer.innerHTML = `
            <h2>Beheerders</h2>
            <div class="list-group">
                ${managers.map(manager => `
                    <div href="#" class="list-group-item list-group-item-action">
                        <img src="${manager.imageUrl}" alt="${manager.email}" class="img-thumbnail">
                        ${manager.email} 
                    </div>
                `).join('')}
            </div>
            <button id="add-Manager-button" class="btn btn-primary">Beheerder Toevoegen</button>
        `;
        document.getElementById('add-Manager-button')?.addEventListener('click', addManager);
    }
}

// Renders a form to add a new manager and handles form submission.
export function addManager() {
    const backOfficeContainer = document.getElementById('backoffice-container');
    if (backOfficeContainer) {
        backOfficeContainer.innerHTML = `
            <h3>Voeg nieuwe begeleider toe</h3>
            <form id="managersForm" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="userName">Naam:</label>
                    <input type="text" class="form-control" id="userName" name="userName" required>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" class="form-control" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Wachtwoord:</label>
                    <input type="password" class="form-control" id="password" name="password" required>
                </div>
                <div class="form-group">
                    <label for="backoffice">Backoffice:</label>
                     <select class="form-control" id="backoffice" name="backoffice" required>
                    </select>
                </div>
            <div class="form-group">
                  <label for="file">Profielfoto:</label>
                  <input type="file" class="form-control" id="file" name="file" accept=".jpg,.jpeg,.png">
            </div>
                <button type="submit" class="btn btn-primary">Beheerder toevoegen</button>
                <button type="button" class="btn btn-secondary" id="cancelButton">Annuleer</button>
            </form>
        `;
        fetchBackOffices()
        const form = document.getElementById("managersForm");
        if (form) {
            form.onsubmit = async function (event) {
                event.preventDefault();
                await submitManagersForm();
            };
        } else {
            console.error('The form element was not found in the DOM.');
        }
        const cancelButton = document.getElementById("cancelButton");
        if (cancelButton) {
            cancelButton.onclick = async function () {
                await loadManagers();
            };
        } else {
            console.error('The cancel button was not found in the DOM.');
        }
    } else {
        console.error('The Backoffice container was not found in the DOM.');
    }
}