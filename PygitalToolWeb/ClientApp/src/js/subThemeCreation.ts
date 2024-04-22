// Define a class to structure the subtheme data
class subTheme {
    public subThemeName: string;
    public subThemeInformation: string;

    constructor(name: string, information: string) {
        this.subThemeName = name;
        this.subThemeInformation = information;
    }
}

console.log('The project.ts script bundle has been loaded!');

document.getElementById('add-subtheme-button')?.addEventListener('click', () => {
    console.log('Add button has been pressed!');
    const subThemasContainer = document.getElementById('subthemes-container');
    console.log(subThemasContainer);
    if (subThemasContainer) {
        subThemasContainer.innerHTML = `
            <h2 class="mt-4">Add New SubTheme</h2>
            <form id="new-project-form">
                <div class="mb-3">
     -               <label for="subThemeName" class="form-label">Subtheme name</label>
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

        const scriptElement = document.getElementById('subTheme-script');
        const mainThemeId = scriptElement?.getAttribute('data-maintheme-id');

        document.getElementById('cancel-button')?.addEventListener('click', loadSubThemes);
        document.getElementById('new-project-form')?.addEventListener('submit', async function(event) {
            event.preventDefault();
            const subThemeNameInput = document.getElementById('subThemeName') as HTMLInputElement;
            const subThemeInformationInput = document.getElementById('subThemeInformation') as HTMLTextAreaElement;
            if (!subThemeNameInput || !subThemeInformationInput) return;

            const subThemeName = subThemeNameInput.value;
            const subThemeInformation = subThemeInformationInput.value;



            // Create a new project instance
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

function loadSubThemes() {
    window.location.href = window.location.href;
}

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
                const modalInstance = bootstrap.Modal.getInstance(confirmationModal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }
        };
    });
});

function deleteSubTheme(subthemeId: number) {
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


function showEditSubThemeForm(subthemeId: number): void {
    fetch(`/api/SubThemeCreation/GetSubThemeDetails/` + subthemeId)
        .then(response => response.json())
        .then((subTheme: subTheme) => {
            const subthemesContainer = document.getElementById('subthemes-container');
            if (subthemesContainer) {
                subthemesContainer.innerHTML = `
                    <h2 class="mt-4">Edit Subtheme</h2>
                    <form id="edit-subtheme-form">
                        <div class="mb-3">
                            <label for="subtheme-name" class="form-label">Subtheme Name</label>
                            <input type="text" class="form-control" id="subtheme-name" required value="${subTheme.subThemeName}">
                        </div>
                        <div class="mb-3">
                            <label for="subtheme-information" class="form-label">Information</label>
                            <textarea class="form-control" id="information" required>${subTheme.subThemeInformation}</textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Update subtheme</button>
                        <button type="button" class="btn btn-secondary" id="cancel-button">Cancel</button>
                    </form>
                `;
                document.getElementById('cancel-button')?.addEventListener('click', loadSubThemes);
                document.getElementById('edit-subtheme-form')?.addEventListener('submit', function (event) {
                    event.preventDefault();
                    updateSubtheme(subthemeId);
                });
            }
        })
        .catch(error => console.error('Failed to fetch project details:', error));
}


function updateSubtheme(subthemeId: number): void {
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
        .then(response => {
            if (response.ok) {
                console.log('subtheme updated successfully');
                loadSubThemes();
            } else {
                console.error('Failed to update subtheme');
                response.text().then(text => alert('Failed to update subtheme: ' + text));
            }
        })
        .catch(error => {
            console.error('Error updating subtheme:', error);
            alert('Error updating subtheme: ' + error);
        });
}