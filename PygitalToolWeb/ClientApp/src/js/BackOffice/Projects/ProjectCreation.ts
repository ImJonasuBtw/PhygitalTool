import {Modal} from "bootstrap";
import {loadProjects, showEditProjectForm} from "./ProjectUI";
import {deleteProject} from "./ProjectRestClient";

export class Project {
    public description: string;
    public projectName: string;

    constructor(description: string, projectName: string) {
        this.description = description;
        this.projectName = projectName;
    }
}

document.getElementById('add-project-button')?.addEventListener('click', () => {
    console.log('Add button has been pressed!');
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        projectsContainer.innerHTML = `
            <h2 class="mt-4">Voeg nieuw Project toe</h2>
            <form id="new-project-form">
                <div class="mb-3">
                    <label for="projectName" class="form-label">Project naam</label>
                    <input type="text" class="form-control" id="projectName" required>
                     <span id="projectNameError" class="text-danger"></span>
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Beschrijving</label>
                    <textarea class="form-control" id="description" required></textarea>
                    <span id="descriptionError" class="text-danger"></span>
                </div>
                <button type="submit" class="btn btn-primary"> Voeg project toe</button>
                <button type="button" class="btn btn-secondary" id="cancel-buttonAdd">annuleer</button>
            </form>
        `;

        const scriptElement = document.getElementById('backOfficeHomePage-script');
        const backOfficeId = scriptElement?.dataset.backofficeId;

        document.getElementById('cancel-buttonAdd')?.addEventListener('click', loadProjects);
        document.getElementById('new-project-form')?.addEventListener('submit', async function (event) {
            event.preventDefault();
            const projectNameInput = document.getElementById('projectName') as HTMLInputElement;
            const descriptionInput = document.getElementById('description') as HTMLTextAreaElement;
            if (!projectNameInput || !descriptionInput) return;

            const projectName = projectNameInput.value;
            const description = descriptionInput.value;
            const newProject = new Project(description, projectName);

            const response = await fetch('/api/ProjectCreation/AddProjectToBackoffice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    projectName: newProject.projectName,
                    description: newProject.description,
                    backOfficeId: backOfficeId
                })
            });

            if (response.ok) {
                loadProjects();
            } else {
                if (response.status === 400) {
                    const errorData = await response.json();
                    if (errorData && errorData.errors) {
                        for (const key in errorData.errors) {
                            if (errorData.errors.hasOwnProperty(key)) {
                                const errorMessage = errorData.errors[key];
                                alert(errorMessage);
                            }
                        }
                    } else {
                        alert('Er is een validatiefout opgetreden.');
                    }
                } else {
                    response.text().then(text => alert('Project niet toegevoegd: ' + text));
                }
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const confirmationModal = document.getElementById('confirmationModal');
    confirmationModal?.addEventListener('show.bs.modal', (event: any) => {
        const button = event.relatedTarget as HTMLElement;
        const projectId = button.getAttribute('data-project-id');
        const confirmDeleteButton = document.getElementById('delete-confirm') as HTMLButtonElement;

        console.log("Modal shown, project ID:", projectId);

        confirmDeleteButton.onclick = () => {
            if (projectId) {
                deleteProject(parseInt(projectId));
                const modalInstance = Modal.getInstance(confirmationModal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }
        };
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        projectsContainer.addEventListener('click', event => {
            const target = event.target as HTMLElement;
            const isEditButton = target.closest('.edit-project-button');
            if (isEditButton) {
                const projectId = isEditButton.getAttribute('data-project-id');
                if (projectId) {
                    showEditProjectForm(parseInt(projectId));
                }
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        projectsContainer.addEventListener('click', event => {
            const target = event.target as HTMLElement;
            const isResultsBtn = target.closest('.results-btn');
            if (isResultsBtn) {
                var url = isResultsBtn.getAttribute('data-href');
                if (url !== null) {
                    window.location.href = url;
                } else {
                    console.error("Data-href attribute is null");
                }
            }
        });
    }
});


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



