import {BackOffice} from "./backOfficeCreation";
import {updateProject} from "./backOfficeRestClient";

export function showEditProjectForm(backOfficeId: number): void {
    fetch(`/api/BackOfficeCreation/GetBackOfficeDetails/` + backOfficeId)
        .then(response => response.json())
        .then((backOffice: BackOffice) => {
            console.log(backOffice.name);
            const backOfficeContainer = document.getElementById('backoffice-container');
            if (backOfficeContainer) {
                backOfficeContainer.innerHTML = `
                    <h2 class="mt-4">Edit BackOffice</h2>
                    <form id="edit-backoffice-form">
                        <div class="mb-3">
                            <label for="backOfficeName" class="form-label">BackOffice Name</label>
                            <input type="text" class="form-control" id="backOfficeName" required value="${backOffice.name}">
                        </div>
                        <button type="submit" class="btn btn-primary">Update</button>
                        <button type="button" class="btn btn-secondary" id="cancel-button">Cancel</button>
                    </form>
                `;
                document.getElementById('cancel-button')?.addEventListener('click', loadBackOffices);
                document.getElementById('edit-backoffice-form')?.addEventListener('submit', function (event) {
                    event.preventDefault();
                    updateProject(backOfficeId);
                });
            }
        })
        .catch(error => console.error('Failed to fetch backoffice details:', error));
}

export function loadBackOffices() {
    window.location.reload();
}