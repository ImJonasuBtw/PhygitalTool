
import {subTheme} from "./subThemeCreation";


export function ShowEditForm(subthemesContainer: HTMLElement, subTheme : subTheme){
    subthemesContainer.innerHTML = `
                    <h2 class="mt-4">Subthema aanpassen</h2>
                    <form id="edit-subtheme-form">
                        <div class="mb-3">
                            <label for="subtheme-name" class="form-label">Subthema Naam</label>
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

export function ShowAddForm(subThemasContainer: HTMLElement){
    subThemasContainer.innerHTML = `
            <h2 class="mt-4">Voeg nieuw subthema toe</h2>
            <form id="new-project-form">
                <div class="mb-3">
                    <label for="subThemeName" class="form-label">Subthema Naam</label>
                    <input type="text" class="form-control" id="subThemeName" required>
                </div>
                <div class="mb-3">
                    <label for="subThemeInformation" class="form-label">Subthema informatie</label>
                    <textarea class="form-control" id="subThemeInformation" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Subthema toevoegen</button>
                <button type="button" class="btn btn-secondary" id="cancel-button">Annuleer</button>
            </form>
        `;
}
export function loadSubThemes() {

    const scriptElement = document.getElementById('subThemePage-script');
    const mainThemeId = scriptElement?.dataset.mainthemeId;
    window.location.href = '/Themes?themeid='+ mainThemeId;
}