// Generates HTML markup for displaying notes in the projects container.
export function NotesHtml(projectsContainer: HTMLElement, displayedQuestions: Set<unknown>, notes: {
    question: { questionId: unknown; questionText: any; };
    description: any;
}[]) {
    projectsContainer.innerHTML = `
                <h2>Notities</h2>
                <div class="list-group">
                    ${notes.map((note: {
        question: { questionId: unknown; questionText: any; };
        description: any;
    }) => {
        if (!displayedQuestions.has(note.question.questionId)) {
            displayedQuestions.add(note.question.questionId);
            return `
                                <div class="card">
                                <div class=" card-body note">
                                    <h5 class=" card-title text-body">Question: ${note.question.questionText}</h5>
                                    <p class="text-body">${note.description}</p>
                                </div>
                                </div>
                            `;
        } else {
            return `
                                <div class="card">
                                <div class="card-body note">
                                    <p class="text-body">${note.description}</p>
                                </div>
                                </div>
                            `;
        }
    }).join('')}
                </div>
                `;
}