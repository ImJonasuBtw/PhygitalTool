import {getEditMainThemeFormHtml, loadMainThemes} from "./themeUI";
import {mainTheme} from "./themeCreation";
import {handleErrorResponse} from "./themeValidation";

export function deleteMainTheme(mainthemeId: number) {
    fetch(`/api/ThemeCreation/DeleteMainTheme/` + mainthemeId, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            console.log('maintheme deleted successfully');
            loadMainThemes();
        } else {
            console.error('Failed to delete maintheme');
            return response.text().then(text => Promise.reject(text));
        }
    })
}
export function showEditMainThemeForm(mainthemeId: number): void {
    console.log(mainthemeId);
    fetch(`/api/ThemeCreation/GetMainThemeDetails/` + mainthemeId)
        .then(response => response.json())
        .then((mainTheme: mainTheme) => {
            console.log(mainTheme)
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
export function updateMaintheme(mainthemeId: number): void {
    const mainthemeNameInput = document.getElementById('theme-name') as HTMLInputElement;
    const informationInput = document.getElementById('theme-information') as HTMLTextAreaElement;
    console.log(mainthemeNameInput.value);
    console.log(informationInput.value);
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
    console.log(response);

    if (response.ok) {
        loadMainThemes();
    } else {
        await handleErrorResponse(response)
    }
}