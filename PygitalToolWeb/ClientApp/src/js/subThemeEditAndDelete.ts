import bootstrap from "bootstrap";
import {loadSubThemes,subTheme} from "./subThemeCreation";
document.addEventListener('DOMContentLoaded', () => {
    const confirmationModal = document.getElementById('confirmationModal');
    confirmationModal?.addEventListener('show.bs.modal', (event: any) => {
        const button = event.relatedTarget as HTMLElement;
        const subthemeId = button.getAttribute('data-subtheme-id');
        const confirmDeleteButton = document.getElementById('delete-confirm') as HTMLButtonElement;

        console.log("Modal shown, subtheme ID:", subthemeId);

        confirmDeleteButton.onclick = () => {
            if (subthemeId) {
                deleteSubTheme(parseInt(subthemeId));
                const modalInstance = bootstrap.Modal.getInstance(confirmationModal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }
        };
    });
});

function deleteSubTheme(subthemeId: number) {
    fetch(`/api/SubThemeCreation/DeleteSubTheme/` + subthemeId, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            console.log('Subtheme deleted successfully');
            loadSubThemes();
        } else {
            console.error('Failed to delete subtheme');
            return response.text().then(text => Promise.reject(text));
        }
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('subthemes-container');
    if (projectsContainer) {
        projectsContainer.addEventListener('click', event => {
            const target = event.target as HTMLElement;
            const isEditButton = target.closest('.edit-subtheme-button');
            if (isEditButton) {
                const subthemeId = isEditButton.getAttribute('data-subtheme-id');
                if (subthemeId) {
                    showEditSubThemeForm(parseInt(subthemeId));
                }
            }
        });
    }
});


function showEditSubThemeForm(subthemeId: number): void {
    fetch(`/api/SubThemeCreation/GetSubThemeDetails/` + subthemeId)
        .then(response => response.json())
        .then((subTheme: subTheme) => {
            const subthemesContainer = document.getElementById('subthemes-container');
            if (subthemesContainer) {
                subthemesContainer.innerHTML = `
                    <h2 class="mt-4">Edit Subtheme</h2>
                    <form id="edit-subtheme-form">
                        <div class="mb-3">
                            <label for="subtheme-name" class="form-label">Subtheme Name</label>
                            <input type="text" class="form-control" id="subtheme-name" required value="${subTheme.subThemeName}">
                        </div>
                        <div class="mb-3">
                            <label for="subtheme-information" class="form-label">Information</label>
                            <textarea class="form-control" id="information" required>${subTheme.subThemeInformation}</textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Update subtheme</button>
                        <button type="button" class="btn btn-secondary" id="cancel-button">Cancel</button>
                    </form>
                `;
                document.getElementById('cancel-button')?.addEventListener('click', loadSubThemes);
                document.getElementById('edit-subtheme-form')?.addEventListener('submit', function (event) {
                    event.preventDefault();
                    updateSubtheme(subthemeId);
                });
            }
        })
        .catch(error => console.error('Failed to fetch project details:', error));
}


function updateSubtheme(subthemeId: number): void {
    const subthemeNameInput = document.getElementById('subtheme-name') as HTMLInputElement;
    const informationInput = document.getElementById('information') as HTMLTextAreaElement;
    fetch(`/api/SubThemeCreation/UpdateSubTheme/` + subthemeId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            SubThemeName: subthemeNameInput.value,
            SubThemeInformation: informationInput.value
        })
    })
        .then(response => {
            if (response.ok) {
                console.log('subtheme updated successfully');
                loadSubThemes();
            } else {
                console.error('Failed to update subtheme');
                response.text().then(text => alert('Failed to update subtheme: ' + text));
            }
        })
        .catch(error => {
            console.error('Error updating subtheme:', error);
            alert('Error updating subtheme: ' + error);
        });
}