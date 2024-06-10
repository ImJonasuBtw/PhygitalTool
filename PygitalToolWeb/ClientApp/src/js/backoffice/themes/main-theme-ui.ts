import {mainTheme} from "./main-theme-creation";


// Creates a edit form for a maintheme and adds it to the HTML.
export function getEditMainThemeFormHtml(mainthemesContainer: { innerHTML: string; }, mainTheme : mainTheme ):void  {
    mainthemesContainer.innerHTML = `
            <h2 class="mt-4">Edit Maintheme</h2>
            <form id="edit-maintheme-form">
                <div class="mb-3">
                    <label for="new-maintheme-name" class="form-label">Naam van hoofdthema</label>
                   
                    <input type="text" class="form-control" id="theme-name" required value="${mainTheme.themeName}">
                </div>
                <div class="mb-3">
                    <label for="theme-information" class="form-label">Informatie</label>
                    <textarea class="form-control" id="theme-information" required>${mainTheme.mainThemeInformation}</textarea>
                </div>
                <button type="submit" class="btn btn-primary">Update Hoofdthema</button>
                <button type="button" class="btn btn-secondary" id="cancel-button">Cancel</button>
            </form>
        `;
}

// Creates a form to add a maintheme and adds it to the HTML.
export function getAddMainThemeFormHtml(themesContainer: { innerHTML: string; } ):void  {
    themesContainer.innerHTML = `
            <h2 class="mt-4">voeg nieuw thema toe</h2>
            <form id="new-theme-form">
                <div class="mb-3">
                    <label for="theme-name" class="form-label">Hoofdthema naam</label>
                    <input type="text" class="form-control" id="theme-name" required>
                </div>
                <div class="mb-3">
                    <label for="theme-information" class="form-label">Informatie</label>
                    <textarea class="form-control" id="theme-information" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Voeg toe</button>
                <button type="button" class="btn btn-secondary" id="cancel-button">Annuleer</button>
            </form>
        `;
}

// Loads the mainthemes and shows the right page.
export function loadMainThemes() {
    const scriptElement = document.getElementById('main-theme-page-script');
    const projectId = scriptElement?.dataset.projectId;
    window.location.href = '/Projects?projectid=' + projectId;
}