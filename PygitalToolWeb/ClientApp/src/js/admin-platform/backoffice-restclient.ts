import {loadBackOffices, renderEditBackOfficeForm} from "./backoffice-ui";
import {BackOffice} from "./backoffice-creation";
import {handleErrorResponse} from "./backoffice-validation";

// Updates the backoffice with the provided ID using the input value.
export async function updateBackoffice(backOfficeId: number): Promise<void> {
    const backOfficeNameInput = document.getElementById('backOfficeName') as HTMLInputElement;
    if (!backOfficeNameInput) return;

    try {
        const response = await fetch(`/api/BackOfficeCreation/UpdateBackOffice/${backOfficeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: backOfficeNameInput.value
            })
        });

        if (response.ok) {
            console.log('BackOffice updated successfully');
            loadBackOffices();
        } else {
            await handleErrorResponse(response);
        }
    } catch (error: any) {
        alert('Mislukt bij het bijwerken van BackOffice: ' + error.message);
    }
}

// Deletes the backoffice with the provided ID and reloads the backoffices list.
export function deleteBackOffice(backOfficeId: number) {
    fetch(`/api/BackOfficeCreation/DeleteBackOffice/` + backOfficeId, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            loadBackOffices();
        } else {
            return response.text().then(text => Promise.reject(text));
        }
    })
}

// Sets up the form for editing the backoffice with the provided ID.
export function setupBackofficeEditForm(backOfficeId: number): void {
    fetch(`/api/BackOfficeCreation/GetBackOfficeDetails/` + backOfficeId)
        .then(response => response.json())
        .then((backOffice: BackOffice) => {
            console.log(backOffice.name);
            const backOfficeContainer = document.getElementById('backoffice-container');
            if (backOfficeContainer) {
                renderEditBackOfficeForm(backOfficeContainer, backOffice);
                document.getElementById('cancel-button')?.addEventListener('click', loadBackOffices);
                document.getElementById('edit-backoffice-form')?.addEventListener('submit', function (event) {
                    event.preventDefault();
                    (async () => {
                        await updateBackoffice(backOfficeId);
                    })();
                });
            }
        })
        .catch(error => console.error('Failed to fetch backoffice details:', error));
}

// Handles the submission of a form to add a new backoffice, using the provided admin platform ID if available.
export async function handleFormSubmit(adminPlatformId: string | null | undefined) {
    const backOfficeNameInput = document.getElementById('backOfficeNameInput') as HTMLInputElement;
    if (!backOfficeNameInput) return;

    const backOfficeName = backOfficeNameInput.value;
    const newBackOffice = new BackOffice(backOfficeName);

    try {
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
            loadBackOffices();
        } else {
            await handleErrorResponse(response);
        }
    } catch (error: any) {
        alert('Er is een fout opgetreden bij het toevoegen van de BackOffice: ' + error.message);
    }
}

