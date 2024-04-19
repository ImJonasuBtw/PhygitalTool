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
                        project.setAttribute("hidden", "true"); // Verberg project
                    } else {
                        project.removeAttribute("hidden"); // Toon project
                    }
                }
            });
        });
    }
});
