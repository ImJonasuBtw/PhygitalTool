console.log("show notes geladen")


document.addEventListener('DOMContentLoaded', () => {
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
});

function loadNotes() {
    fetch('/api/Notes/GetNotes/')
        .then(response => response.json())
        .then((notes) => {
            console.log(notes);
            const projectsContainer = document.getElementById('projects-container');
            const displayedQuestions = new Set();
            if (projectsContainer) {
                projectsContainer.innerHTML = `
                <h2>Notities</h2>
                <div class="list-group">
                    ${notes.map((note: { question: { questionId: unknown; questionText: any; }; description: any; }) => {
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
        })
        .catch(error => console.error('Error loading notes:', error));
}


