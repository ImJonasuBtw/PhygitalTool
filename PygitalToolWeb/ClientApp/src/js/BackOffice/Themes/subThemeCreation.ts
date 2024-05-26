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


function setupAddThemeButton() {
    document.getElementById('add-subtheme-button')?.addEventListener('click', () => {
        console.log('Add button has been pressed!');
        const subThemasContainer = document.getElementById('subthemes-container');
        console.log(subThemasContainer);
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

function setupConfirmationModal() {
    const confirmationModal = document.getElementById('confirmationModal');
    confirmationModal?.addEventListener('show.bs.modal', (event: any) => {
        const button = event.relatedTarget as HTMLElement;
        const subthemeId = button.getAttribute('data-subtheme-id');
        const confirmDeleteButton = document.getElementById('delete-confirm') as HTMLButtonElement;

        console.log("Modal shown, subtheme ID:", subthemeId);

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
export function  loadDoms(){
    setupSubThemesContainer();
    setupConfirmationModal();
    setupAddThemeButton();
}



