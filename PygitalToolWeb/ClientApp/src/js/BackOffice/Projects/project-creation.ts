import {Modal} from "bootstrap";
import {loadProjects, renderAddProjectForm} from "./project-ui";
import {AddFormSubmit, deleteProject, showEditProjectForm} from "./project-restclient";


export class Project {
    public description: string;
    public projectName: string;

    constructor(description: string, projectName: string) {
        this.description = description;
        this.projectName = projectName;
    }
}


// Sets up the event listener for adding a new project by rendering the add project form and handling form submission.
function setupAddProjectButton(): void {
    document.getElementById('add-project-button')?.addEventListener('click', () => {
        const projectsContainer = document.getElementById('projects-container');
        if (projectsContainer) {
            renderAddProjectForm(projectsContainer);
            const scriptElement = document.getElementById('backoffice-script');
            const backOfficeId = scriptElement?.dataset.backofficeId;

            document.getElementById('cancel-button-add')?.addEventListener('click', loadProjects);
            document.getElementById('new-project-form')?.addEventListener('submit', async function (event) {
                event.preventDefault();
                await AddFormSubmit(backOfficeId);
            });
        }
    });
}

// Sets up the confirmation modal for deleting projects.
function setupConfirmationModal(): void {
    const confirmationModal = document.getElementById('confirmation-modal');
    confirmationModal?.addEventListener('show.bs.modal', (event: any) => {
        const button = event.relatedTarget as HTMLElement;
        const projectId = button.getAttribute('data-project-id');
        const confirmDeleteButton = document.getElementById('delete-confirm') as HTMLButtonElement;
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
}

// Sets up event listeners for interacting with project containers, such as editing and viewing results.
function setupProjectContainer(): void {
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
            const isResultsBtn = target.closest('.results-btn');
            if (isResultsBtn) {
                let url = isResultsBtn.getAttribute('data-href');
                if (url !== null) {
                    window.location.href = url;
                } else {
                    console.error("Data-href attribute is null");
                }
            }
        });
    }
}

// Sets up a toggle feature to show/hide projects based on their active status.
function setupShowProjectsToggle(): void {
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
}

// Makes cards clickable, redirecting to the specified URL when clicked, unless a button is clicked within the card.
function makeCardClickable(): void {
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
}

// Toggles the sidebar's visibility and adjusts the layout of the projects container accordingly.
function setupSidebarToggle(): void {
    const toggleButton = document.querySelector('.toggle-sidebar-button') as HTMLButtonElement | null;
    const sidebar = document.querySelector('.sidebar') as HTMLElement | null;
    if (toggleButton && sidebar) {
        toggleButton.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            const projectsContainer = document.getElementById("projects-container");
            if (projectsContainer) {
                projectsContainer.classList.toggle('sidebar-active');
            }
        });
    }
}

// Sets up DOM elements and event listeners for project management: adding projects, confirming deletion, editing projects, toggling project visibility, making project cards clickable, and toggling the sidebar.
export function loadDOMs(): void {
    setupAddProjectButton();
    setupConfirmationModal();
    setupProjectContainer();
    setupShowProjectsToggle();
    makeCardClickable();
    setupSidebarToggle();
}




