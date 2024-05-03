var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
export class mainTheme {
    constructor(name, information) {
        this.themeName = name;
        this.mainThemeInformation = information;
    }
}
console.log('The themecreation.ts script bundle has been loaded!');
(_a = document.getElementById('add-theme-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    var _a, _b;
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
        const projectId = scriptElement === null || scriptElement === void 0 ? void 0 : scriptElement.getAttribute('data-project-id');
        (_a = document.getElementById('cancel-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', loadMainThemes);
        (_b = document.getElementById('new-theme-form')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', function (event) {
            return __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                const themeNameInput = document.getElementById('themeName');
                const themeInformationInput = document.getElementById('themeInformation');
                if (!themeNameInput || !themeInformationInput)
                    return;
                console.log(projectId);
                const themeName = themeNameInput.value;
                const themeInformation = themeInformationInput.value;
                const theme = {
                    themeName: themeName,
                    mainThemeInformation: themeInformation
                };
                console.log(theme);
                const response = yield fetch('/api/ThemeCreation/AddThemeToBackoffice', {
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
                }
                else {
                    alert('Failed to add theme');
                }
            });
        });
    }
});
export function loadMainThemes() {
    window.location.href = window.location.href;
}
