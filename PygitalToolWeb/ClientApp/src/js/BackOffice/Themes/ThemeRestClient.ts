import {loadMainThemes} from "./ThemeUI";

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
            if (response.status === 400) {
                const errorData = await response.json();
                if (errorData && errorData.errors) {
                    for (const key in errorData.errors) {
                        if (errorData.errors.hasOwnProperty(key)) {
                            const errorMessage = errorData.errors[key];
                            alert(errorMessage);
                        }
                    }
                } else {
                    alert('Error in de validatie');
                }
            } else {
                response.text().then(text => alert('Gefaald om te updaten' + text));
            }
        }
    })

}