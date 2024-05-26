import {AddNote, loadNotes} from "./notesRestClient";


console.log("addnotes script geladen");

export class Note {
    public QuestionId: number | undefined;
    public Description: string | undefined;

    constructor(questionId: number, noteDescription: string) {
        this.QuestionId = questionId;
        this.Description = noteDescription;
    }
}

function setupSubmitNoteButton() {
    document.getElementById("submitNote")?.addEventListener('click', async function (event) {
        event.preventDefault();
        const noteDescription = document.getElementById("questionNote") as HTMLInputElement;
        const questionText = document.getElementById("questionText") as HTMLButtonElement;

        if (!noteDescription.value.trim()) {
           alert("Vul de notitie in")
            return;
        }

        const questionId = questionText.getAttribute("questionId");
        if (questionId) {
            const newNote = new Note(parseInt(questionId), noteDescription.value);
            try {
                await AddNote(newNote, noteDescription);
            } catch (error) {
                console.error('Error posting note:', error);
            }
        }
    });
}

function setupNavLinks() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.textContent && link.textContent.trim() === "Notities") {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                console.log("laad notities geklikt");
                loadNotes();
            });
        }
    });
}
export function LoadDomsNotes(){
    setupSubmitNoteButton();
    setupNavLinks();
}
