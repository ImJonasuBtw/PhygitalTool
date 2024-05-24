"use strict";
console.log("show notes geladen");
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
        var _a;
        const projectsContainer = document.getElementById('projects-container');
        if (projectsContainer) {
            projectsContainer.innerHTML = `
                <h2>Notities</h2>
                <div class="list-group">
                    ${notes.map((note) => `
                         <p id="note_questionId"  class="text-body"> ${note.Description}</p>
                    `).join('')}
                </div>
                `;
            (_a = document.getElementById('add-supervisor-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', addSupervisor);
        }
    })
        .catch(error => console.error('Error loading supervisors:', error));
}
