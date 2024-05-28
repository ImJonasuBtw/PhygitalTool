import {getEditMainThemeFormHtml, loadMainThemes} from "./themeUI";
import {mainTheme} from "./themeCreation";
import {handleErrorResponse} from "./themeValidation";

// Deletes a maintheme from the server.
export function deleteMainTheme(mainthemeId: number) {
    fetch(`/api/ThemeCreation/DeleteMainTheme/` + mainthemeId, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            loadMainThemes();
        } else {
            console.error('Failed to delete maintheme');
            return response.text().then(text => Promise.reject(text));
        }
    })
}

// Sets up an edit form for a certain maintheme. 
export function showEditMainThemeForm(mainthemeId: number): void {
    fetch(`/api/ThemeCreation/GetMainThemeDetails/` + mainthemeId)
        .then(response => response.json())
        .then((mainTheme: mainTheme) => {
            const mainthemesContainer = document.getElementById('themes-container');
            if (mainthemesContainer) {
                getEditMainThemeFormHtml(mainthemesContainer, mainTheme)
            }

            document.getElementById('cancel-button')?.addEventListener('click', loadMainThemes);
            document.getElementById('edit-maintheme-form')?.addEventListener('submit', function (event) {
                event.preventDefault();
                updateMaintheme(mainthemeId);
            });

        })

}

// Updates a maintheme with a certain mainthemeId.
export function updateMaintheme(mainthemeId: number): void {
    const mainthemeNameInput = document.getElementById('theme-name') as HTMLInputElement;
    const informationInput = document.getElementById('theme-information') as HTMLTextAreaElement;
    fetch(`/api/ThemeCreation/UpdateMainTheme/` + mainthemeId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ThemeName: mainthemeNameInput.value,
            MainThemeInformation: informationInput.value
        })
    }).then(async response => {
        if (response.ok) {
            console.log('theme updated successfully');
            loadMainThemes();
        } else {
            await handleErrorResponse(response)
        }
    })

}

// Adds a maintheme to the server.
export async function AddMaintheme(projectId: string | undefined, theme: mainTheme): Promise<void> {
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
    if (response.ok) {
        loadMainThemes();
    } else {
        await handleErrorResponse(response)
    }
}