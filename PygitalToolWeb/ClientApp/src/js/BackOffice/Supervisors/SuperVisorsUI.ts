import {loadSupervisors, submitSupervisorForm} from "./SupervisorsRestClient";
import {backOfficeId} from "./Supervisors";

export function addSupervisor() {
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

