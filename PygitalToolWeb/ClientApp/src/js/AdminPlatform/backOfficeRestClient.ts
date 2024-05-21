import {loadBackOffices} from "./backOfficeUI";

export   function updateProject(backOfficeId: number): void {
    const backOfficeNameInput = document.getElementById('backOfficeName') as HTMLInputElement;
    fetch(`/api/BackOfficeCreation/UpdateBackOffice/` + backOfficeId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Name: backOfficeNameInput.value
        })
    })
        .then(async response => {
            if (response.ok) {
                console.log('BackOffice updated successfully');
                loadBackOffices();
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
                    response.text().then(text => alert('Failed to update BackOffice: ' + text));
                }
            }
        })
        .catch(error => {
            console.error('Error updating backoffice:', error);
            alert('Error updating backoffice: ' + error);
        });
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