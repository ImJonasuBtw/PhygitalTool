﻿import  {Modal} from "bootstrap";
import {getAddMainThemeFormHtml, loadMainThemes} from "./main-theme-ui";
import {AddMaintheme, deleteMainTheme, showEditMainThemeForm} from "./main-theme-restclient";
export class mainTheme {
    public themeName: string;
    public mainThemeInformation: string;

    constructor(name: string, information: string) {
        this.themeName = name;
        this.mainThemeInformation = information;
    }
}

// Sets up an event listener for the "Add theme" button.
function setupAddThemeButton() {
    document.getElementById('add-theme-button')?.addEventListener('click', () => {
        console.log('Add button has been pressed!');
        const themesContainer = document.getElementById('themes-container');
        console.log(themesContainer);
        if (themesContainer) {
            getAddMainThemeFormHtml(themesContainer);

            const scriptElement = document.getElementById('main-theme-page-script');
            const projectId = scriptElement?.dataset.projectId;

            document.getElementById('cancel-button')?.addEventListener('click', loadMainThemes);
            document.getElementById('new-theme-form')?.addEventListener('submit', async function(event) {
                event.preventDefault();
                const themeNameInput = document.getElementById('theme-name') as HTMLInputElement;
                const themeInformationInput = document.getElementById('theme-information') as HTMLTextAreaElement;
                if (!themeNameInput || !themeInformationInput) return;
                console.log(projectId);
                const themeName = themeNameInput.value;
                const themeInformation = themeInformationInput.value;

                const theme = {
                    themeName: themeName,
                    mainThemeInformation: themeInformation
                };
                console.log(theme);
                await AddMaintheme(projectId, theme);
            });
        }
    });
}

//  Sets up a confirmation modal dialog.
function setupConfirmationModal() {
    const confirmationModal = document.getElementById('confirmation-modal');
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
}

//  Sets up the themes container by adding a click event listener
function setupMainThemesContainer() {
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
}

// Initializes a DOM listener for theme-related navigation links. 
export function loadDOMs(): void {
    setupAddThemeButton();
    setupConfirmationModal();
    setupMainThemesContainer();
}





