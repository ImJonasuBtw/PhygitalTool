"use strict";
document.addEventListener("DOMContentLoaded", () => {
    console.log('The activeProjects.ts script bundle has been loaded!');
    // Handle showing and hiding projects based on toggle switch
    const toggleShowProjectsInput = document.getElementById("toggle-show-projects");
    const projectsContainer = document.getElementById("projects-container");
    if (toggleShowProjectsInput && projectsContainer) {
        toggleShowProjectsInput.addEventListener("change", () => {
            const showOnlyActiveProjects = toggleShowProjectsInput.checked;
            const projects = projectsContainer.querySelectorAll(".card");
            projects.forEach((project) => {
                var _a;
                const statusBadge = project.querySelector(".project-status");
                if (statusBadge) {
                    const status = (_a = statusBadge.textContent) === null || _a === void 0 ? void 0 : _a.trim();
                    const isActive = status === "Active";
                    if (showOnlyActiveProjects && !isActive) {
                        project.style.display = "none";
                    }
                    else {
                        project.style.display = "";
                    }
                }
            });
        });
    }
    // Make entire card clickable, redirecting to a specified URL, unless the click is on a button
    document.querySelectorAll('.clickable').forEach(card => {
        card.addEventListener('click', (event) => {
            const target = event.target;
            if (!target.closest('button')) {
                const url = card.getAttribute('data-href');
                if (url) {
                    window.location.href = url;
                }
            }
        });
    });
    // Sidebar toggle functionality
    const toggleButton = document.querySelector('.toggle-sidebar-button');
    const sidebar = document.querySelector('.sidebar');
    if (toggleButton && sidebar) {
        toggleButton.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            if (projectsContainer) {
                projectsContainer.classList.toggle('sidebar-active');
            }
        });
    }
});
