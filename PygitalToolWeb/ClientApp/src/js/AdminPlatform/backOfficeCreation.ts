import {Modal} from "bootstrap";
import {showEditProjectForm, deleteBackOffice} from "./backOfficeUpdateDelete";

export class BackOffice {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }
}

document.getElementById('add-project-button')?.addEventListener('click', () => {
    console.log('Add backoffice button has been pressed!');
    const projectsContainer = document.getElementById('backoffice-container');
    if (projectsContainer) {
        projectsContainer.innerHTML = `
            <h2 class="mt-4">Add New BackOffice</h2>
            <form id="new-project-form">
                <div class="mb-3">
                    <label for="backOfficeNameInput" class="form-label">BackOffice Name</label>
                    <input type="text" class="form-control" id="backOfficeNameInput" required>
                </div>
                <button type="submit" class="btn btn-primary">Add BackOffice</button>
                <button type="button" class="btn btn-secondary" id="cancel-button">Cancel</button>
            </form>
        `;

        const scriptElement = document.getElementById('backoffice-script');
        const adminPlatformId = document.getElementById('add-project-button')?.getAttribute('data-adminplatform-id');
        console.log(adminPlatformId);

        document.getElementById('cancel-button')?.addEventListener('click', loadProjects);
        document.getElementById('new-project-form')?.addEventListener('submit', async function (event) {
            event.preventDefault();
            const backOfficeNameInput = document.getElementById('backOfficeNameInput') as HTMLInputElement;
            if (!backOfficeNameInput) return;

            const backOfficeName = backOfficeNameInput.value;
            const newBackOffice = new BackOffice(backOfficeName);

            const response = await fetch('/api/BackOfficeCreation/AddBackOffice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Name: newBackOffice.name,
                    AdminPlatformId: adminPlatformId
                })
            });

            if (response.ok) {
                loadProjects();
            } else {
                if (response.status === 400) {
                    const errorData = await response.json();
                    if (errorData && errorData.errors) {
                        for (const key in errorData.errors) {
                            if (errorData.errors.hasOwnProperty(key)) {
                                const errorMessage = errorData.errors[key];
                                alert(errorMessage);
                            }
                        }
                    } else {
                        alert('Validation error occurred.');
                    }
                } else {
                    response.text().then(text => alert('Failed to add BackOffice: ' + text));
                }
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const confirmationModal = document.getElementById('confirmationModal');
    confirmationModal?.addEventListener('show.bs.modal', (event: any) => {
        const button = event.relatedTarget as HTMLElement;
        const backOfficeId = button.getAttribute('data-backoffice-id');
        const confirmDeleteButton = document.getElementById('delete-confirm') as HTMLButtonElement;

        console.log("Modal shown, backOffice ID:", backOfficeId);

        confirmDeleteButton.onclick = () => {
            if (backOfficeId) {
                deleteBackOffice(parseInt(backOfficeId));
                const modalInstance = Modal.getInstance(confirmationModal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }
        };
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const backOfficeContainer = document.getElementById('backoffice-container');
    if (backOfficeContainer) {
        backOfficeContainer.addEventListener('click', event => {
            const target = event.target as HTMLElement;
            const isEditButton = target.closest('.edit-project-button');
            if (isEditButton) {
                const backOfficeId = isEditButton.getAttribute('data-backoffice-id');
                if (backOfficeId) {
                    showEditProjectForm(parseInt(backOfficeId));
                }
            }
        });
    }
});

export function loadProjects() {
    window.location.reload();
}


