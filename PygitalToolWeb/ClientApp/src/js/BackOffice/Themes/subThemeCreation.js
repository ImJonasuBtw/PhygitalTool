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
export class subTheme {
    constructor(name, information) {
        this.subThemeName = name;
        this.subThemeInformation = information;
    }
}
console.log('The subthemeCreation.ts script bundle has been loaded!');
(_a = document.getElementById('add-subtheme-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    var _a, _b;
    console.log('Add button has been pressed!');
    const subThemasContainer = document.getElementById('subthemes-container');
    console.log(subThemasContainer);
    if (subThemasContainer) {
        subThemasContainer.innerHTML = `
            <h2 class="mt-4">Add New SubTheme</h2>
            <form id="new-project-form">
                <div class="mb-3">
                    <label for="subThemeName" class="form-label">Subtheme name</label>
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
        const scriptElement = document.getElementById('subThemePage-script');
        const mainThemeId = scriptElement === null || scriptElement === void 0 ? void 0 : scriptElement.dataset.mainthemeId;
        (_a = document.getElementById('cancel-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', loadSubThemes);
        (_b = document.getElementById('new-project-form')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', function (event) {
            return __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                const subThemeNameInput = document.getElementById('subThemeName');
                const subThemeInformationInput = document.getElementById('subThemeInformation');
                if (!subThemeNameInput || !subThemeInformationInput)
                    return;
                const subThemeName = subThemeNameInput.value;
                const subThemeInformation = subThemeInformationInput.value;
                const newSubTheme = new subTheme(subThemeName, subThemeInformation);
                console.log(mainThemeId);
                const response = yield fetch('/api/SubThemeCreation/AddSubThemeToBackoffice', {
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
                }
                else {
                    alert('Failed to add subtheme');
                }
            });
        });
    }
});
export function loadSubThemes() {
    window.location.href = window.location.href;
}
