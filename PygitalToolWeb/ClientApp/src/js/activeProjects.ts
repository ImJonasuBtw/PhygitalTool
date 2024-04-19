// activeProjects.ts

document.addEventListener("DOMContentLoaded", function () {
    console.log('The activeProjects.ts script bundle has been loaded!');

    const toggleShowProjectsInput = document.getElementById("toggle-show-projects") as HTMLInputElement;
    const projectsContainer = document.getElementById("projects-container");

    if (toggleShowProjectsInput && projectsContainer) {
        toggleShowProjectsInput.addEventListener("change", function () {
            const showOnlyActiveProjects = toggleShowProjectsInput.checked;

            const projects = projectsContainer.querySelectorAll(".card");

            projects.forEach(project => {
                const statusBadge = project.querySelector(".project-status");

                if (statusBadge) {
                    const status = statusBadge.textContent?.trim(); // Extract status text
                    const isActive = status === "Active";

                    if (showOnlyActiveProjects && !isActive) {
                        if (project instanceof HTMLElement) {
                            project.style.display = "none"; // Completely hide the project
                        }
                    } else {
                        if (project instanceof HTMLElement) {
                            project.style.display = ""; // Reset display property to default
                        }
                    }
                }
            });
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll<HTMLElement>('.clickable').forEach(card => {
        card.addEventListener('click', (event: MouseEvent) => {
            const target = event.target as HTMLElement; 
            
            if (!target.closest('button')) {
                const url = card.getAttribute('data-href'); 
                if (url) {
                    window.location.href = url; 
                }
            }
        });
    });
});
