"use strict";
// Define a class to structure the subtheme data
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
class mainTheme {
    constructor(name, information) {
        this.ThemeName = name;
        this.MainThemeInformation = information;
    }
}
console.log('The themecreation.ts script bundle has been loaded!');
(_a = document.getElementById('add-theme-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    var _a, _b;
    console.log('Add button has been pressed!');
    const themesContainer = document.getElementById('themes-container');
    console.log(themesContainer);
    if (themesContainer) {
        themesContainer.innerHTML = `
            <h2 class="mt-4">Add New Theme</h2>
            <form id="new-theme-form">
                <div class="mb-3">
                    <label for="themeName" class="form-label">Theme name</label>
                    <input type="text" class="form-control" id="themeName" required>
                </div>
                <div class="mb-3">
                    <label for="themeInformation" class="form-label">Theme information</label>
                    <textarea class="form-control" id="themeInformation" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Add Theme</button>
                <button type="button" class="btn btn-secondary" id="cancel-button">Cancel</button>
            </form>
        `;
        const scriptElement = document.getElementById('theme-script');
        const projectId = scriptElement === null || scriptElement === void 0 ? void 0 : scriptElement.getAttribute('data-project-id');
        (_a = document.getElementById('cancel-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', loadMainThemes);
        (_b = document.getElementById('new-theme-form')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', function (event) {
            return __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                const themeNameInput = document.getElementById('themeName');
                const themeInformationInput = document.getElementById('themeInformation');
                if (!themeNameInput || !themeInformationInput)
                    return;
                console.log(projectId);
                const themeName = themeNameInput.value;
                const themeInformation = themeInformationInput.value;
                const theme = {
                    ThemeName: themeName,
                    MainThemeInformation: themeInformation
                };
                console.log(theme);
                const response = yield fetch('/api/ThemeCreation/AddThemeToBackoffice', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ThemeName: theme.ThemeName,
                        MainThemeInformation: theme.MainThemeInformation,
                        ProjectId: projectId
                    })
                });
                console.log(response);
                if (response.ok) {
                    loadMainThemes();
                }
                else {
                    alert('Failed to add theme');
                }
            });
        });
    }
});
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
            refreshPage();
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
        console.log(mainTheme.ThemeName);
        const mainthemesContainer = document.getElementById('themes-container');
        if (mainthemesContainer) {
            // @ts-ignore
            const mainthemeName = document.getElementById('theme-name');
            const mainthemeInformation = document.getElementById('theme-information');
            // @ts-ignore
            if ((mainthemeName === null || mainthemeName === void 0 ? void 0 : mainthemeName.textContent) && (mainthemeInformation === null || mainthemeInformation === void 0 ? void 0 : mainthemeInformation.textContent)) {
                const formHtml = `
            <h2 class="mt-4">Edit Maintheme</h2>
            <form id="edit-maintheme-form">
                <div class="mb-3">
                    <label for="new-maintheme-name" class="form-label">Maintheme Name</label>
                   
                    <input type="text" class="form-control" id="new-theme-name" required value="${mainthemeName.textContent}">
                </div>
                <div class="mb-3">
                    <label for="new-theme-information" class="form-label">Information</label>
                    <textarea class="form-control" id="new-theme-information" required>${mainthemeInformation.textContent}</textarea>
                </div>
                <button type="submit" class="btn btn-primary">Update maintheme</button>
                <button type="button" class="btn btn-secondary" id="cancel-button">Cancel</button>
            </form>
        `;
                mainthemesContainer.innerHTML = formHtml;
            }
            // Event listeners
            (_a = document.getElementById('cancel-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', loadMainThemes);
            (_b = document.getElementById('edit-maintheme-form')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', function (event) {
                event.preventDefault();
                updateMaintheme(mainthemeId);
            });
        }
    })
        .catch(error => console.error('Failed to fetch maintheme details:', error));
}
function updateMaintheme(mainthemeId) {
    const mainthemeNameInput = document.getElementById('new-theme-name');
    const informationInput = document.getElementById('new-theme-information');
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
                // Extract error messages from the error response
                const errorMessages = Object.values(errorResponse.errors).join(', ');
                console.error('Failed to update theme because of response: ' + errorMessages);
                alert('Failed to update theme because: ' + errorMessages);
            });
        }
    });
}
function loadMainThemes() {
    window.location.href = window.location.href;
}
function refreshPage() {
    window.location.reload(); // Dit laadt de huidige pagina opnieuw
}
