import {AddNote, loadNotes} from "./notesRestClient";

export class Note {
    public QuestionId: number | undefined;
    public Description: string | undefined;

    constructor(questionId: number, noteDescription: string) {
        this.QuestionId = questionId;
        this.Description = noteDescription;
    }
}

// Handles the submission of a note, ensuring the note description is filled, retrieving the question ID, creating a note object, and attempting to add it. Any errors are logged.
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

// Sets up navigation links, specifically targeting the "Notities" link to load notes when clicked.
function setupNavLinks() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.textContent && link.textContent.trim() === "Notities") {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                loadNotes();
            });
        }
    });
}

// Sets up the necessary event listeners for handling note submissions and loading notes.
export function LoadDomsNotes(){
    setupSubmitNoteButton();
    setupNavLinks();
}
