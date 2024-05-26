import {mainTheme} from "./themeCreation";


export function getEditMainThemeFormHtml(mainthemesContainer: { innerHTML: string; }, mainTheme : mainTheme ):void  {
    mainthemesContainer.innerHTML = `
            <h2 class="mt-4">Edit Maintheme</h2>
            <form id="edit-maintheme-form">
                <div class="mb-3">
                    <label for="new-maintheme-name" class="form-label">Naam van Hoofdthema</label>
                   
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
export function getAddMainThemeFormHtml(themesContainer: { innerHTML: string; } ):void  {
    themesContainer.innerHTML = `
            <h2 class="mt-4">voeg nieuw thema toe</h2>
            <form id="new-theme-form">
                <div class="mb-3">
                    <label for="themeName" class="form-label">Hoofdthema Naam</label>
                    <input type="text" class="form-control" id="themeName" required>
                </div>
                <div class="mb-3">
                    <label for="themeInformation" class="form-label">Informatie</label>
                    <textarea class="form-control" id="themeInformation" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Voeg Toe</button>
                <button type="button" class="btn btn-secondary" id="cancel-button">Annuleer</button>
            </form>
        `;
}


export function loadMainThemes() {
    window.location.href = window.location.href;
}