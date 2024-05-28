import {Modal} from "bootstrap";
import {
    loadBackOffices,
    renderAddBackOfficeForm,
} from "./backoffice-ui"
import {deleteBackOffice, handleFormSubmit, setupBackofficeEditForm} from "./backoffice-restclient";

export class BackOffice {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }
}

//Sets up event listeners for adding a new project in a backoffice context.
function setupAddBackofficeButton() {
    document.getElementById('add-project-button')?.addEventListener('click', () => {
        const backofficeContainer = document.getElementById('backoffice-container');
        if (backofficeContainer) {
            renderAddBackOfficeForm(backofficeContainer);

            const adminPlatformId = document.getElementById('add-project-button')?.getAttribute('data-adminplatform-id');
            console.log(adminPlatformId);

            document.getElementById('cancel-button')?.addEventListener('click', loadBackOffices);
            document.getElementById('new-project-form')?.addEventListener('submit', function (event) {
                event.preventDefault();
                (async () => {
                    await handleFormSubmit(adminPlatformId);
                })();
            });
        }
    });
}


// Sets up the confirmation modal to delete a backoffice entry when confirmed.
function setupConfirmationModal() {
    const confirmationModal = document.getElementById('confirmationModal');
    confirmationModal?.addEventListener('show.bs.modal', (event: any) => {
        const button = event.relatedTarget as HTMLElement;
        const backOfficeId = button.getAttribute('data-backoffice-id');
        const confirmDeleteButton = document.getElementById('delete-confirm') as HTMLButtonElement;
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
}

// Adds click event listener to handle edit button clicks for backoffice projects.
function setupBackOfficeContainer() {
    const backOfficeContainer = document.getElementById('backoffice-container');
    if (backOfficeContainer) {
        backOfficeContainer.addEventListener('click', event => {
            const target = event.target as HTMLElement;
            const isEditButton = target.closest('.edit-project-button');
            if (isEditButton) {
                const backOfficeId = isEditButton.getAttribute('data-backoffice-id');
                if (backOfficeId) {
                    setupBackofficeEditForm(parseInt(backOfficeId));
                }
            }
        });
    }
}

// Initializes event listeners for backoffice functionalities.
export function initializeEventListenersBackoffice() {
    setupAddBackofficeButton();
    setupConfirmationModal();
    setupBackOfficeContainer();
}



