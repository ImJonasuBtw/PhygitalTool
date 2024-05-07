import bootstrap from "bootstrap";
import { loadSubThemes } from "./subThemeCreation";
document.addEventListener('DOMContentLoaded', () => {
    const confirmationModal = document.getElementById('confirmationModal');
    confirmationModal === null || confirmationModal === void 0 ? void 0 : confirmationModal.addEventListener('show.bs.modal', (event) => {
        const button = event.relatedTarget;
        const subthemeId = button.getAttribute('data-subtheme-id');
        const confirmDeleteButton = document.getElementById('delete-confirm');
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
function deleteSubTheme(subthemeId) {
    fetch(`/api/SubThemeCreation/DeleteSubTheme/` + subthemeId, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            console.log('Subtheme deleted successfully');
            loadSubThemes();
        }
        else {
            console.error('Failed to delete subtheme');
            return response.text().then(text => Promise.reject(text));
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('subthemes-container');
    if (projectsContainer) {
        projectsContainer.addEventListener('click', event => {
            const target = event.target;
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
function showEditSubThemeForm(subthemeId) {
    fetch(`/api/SubThemeCreation/GetSubThemeDetails/` + subthemeId)
        .then(response => response.json())
        .then((subTheme) => {
        var _a, _b;
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
            (_a = document.getElementById('cancel-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', loadSubThemes);
            (_b = document.getElementById('edit-subtheme-form')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', function (event) {
                event.preventDefault();
                updateSubtheme(subthemeId);
            });
        }
    })
        .catch(error => console.error('Failed to fetch project details:', error));
}
function updateSubtheme(subthemeId) {
    const subthemeNameInput = document.getElementById('subtheme-name');
    const informationInput = document.getElementById('information');
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
        }
        else {
            console.error('Failed to update subtheme');
            response.text().then(text => alert('Failed to update subtheme: ' + text));
        }
    })
        .catch(error => {
        console.error('Error updating subtheme:', error);
        alert('Error updating subtheme: ' + error);
    });
}
