export class BackOffice {
    public backOfficeName: string;

    constructor(backOfficeName: string) {
        this.backOfficeName = backOfficeName;
    }

}

document.getElementById('add-project-button')?.addEventListener('click', () => {
    console.log('Add backoffice button has been pressed!');
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        projectsContainer.innerHTML = `
            <h2 class="mt-4">Add New BackOffice</h2>
            <form id="new-project-form">
                <div class="mb-3">
                    <label for="backOfficeNameInput" class="form-label">BackOffice Name</label>
                    <input type="text" class="form-control" id="backOfficeNameInput" required>
                </div>
                <button type="submit" class="btn btn-primary">Add BackOffice</button>
                <button type="button" class="btn btn-secondary" id="cancel-button">Cancel</button>
            </form>
        `;

        const scriptElement = document.getElementById('backoffice-script');
        const adminPlatformId = scriptElement?.getAttribute('data-adminplatform-id');

        document.getElementById('cancel-button')?.addEventListener('click', loadProjects);
        document.getElementById('new-project-form')?.addEventListener('submit', async function (event) {
            event.preventDefault();
            const backOfficeNameInput = document.getElementById('backOfficeNameInput') as HTMLInputElement;
            if (!backOfficeNameInput) return;

            const backOfficeName = backOfficeNameInput.value;
            const newBackOffice = new BackOffice(backOfficeName);

            const response = await fetch('/api/BackOfficeCreation/AddBackOffice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Name: newBackOffice.backOfficeName,
                    AdminPlatformId: adminPlatformId
                })
            });

            if (response.ok) {
                loadProjects();
            } else {
                alert('Failed to add project');
            }
        });
    }
});

export function loadProjects() {
    window.location.href = window.location.href;
}


