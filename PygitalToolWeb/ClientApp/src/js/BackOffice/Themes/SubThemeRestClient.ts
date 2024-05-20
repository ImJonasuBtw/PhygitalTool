import {loadSubThemes} from "./SubThemeUI";

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
                        alert('Validation error occurred.');
                    }
                } else {
                    response.text().then(text => alert('Failed to update subtheme: ' + text));
                }
            }
        })
        .catch(error => {
            console.error('Error updating subtheme:', error);
            alert('Error updating subtheme: ' + error);
        });
}