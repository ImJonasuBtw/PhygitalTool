import {Modal} from "bootstrap";
import {
    loadBackOffices,
    renderAddBackOfficeForm,
} from "./backOfficeUI"
import {deleteBackOffice, handleFormSubmit, setupBackofficeEditForm} from "./backOfficeRestClient";

export class BackOffice {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }
}

function setupAddBackofficeButton() {
    document.getElementById('add-project-button')?.addEventListener('click', () => {
        console.log('Add backoffice button has been pressed!');
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


function setupConfirmationModal() {
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
}


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


export function initializeEventListenersBackoffice() {
    setupAddBackofficeButton();
    setupConfirmationModal();
    setupBackOfficeContainer();
}



