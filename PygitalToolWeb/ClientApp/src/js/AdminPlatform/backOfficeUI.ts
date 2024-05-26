import {BackOffice} from "./backOfficeCreation";

export function renderEditBackOfficeForm(container: { innerHTML: string; }, backOffice: BackOffice) {
    container.innerHTML = `
                    <h2 class="mt-4">Edit BackOffice</h2>
                    <form id="edit-backoffice-form">
                        <div class="mb-3">
                            <label for="backOfficeName" class="form-label">BackOffice Naam</label>
                            <input type="text" class="form-control" id="backOfficeName" required value="${backOffice.name}">
                        </div>
                        <button type="submit" class="btn btn-primary">Update</button>
                        <button type="button" class="btn btn-secondary" id="cancel-button">Annuleer</button>
                    </form>
                `;
}

export function renderAddBackOfficeForm(container: { innerHTML: string; }) {
    container.innerHTML = `
        <h2 class="mt-4">voeg nieuwe backOffice toe</h2>
        <form id="new-project-form">
            <div class="mb-3">
                <label for="backOfficeNameInput" class="form-label">BackOffice Naam</label>
                <input type="text" class="form-control" id="backOfficeNameInput" required>
            </div>
            <button type="submit" class="btn btn-primary">Voeg toe</button>
            <button type="button" class="btn btn-secondary" id="cancel-button">Annuleer</button>
        </form>
    `;
}

export function loadBackOffices() {
    window.location.reload();
}