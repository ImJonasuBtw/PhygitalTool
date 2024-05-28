import {Note} from "./notes";
import {NotesHtml} from "./notes-ui";

// Posts a new note to the server and handles the response.
export async function AddNote(newNote: Note, noteDescription: HTMLInputElement ): Promise<void> {
    const response = await fetch('/api/Notes/PostNote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            QuestionId: newNote.QuestionId,
            Description: newNote.Description
        })
    });
    console.log(response);
    if (response.ok) {
        noteDescription.value = "";
        const responseText = await response.text();
        if (responseText) {
            const data = JSON.parse(responseText);
        }
    } else {
        console.error('Failed to post note:', response.statusText);
    }
}


// Loads notes from the server and displays them on the page.
export function loadNotes() {
    fetch('/api/Notes/GetNotes')
        .then(response => response.json())
        .then((notes) => {
            const projectsContainer = document.getElementById('projects-container');
            const displayedQuestions = new Set();
            if (projectsContainer) {
                NotesHtml(projectsContainer,displayedQuestions,notes)
            }
        })
        .catch(error => console.error('Error loading notes:', error));
}