import  {Modal} from "bootstrap";
import {loadSubThemes, ShowAddForm} from "./subThemeUI";
import {AddSubtheme, deleteSubTheme, showEditSubThemeForm} from "./subThemeRestClient";

export class subTheme {
    public subThemeName: string;
    public subThemeInformation: string;

    constructor(name: string, information: string) {
        this.subThemeName = name;
        this.subThemeInformation = information;
    }
}

// Sets up an event listener for the "Add Subtheme" button.
function setupAddThemeButton() {
    document.getElementById('add-subtheme-button')?.addEventListener('click', () => {
        const subThemasContainer = document.getElementById('subthemes-container');
        if (subThemasContainer) {
            ShowAddForm(subThemasContainer)

            const scriptElement = document.getElementById('subThemePage-script');
            const mainThemeId = scriptElement?.dataset.mainthemeId;

            document.getElementById('cancel-button')?.addEventListener('click', loadSubThemes);
            document.getElementById('new-project-form')?.addEventListener('submit', async function (event) {
                event.preventDefault();
                const subThemeNameInput = document.getElementById('subThemeName') as HTMLInputElement;
                const subThemeInformationInput = document.getElementById('subThemeInformation') as HTMLTextAreaElement;
                if (!subThemeNameInput || !subThemeInformationInput) return;

                const subThemeName = subThemeNameInput.value;
                const subThemeInformation = subThemeInformationInput.value;


                const newSubTheme = new subTheme(subThemeName, subThemeInformation);

                await AddSubtheme(newSubTheme, mainThemeId)
            });
        }
    });
}

//  Sets up a confirmation modal dialog.
function setupConfirmationModal() {
    const confirmationModal = document.getElementById('confirmationModal');
    confirmationModal?.addEventListener('show.bs.modal', (event: any) => {
        const button = event.relatedTarget as HTMLElement;
        const subthemeId = button.getAttribute('data-subtheme-id');
        const confirmDeleteButton = document.getElementById('delete-confirm') as HTMLButtonElement;

        confirmDeleteButton.onclick = () => {
            if (subthemeId) {
                deleteSubTheme(parseInt(subthemeId));
                const modalInstance = Modal.getInstance(confirmationModal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }
        };
    });
}

//  Sets up the subthemes container by adding a click event listener
function setupSubThemesContainer() {
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
}

// Initializes a DOM listener for subtheme-related navigation links. 
export function  loadDoms(){
    setupSubThemesContainer();
    setupConfirmationModal();
    setupAddThemeButton();
}



