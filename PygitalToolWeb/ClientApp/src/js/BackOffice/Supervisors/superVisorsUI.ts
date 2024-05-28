import {loadSupervisors, submitSupervisorForm} from "./supervisorsRestClient";
import {backOfficeId, Supervisor} from "./supervisors";

// Shows the add supervisor form.
export function addSupervisor() {
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        projectsContainer.innerHTML = `
            <h3>Nieuwe supervisor toevoegen</h3>
            <form id="supervisorForm" enctype="multipart/form-data">
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
                  <label for="file">Profielfoto:</label>
                  <input type="file" class="form-control" id="file" name="file" accept=".jpg,.jpeg,.png">
            </div>

                
                <button type="submit" class="btn btn-primary">Voeg begeleider toe</button>
                <button type="button" class="btn btn-secondary" id="cancelButton">annuleer</button>
            </form>
        `;

        const form = document.getElementById("supervisorForm");
        if (form) {
            form.onsubmit = async function (event) {
                event.preventDefault();
                await submitSupervisorForm();
            };
        } else {
            console.error('The form element was not found in the DOM.');
        }

        const cancelButton = document.getElementById("cancelButton");
        if (cancelButton) {
            cancelButton.onclick = function () {
                if (backOfficeId) {
                    loadSupervisors(Number(backOfficeId));
                } else {
                    console.error('backOfficeId is not found or is invalid.');
                }
            };
        } else {
            console.error('The cancel button was not found in the DOM.');
        }
    } else {
        console.error('The projects container was not found in the DOM.');
    }
}

// Takes an array of Supervisor objects as input and renders them as a list of supervisors in the HTML element with the id "projects-container"
export function renderSupervisors(supervisors: Supervisor[]): void {
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
                <button id="add-supervisor-button" class="btn btn-primary">Voeg Begeleider toe</button>
                `;

        document.getElementById('add-supervisor-button')?.addEventListener('click', addSupervisor);
    }
}
