import {updateMaintheme} from "./ThemeRestClient";
import {mainTheme} from "./ThemeCreation";

export function showEditMainThemeForm(mainthemeId: number): void {
    console.log(mainthemeId);
    fetch(`/api/ThemeCreation/GetMainThemeDetails/` + mainthemeId)
        .then(response => response.json())
        .then((mainTheme: mainTheme) => {
            console.log(mainTheme)
            const mainthemesContainer = document.getElementById('themes-container');
            if (mainthemesContainer) {

                const formHtml = `
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
                mainthemesContainer.innerHTML = formHtml;}
            document.getElementById('cancel-button')?.addEventListener('click', loadMainThemes);
            document.getElementById('edit-maintheme-form')?.addEventListener('submit', function (event) {
                event.preventDefault();
                updateMaintheme(mainthemeId);
            });

        })

}

export function loadMainThemes() {
    window.location.href = window.location.href;
}