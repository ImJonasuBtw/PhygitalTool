import bootstrap, {Modal} from "bootstrap";
import {loadMainThemes, showEditMainThemeForm} from "./ThemeUI";
import {deleteMainTheme} from "./ThemeRestClient";
export class mainTheme {
    public themeName: string;
    public mainThemeInformation: string;

    constructor(name: string, information: string) {
        this.themeName = name;
        this.mainThemeInformation = information;
    }
}


document.getElementById('add-theme-button')?.addEventListener('click', () => {
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

        const scriptElement = document.getElementById('mainThemePage-script');
        const projectId = scriptElement?.dataset.projectId;

        document.getElementById('cancel-button')?.addEventListener('click', loadMainThemes);
        document.getElementById('new-theme-form')?.addEventListener('submit', async function(event) {
            event.preventDefault();
            const themeNameInput = document.getElementById('themeName') as HTMLInputElement;
            const themeInformationInput = document.getElementById('themeInformation') as HTMLTextAreaElement;
            if (!themeNameInput || !themeInformationInput) return;
            console.log(projectId)
            const themeName = themeNameInput.value;
            const themeInformation = themeInformationInput.value;

            const theme = {
                themeName: themeName,
                mainThemeInformation: themeInformation
            };
            console.log(theme);
            const response = await fetch('/api/ThemeCreation/AddThemeToBackoffice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ThemeName: theme.themeName,
                    MainThemeInformation: theme.mainThemeInformation,
                    ProjectId: projectId
                })
            });
            console.log(response);

            if (response.ok) {
                loadMainThemes();
            } else {
                alert('Failed to add theme');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const confirmationModal = document.getElementById('confirmationModal');
    confirmationModal?.addEventListener('show.bs.modal', (event: any) => {
        const button = event.relatedTarget as HTMLElement;
        const themeId = button.getAttribute('data-theme-id');
        const confirmDeleteButton = document.getElementById('theme-delete-confirm') as HTMLButtonElement;

        console.log("Modal shown, theme ID:", themeId);

        confirmDeleteButton.onclick = () => {
            if (themeId) {
                deleteMainTheme(parseInt(themeId));
                const modalInstance = Modal.getInstance(confirmationModal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }
        };
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const mainThemesContainer = document.getElementById('themes-container');
    if (mainThemesContainer) {
        mainThemesContainer.addEventListener('click', event => {
            const target = event.target as HTMLElement;
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







