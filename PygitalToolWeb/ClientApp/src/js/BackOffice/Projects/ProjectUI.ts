import {Project} from "./ProjectCreation";
import {updateProject} from "./ProjectRestClient";


export function showEditProjectForm(projectId: number): void {
    fetch(`/api/ProjectCreation/GetProjectDetails/` + projectId)
        .then(response => response.json())
        .then((project: Project) => {
            const projectsContainer = document.getElementById('projects-container');
            if (projectsContainer) {
                projectsContainer.innerHTML = `
                    <h2 class="mt-4">Edit Project</h2>
                    <form id="edit-project-form">
                        <div class="mb-3">
                            <label for="projectName" class="form-label">Project Naam</label>
                            <input type="text" class="form-control" id="projectName" required value="${project.projectName}">
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">beschrijving</label>
                            <textarea class="form-control" id="description" required>${project.description}</textarea>
                        </div>
                             <div class="mb-3">
                            <label for="statusSelect" class="form-label">Status</label>
                            <select class="form-control" id="statusSelect">
                                <option value="Active" >Actief</option>
                                <option value="NonActive">Niet Actief</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Update Project</button>
                        <button type="button" class="btn btn-secondary" id="cancel-button">annuleer</button>
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

export function loadProjects() {
    window.location.href = window.location.href;
}