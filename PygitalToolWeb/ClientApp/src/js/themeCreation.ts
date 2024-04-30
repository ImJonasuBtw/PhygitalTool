// Define a class to structure the subtheme data


class mainTheme {
    public ThemeName :  string;
    public MainThemeInformation : string;

    constructor(name: string, information: string) {
        this.ThemeName = name;
        this.MainThemeInformation = information;
    }
}

console.log('The themecreation.ts script bundle has been loaded!');


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

        const scriptElement = document.getElementById('theme-script');
        const projectId = scriptElement?.getAttribute('data-project-id');

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
                ThemeName: themeName,
                MainThemeInformation: themeInformation
            };
            console.log(theme);
            const response = await fetch('/api/ThemeCreation/AddThemeToBackoffice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ThemeName: theme.ThemeName,
                    MainThemeInformation: theme.MainThemeInformation,
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
                const modalInstance = bootstrap.Modal.getInstance(confirmationModal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }
        };
    });
});

function deleteMainTheme(mainthemeId: number) {
    fetch(`/api/ThemeCreation/DeleteMainTheme/` + mainthemeId, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            console.log('maintheme deleted successfully');
            refreshPage();
        } else {
            console.error('Failed to delete maintheme');
            return response.text().then(text => Promise.reject(text));
        }
    })
}

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


function showEditMainThemeForm(mainthemeId: number): void {
    console.log(mainthemeId);
    fetch(`/api/ThemeCreation/GetMainThemeDetails/` + mainthemeId)
        .then(response => response.json())
        .then((mainTheme: mainTheme) => {
            console.log(mainTheme.ThemeName);
            const mainthemesContainer = document.getElementById('themes-container');
            if (mainthemesContainer) {
                // @ts-ignore
                const mainthemeName = document.getElementById('theme-name');
                const mainthemeInformation = document.getElementById('theme-information');
                // @ts-ignore
                if(mainthemeName?.textContent && mainthemeInformation?.textContent){const formHtml = `
            <h2 class="mt-4">Edit Maintheme</h2>
            <form id="edit-maintheme-form">
                <div class="mb-3">
                    <label for="new-maintheme-name" class="form-label">Maintheme Name</label>
                   
                    <input type="text" class="form-control" id="new-theme-name" required value="${mainthemeName.textContent}">
                </div>
                <div class="mb-3">
                    <label for="new-theme-information" class="form-label">Information</label>
                    <textarea class="form-control" id="new-theme-information" required>${mainthemeInformation.textContent}</textarea>
                </div>
                <button type="submit" class="btn btn-primary">Update maintheme</button>
                <button type="button" class="btn btn-secondary" id="cancel-button">Cancel</button>
            </form>
        `;
                    mainthemesContainer.innerHTML = formHtml;}
                // Event listeners
                document.getElementById('cancel-button')?.addEventListener('click', loadMainThemes);
                document.getElementById('edit-maintheme-form')?.addEventListener('submit', function (event) {
                    event.preventDefault();
                    updateMaintheme(mainthemeId);
                });
            }
        })

        .catch(error => console.error('Failed to fetch maintheme details:', error));
}


function updateMaintheme(mainthemeId: number): void {
    const mainthemeNameInput = document.getElementById('new-theme-name') as HTMLInputElement;
    const informationInput = document.getElementById('new-theme-information') as HTMLTextAreaElement;
    console.log(mainthemeNameInput.textContent);
    fetch(`/api/ThemeCreation/UpdateMainTheme/` + mainthemeId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ThemeName: mainthemeNameInput.value,
            MainThemeInformation: informationInput.value
        })
    }).then(response => {
        if (response.ok) {
            console.log('theme updated successfully');
            loadMainThemes();
        } else {
            response.json().then(errorResponse => {
                // Extract error messages from the error response
                const errorMessages = Object.values(errorResponse.errors).join(', ');
                console.error('Failed to update theme because of response: ' + errorMessages);
                alert('Failed to update theme because: ' + errorMessages);
            });
        }
    })

}

function loadMainThemes() {
    window.location.href = window.location.href;
}
function refreshPage() {
    window.location.reload(); // Dit laadt de huidige pagina opnieuw
}