import {BackOffice} from "./backoffice-creation";

// Renders the form to edit a backoffice with the provided data into the specified container's inner HTML.
export function renderEditBackOfficeForm(container: { innerHTML: string; }, backOffice: BackOffice) {
    container.innerHTML = `
                    <h2 class="mt-4">Edit BackOffice</h2>
                    <form id="edit-backoffice-form">
                        <div class="mb-3">
                            <label for="backOfficeName" class="form-label">BackOffice naam</label>
                            <input type="text" class="form-control" id="backOfficeName" required value="${backOffice.name}">
                        </div>
                        <button type="submit" class="btn btn-primary">Update</button>
                        <button type="button" class="btn btn-secondary" id="cancel-button">Annuleer</button>
                    </form>
                `;
}

// Renders the form to add a new backoffice into the specified container's inner HTML.
export function renderAddBackOfficeForm(container: { innerHTML: string; }) {
    container.innerHTML = `
        <h2 class="mt-4">voeg nieuwe backoffice toe</h2>
        <form id="new-project-form">
            <div class="mb-3">
                <label for="backOfficeNameInput" class="form-label">Backoffice naam</label>
                <input type="text" class="form-control" id="backOfficeNameInput" required>
            </div>
            <button type="submit" class="btn btn-primary">Voeg toe</button>
            <button type="button" class="btn btn-secondary" id="cancel-button">Annuleer</button>
        </form>
    `;
}

// Reloads the backoffice page.
export function loadBackOffices() {
    window.location.reload();
}