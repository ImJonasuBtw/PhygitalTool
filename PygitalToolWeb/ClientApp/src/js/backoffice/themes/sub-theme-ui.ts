
import {subTheme} from "./sub-theme-creation";

// Creates a edit form for a subtheme and adds it to the HTML.
export function ShowEditForm(subthemesContainer: HTMLElement, subTheme : subTheme){
    subthemesContainer.innerHTML = `
                    <h2 class="mt-4">Subthema aanpassen</h2>
                    <form id="edit-subtheme-form">
                        <div class="mb-3">
                            <label for="subtheme-name" class="form-label">Subthema naam</label>
                            <input type="text" class="form-control" id="subtheme-name" required value="${subTheme.subThemeName}">
                        </div>
                        <div class="mb-3">
                            <label for="subtheme-information" class="form-label">Informatie</label>
                            <textarea class="form-control" id="information" required>${subTheme.subThemeInformation}</textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Update subthema</button>
                        <button type="button" class="btn btn-secondary" id="cancel-button">Annuleer</button>
                    </form>
                `;
}

// Creates a form to add a subtheme and adds it to the HTML.
export function ShowAddForm(subThemasContainer: HTMLElement){
    subThemasContainer.innerHTML = `
            <h2 class="mt-4">Voeg nieuw subthema toe</h2>
            <form id="new-project-form">
                <div class="mb-3">
                    <label for="sub-theme-name" class="form-label">Subthema naam</label>
                    <input type="text" class="form-control" id="sub-theme-name" required>
                </div>
                <div class="mb-3">
                    <label for="sub-theme-information" class="form-label">Subthema informatie</label>
                    <textarea class="form-control" id="sub-theme-information" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Subthema toevoegen</button>
                <button type="button" class="btn btn-secondary" id="cancel-button">Annuleer</button>
            </form>
        `;
}

// Loads the subthemes and shows the right page.
export function loadSubThemes() {
    const scriptElement = document.getElementById('sub-theme-page-script');
    const mainThemeId = scriptElement?.dataset.mainthemeId;
    window.location.href = '/Themes?themeid='+ mainThemeId;
}