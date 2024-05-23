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
console.log("addnotes script geladen");
export class Note {
    constructor(questionId, noteDescription) {
        this.QuestionId = questionId;
        this.Description = noteDescription;
    }
}
(_a = document.getElementById("submitNote")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("button clicked");
        const submitButton = document.getElementById("submitNote");
        const noteDescription = document.getElementById("questionNote").value;
        const questionText = document.getElementById("questionText");
        if (submitButton) {
            const questionId = questionText.getAttribute("questionId");
            if (questionId) {
                const newNote = new Note(parseInt(questionId), noteDescription);
                console.log(newNote);
                const response = yield fetch('/api/Notes/PostNote', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        QuestionId: newNote.QuestionId,
                        Description: newNote.Description
                    })
                });
                if (response.ok) {
                    const data = yield response.json();
                    console.log('Success:', data);
                }
                else {
                    console.error('Failed to post note:', response.statusText);
                }
            }
        }
    });
});
