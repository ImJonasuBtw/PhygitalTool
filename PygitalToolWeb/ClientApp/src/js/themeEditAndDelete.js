import bootstrap from "bootstrap";
import { loadMainThemes } from "./themeCreation";
document.addEventListener('DOMContentLoaded', () => {
    const confirmationModal = document.getElementById('confirmationModal');
    confirmationModal === null || confirmationModal === void 0 ? void 0 : confirmationModal.addEventListener('show.bs.modal', (event) => {
        const button = event.relatedTarget;
        const themeId = button.getAttribute('data-theme-id');
        const confirmDeleteButton = document.getElementById('theme-delete-confirm');
        console.log("Modal shown, theme ID:", themeId);
        confirmDeleteButton.onclick = () => {
            if (themeId) {
                deleteMainTheme(parseInt(themeId));
                const modalInstance = bootstrap.Modal.getInstance(confirmationModal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }
        };
    });
});
function deleteMainTheme(mainthemeId) {
    fetch(`/api/ThemeCreation/DeleteMainTheme/` + mainthemeId, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            console.log('maintheme deleted successfully');
            loadMainThemes();
        }
        else {
            console.error('Failed to delete maintheme');
            return response.text().then(text => Promise.reject(text));
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const mainThemesContainer = document.getElementById('themes-container');
    if (mainThemesContainer) {
        mainThemesContainer.addEventListener('click', event => {
            const target = event.target;
            const isEditButton = target.closest('.edit-theme-button');
            if (isEditButton) {
                console.log("edit button clicked");
                const mainthemeId = isEditButton.getAttribute('data-theme-id');
                if (mainthemeId) {
                    showEditMainThemeForm(parseInt(mainthemeId));
                }
            }
        });
    }
});
function showEditMainThemeForm(mainthemeId) {
    console.log(mainthemeId);
    fetch(`/api/ThemeCreation/GetMainThemeDetails/` + mainthemeId)
        .then(response => response.json())
        .then((mainTheme) => {
        var _a, _b;
        console.log(mainTheme);
        const mainthemesContainer = document.getElementById('themes-container');
        if (mainthemesContainer) {
            const formHtml = `
            <h2 class="mt-4">Edit Maintheme</h2>
            <form id="edit-maintheme-form">
                <div class="mb-3">
                    <label for="new-maintheme-name" class="form-label">Maintheme Name</label>
                   
                    <input type="text" class="form-control" id="theme-name" required value="${mainTheme.themeName}">
                </div>
                <div class="mb-3">
                    <label for="theme-information" class="form-label">Information</label>
                    <textarea class="form-control" id="new-theme-information" required>${mainTheme.mainThemeInformation}</textarea>
                </div>
                <button type="submit" class="btn btn-primary">Update maintheme</button>
                <button type="button" class="btn btn-secondary" id="cancel-button">Cancel</button>
            </form>
        `;
            mainthemesContainer.innerHTML = formHtml;
        }
        (_a = document.getElementById('cancel-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', loadMainThemes);
        (_b = document.getElementById('edit-maintheme-form')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', function (event) {
            event.preventDefault();
            updateMaintheme(mainthemeId);
        });
    });
}
function updateMaintheme(mainthemeId) {
    const mainthemeNameInput = document.getElementById('heme-name');
    const informationInput = document.getElementById('theme-information');
    console.log(mainthemeNameInput.textContent);
    fetch(`/api/ThemeCreation/UpdateMainTheme/` + mainthemeId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ThemeName: mainthemeNameInput.value,
            MainThemeInformation: informationInput.value
        })
    }).then(response => {
        if (response.ok) {
            console.log('theme updated successfully');
            loadMainThemes();
        }
        else {
            response.json().then(errorResponse => {
                const errorMessages = Object.values(errorResponse.errors).join(', ');
                console.error('Failed to update theme because of response: ' + errorMessages);
                alert('Failed to update theme because: ' + errorMessages);
            });
        }
    });
}
