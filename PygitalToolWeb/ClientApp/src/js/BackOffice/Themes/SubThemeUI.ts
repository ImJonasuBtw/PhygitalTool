
import {subTheme} from "./SubThemeCreation";
import {updateSubtheme} from "./SubThemeRestClient";
export function showEditSubThemeForm(subthemeId: number): void {
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

export function loadSubThemes() {
    window.location.href = window.location.href;
}