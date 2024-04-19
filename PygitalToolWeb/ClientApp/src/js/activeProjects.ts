// activeProjects.ts
document.addEventListener("DOMContentLoaded", () => {
    console.log('The activeProjects.ts script bundle has been loaded!');

    // Handle showing and hiding projects based on toggle switch
    const toggleShowProjectsInput = document.getElementById("toggle-show-projects") as HTMLInputElement;
    const projectsContainer = document.getElementById("projects-container");

    if (toggleShowProjectsInput && projectsContainer) {
        toggleShowProjectsInput.addEventListener("change", () => {
            const showOnlyActiveProjects = toggleShowProjectsInput.checked;
            const projects = projectsContainer.querySelectorAll(".card");

            projects.forEach((project: Element) => {
                const statusBadge = project.querySelector(".project-status");

                if (statusBadge) {
                    const status = statusBadge.textContent?.trim(); 
                    const isActive = status === "Active";

                    if (showOnlyActiveProjects && !isActive) {
                        (project as HTMLElement).style.display = "none"; 
                    } else {
                        (project as HTMLElement).style.display = ""; 
                    }
                }
            });
        });
    }

    // Make entire card clickable, redirecting to a specified URL, unless the click is on a button
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

    // Sidebar toggle functionality
    const toggleButton = document.querySelector('.toggle-sidebar-button') as HTMLButtonElement | null;
    const sidebar = document.querySelector('.sidebar') as HTMLElement | null;

    if (toggleButton && sidebar) {
        toggleButton.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            if (projectsContainer) {
                projectsContainer.classList.toggle('sidebar-active');
            }
        });
    }
});
