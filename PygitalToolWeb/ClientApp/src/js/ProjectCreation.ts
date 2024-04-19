import { Modal } from "bootstrap";
class Project {
    public description: string;
    public projectName: string;

    constructor(description: string, projectName: string) {
        this.description = description;
        this.projectName = projectName;
    }
    
}


console.log('The project.ts script bundle has been loaded!');

document.getElementById('add-project-button')?.addEventListener('click', () => {
    console.log('Add button has been pressed!');
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        projectsContainer.innerHTML = `
            <h2 class="mt-4">Add New Project</h2>
            <form id="new-project-form">
                <div class="mb-3">
                    <label for="projectName" class="form-label">Project Name</label>
                    <input type="text" class="form-control" id="projectName" required>
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Add Project</button>
                <button type="button" class="btn btn-secondary" id="cancel-button">Cancel</button>
            </form>
        `;

        const scriptElement = document.getElementById('project-script');
        const backOfficeId = scriptElement?.getAttribute('data-backoffice-id');

        document.getElementById('cancel-button')?.addEventListener('click', loadProjects);
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
                alert('Failed to add project');
            }
        });
    }
});

function loadProjects() {
    window.location.href = window.location.href;
}

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

function deleteProject(projectId: number) {
    fetch(`/api/ProjectCreation/DeleteProject/` + projectId, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            console.log('Project deleted successfully');
            loadProjects();  
        } else {
            console.error('Failed to delete project');
            return response.text().then(text => Promise.reject(text));
        }
    })
}

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


function showEditProjectForm(projectId: number): void {
    fetch(`/api/ProjectCreation/GetProjectDetails/` + projectId)
        .then(response => response.json())
        .then((project: Project) => {
            const projectsContainer = document.getElementById('projects-container');
            if (projectsContainer) {
                projectsContainer.innerHTML = `
                    <h2 class="mt-4">Edit Project</h2>
                    <form id="edit-project-form">
                        <div class="mb-3">
                            <label for="projectName" class="form-label">Project Name</label>
                            <input type="text" class="form-control" id="projectName" required value="${project.projectName}">
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <textarea class="form-control" id="description" required>${project.description}</textarea>
                        </div>
                             <div class="mb-3">
                            <label for="statusSelect" class="form-label">Status</label>
                            <select class="form-control" id="statusSelect">
                                <option value="Active" >Active</option>
                                <option value="NonActive">Non Active</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Update Project</button>
                        <button type="button" class="btn btn-secondary" id="cancel-button">Cancel</button>
                    </form>
                `;
                document.getElementById('cancel-button')?.addEventListener('click', loadProjects);
                document.getElementById('edit-project-form')?.addEventListener('submit', function (event) {
                    event.preventDefault();
                    updateProject(projectId);
                });
            }
        })
        .catch(error => console.error('Failed to fetch project details:', error));
}


function updateProject(projectId: number): void {
    const projectNameInput = document.getElementById('projectName') as HTMLInputElement;
    const descriptionInput = document.getElementById('description') as HTMLTextAreaElement;
    const statusSelect = document.getElementById('statusSelect') as HTMLSelectElement;
    console.log("Selected status: " + statusSelect.value); 
    console.log("stat select: "+statusSelect.value)
    fetch(`/api/ProjectCreation/UpdateProject/` + projectId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            projectName: projectNameInput.value,
            description: descriptionInput.value,
            status: statusSelect.value === "Active" ? 0 : 1
        })
    })
        .then(response => {
            if (response.ok) {
                console.log('Project updated successfully');
                loadProjects();
            } else {
                console.error('Failed to update project');
                response.text().then(text => alert('Failed to update project: ' + text));
            }
        })
        .catch(error => {
            console.error('Error updating project:', error);
            alert('Error updating project: ' + error);
        });
}
