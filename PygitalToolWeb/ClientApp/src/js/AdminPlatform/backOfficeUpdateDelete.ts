import {loadProjects, BackOffice} from "./backOfficeCreation";

export function deleteBackOffice(backOfficeId: number) {
    fetch(`/api/BackOfficeCreation/DeleteBackOffice/` + backOfficeId, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            console.log('Backoffice deleted successfully');
            loadProjects();
        } else {
            console.error('Failed to delete backoffice');
            return response.text().then(text => Promise.reject(text));
        }
    })
}

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
                document.getElementById('cancel-button')?.addEventListener('click', loadProjects);
                document.getElementById('edit-backoffice-form')?.addEventListener('submit', function (event) {
                    event.preventDefault();
                    updateProject(backOfficeId);
                });
            }
        })
        .catch(error => console.error('Failed to fetch backoffice details:', error));
}

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
                    response.text().then(text => alert('Failed to update BackOffice: ' + text));
                }
            }
        })
        .catch(error => {
            console.error('Error updating backoffice:', error);
            alert('Error updating backoffice: ' + error);
        });
}