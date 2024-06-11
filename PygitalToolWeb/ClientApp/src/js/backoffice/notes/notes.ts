import {AddNote, loadNotes} from "./notes-restclient";
import {loadSupervisors} from "../supervisors/supervisors-restclient";
import {backOfficeId} from "../supervisors/supervisors";

console.log("notes script jaaa")

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
    document.getElementById("submit-note")?.addEventListener('click', async function (event) {
        event.preventDefault();
        console.log("button geklikt")
        const noteDescription = document.getElementById("question-note") as HTMLInputElement;
        const questionText = document.getElementById("question-text") as HTMLButtonElement;

        if (!noteDescription.value.trim()) {
            alert("Vul de notitie in")
            return;
        }
        const questionId = questionText.getAttribute("questionid");
        console.log(questionId)
        if (questionId) {
            const newNote = new Note(parseInt(questionId), noteDescription.value);
            try {
                console.log(newNote, noteDescription)
                if(newNote.QuestionId){
                    await AddNote(newNote, noteDescription);
                }
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

    document.addEventListener('DOMContentLoaded', () => {
        const projectenButton = document.getElementById('projecten-button');
        if(projectenButton){
            projectenButton.addEventListener('click', () => {
                window.location.href = '/BackOffice/index';
            });
        }
    });
}
// Sets up the necessary event listeners for handling note submissions and loading notes.
export function LoadDomsNotes(){
    setupSubmitNoteButton();
    setupNavLinks();
}
