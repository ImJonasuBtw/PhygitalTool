console.log("addnotes script geladen");

export class Note {
    public QuestionId: number | undefined;
    public Description: string | undefined;

    constructor(questionId: number, noteDescription: string) {
        this.QuestionId = questionId;
        this.Description = noteDescription;
    }
}

document.getElementById("submitNote")?.addEventListener('click', async function (event) {
    event.preventDefault();
    const submitButton = document.getElementById("submitNote") as HTMLButtonElement;
    const noteDescription = document.getElementById("questionNote") as HTMLInputElement;
    const questionText = document.getElementById("questionText") as HTMLButtonElement;

    console.log(noteDescription.value);
    if (submitButton) {
        const questionId = questionText.getAttribute("questionId");
        if (questionId) {
            const newNote = new Note(parseInt(questionId), noteDescription.value);
            try {
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
                        console.log('Success:', data);
                    }
                } else {
                    console.error('Failed to post note:', response.statusText);
                }
            } catch (error) {
                console.error('Error posting note:', error);
            }
        }
    }
});
