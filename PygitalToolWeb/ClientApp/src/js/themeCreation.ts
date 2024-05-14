import bootstrap from "bootstrap";
export class mainTheme {
    public themeName: string;
    public mainThemeInformation: string;

    constructor(name: string, information: string) {
        this.themeName = name;
        this.mainThemeInformation = information;
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

        const scriptElement = document.getElementById('mainThemePage-script');
        const projectId = scriptElement?.dataset.projectId;

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
                themeName: themeName,
                mainThemeInformation: themeInformation
            };
            console.log(theme);
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
                alert('Failed to add theme');
            }
        });
    }
});







export function loadMainThemes() {
    window.location.href = window.location.href;
}
