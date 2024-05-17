// Define a class to structure the subtheme data
import bootstrap, {Modal} from "bootstrap";
import {loadSubThemes, showEditSubThemeForm} from "./SubThemeUI";
import {deleteSubTheme} from "./SubThemeRestClient";

export class subTheme {
    public subThemeName: string;
    public subThemeInformation: string;

    constructor(name: string, information: string) {
        this.subThemeName = name;
        this.subThemeInformation = information;
    }
}



document.getElementById('add-subtheme-button')?.addEventListener('click', () => {
    console.log('Add button has been pressed!');
    const subThemasContainer = document.getElementById('subthemes-container');
    console.log(subThemasContainer);
    if (subThemasContainer) {
        subThemasContainer.innerHTML = `
            <h2 class="mt-4">Add New SubTheme</h2>
            <form id="new-project-form">
                <div class="mb-3">
                    <label for="subThemeName" class="form-label">Subtheme name</label>
                    <input type="text" class="form-control" id="subThemeName" required>
                </div>
                <div class="mb-3">
                    <label for="subThemeInformation" class="form-label">Subtheme information</label>
                    <textarea class="form-control" id="subThemeInformation" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Add Subtheme</button>
                <button type="button" class="btn btn-secondary" id="cancel-button">Cancel</button>
            </form>
        `;

        const scriptElement = document.getElementById('subThemePage-script');
        const mainThemeId = scriptElement?.dataset.mainthemeId;

        document.getElementById('cancel-button')?.addEventListener('click', loadSubThemes);
        document.getElementById('new-project-form')?.addEventListener('submit', async function(event) {
            event.preventDefault();
            const subThemeNameInput = document.getElementById('subThemeName') as HTMLInputElement;
            const subThemeInformationInput = document.getElementById('subThemeInformation') as HTMLTextAreaElement;
            if (!subThemeNameInput || !subThemeInformationInput) return;

            const subThemeName = subThemeNameInput.value;
            const subThemeInformation = subThemeInformationInput.value;



            
            const newSubTheme = new subTheme(subThemeName, subThemeInformation);
            console.log(mainThemeId);
            const response = await fetch('/api/SubThemeCreation/AddSubThemeToBackoffice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    SubThemeName: newSubTheme.subThemeName,
                    SubThemeInformation: newSubTheme.subThemeInformation,
                    MainThemeId: mainThemeId
                })
            });

            if (response.ok) {
                loadSubThemes();
            } else {
                alert('Failed to add subtheme');
            }
        });
    }
});

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
                const modalInstance = Modal.getInstance(confirmationModal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }
        };
    });
});

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



