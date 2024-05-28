import {loadSubThemes, ShowEditForm} from "./subThemeUI";
import {subTheme} from "./subThemeCreation";
import {HandleValidation} from "./subthemeValidation";

// Deletes a subtheme from the server.
export function deleteSubTheme(subthemeId: number) {
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

// Adds a subtheme to the server.
export async function AddSubtheme(newSubTheme: subTheme, mainthemeId: string| undefined) {
    const response = await fetch('/api/SubThemeCreation/AddSubThemeToBackoffice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            SubThemeName: newSubTheme.subThemeName,
            SubThemeInformation: newSubTheme.subThemeInformation,
            MainThemeId: mainthemeId
        })
    });

    if (response.ok) {
        loadSubThemes();
    } else {
        await HandleValidation(response)
    }
}

// Sets up an edit form for a certain subtheme. 
export function showEditSubThemeForm(subthemeId: number): void {
    fetch(`/api/SubThemeCreation/GetSubThemeDetails/` + subthemeId)
        .then(response => response.json())
        .then((subTheme: subTheme) => {
            const subthemesContainer = document.getElementById('subthemes-container');
            if (subthemesContainer) {
                ShowEditForm(subthemesContainer, subTheme)
                document.getElementById('cancel-button')?.addEventListener('click', loadSubThemes);
                document.getElementById('edit-subtheme-form')?.addEventListener('submit', function (event) {
                    event.preventDefault();
                    updateSubtheme(subthemeId);
                });
            }
        })
        .catch(error => console.error('Failed to fetch project details:', error));
}

// Updates a subtheme with a certain subthemeId.
export function updateSubtheme(subthemeId: number): void {
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
        .then(async response => {
            if (response.ok) {
                console.log('subtheme updated successfully');
                loadSubThemes();
            } else {
               await HandleValidation(response)
            }
        })
        .catch(error => {
            console.error('Error updating subtheme:', error);
            alert('Kon subthema niet updaten  ' + error);
        });
}