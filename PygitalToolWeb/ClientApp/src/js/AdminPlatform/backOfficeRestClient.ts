import {loadBackOffices, renderEditBackOfficeForm} from "./backOfficeUI";
import {BackOffice} from "./backOfficeCreation";
import {handleErrorResponse} from "./backOfficeValidation";

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
        console.error('Error updating backoffice:', error);
        alert('Mislukt bij het bijwerken van BackOffice: ' + error.message);
    }
}

export function deleteBackOffice(backOfficeId: number) {
    fetch(`/api/BackOfficeCreation/DeleteBackOffice/` + backOfficeId, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            console.log('Backoffice deleted successfully');
            loadBackOffices();
        } else {
            console.error('Failed to delete backoffice');
            return response.text().then(text => Promise.reject(text));
        }
    })
}
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

