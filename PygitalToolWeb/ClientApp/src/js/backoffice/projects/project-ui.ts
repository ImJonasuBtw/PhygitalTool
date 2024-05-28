import {Project} from "./project-creation";

// Renders an edit project form with project details.
export function renderEditProjectForm(container: { innerHTML: string; }, project: Project) {
    container.innerHTML = `
                    <h2 class="mt-4">Edit Project</h2>
                    <form id="edit-project-form">
                        <div class="mb-3">
                            <label for="project-name" class="form-label">Project Naam</label>
                            <input type="text" class="form-control" id="project-name" required value="${project.projectName}">
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">beschrijving</label>
                            <textarea class="form-control" id="description" required>${project.description}</textarea>
                        </div>
                             <div class="mb-3">
                            <label for="status-select" class="form-label">Status</label>
                            <select class="form-control" id="status-select">
                                <option value="Active" >Actief</option>
                                <option value="NonActive">Niet Actief</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Update Project</button>
                        <button type="button" class="btn btn-secondary" id="cancel-button">annuleer</button>
                    </form>
                `;
}

// Renders a form for adding a new project.
export function renderAddProjectForm(container: { innerHTML: string; }) {
    container.innerHTML = `
            <h2 class="mt-4">Voeg nieuw Project toe</h2>
            <form id="new-project-form">
                <div class="mb-3">
                    <label for="project-name" class="form-label">Project naam</label>
                    <input type="text" class="form-control" id="project-name" required>
                     <span id="project-name-error" class="text-danger"></span>
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Beschrijving</label>
                    <textarea class="form-control" id="description" required></textarea>
                    <span id="description-error" class="text-danger"></span>
                </div>
                <button type="submit" class="btn btn-primary"> Voeg project toe</button>
                <button type="button" class="btn btn-secondary" id="cancel-button-add">annuleer</button>
            </form>
        `;
}

// Redirects the user to the '/BackOffice' page to load projects.
export function loadProjects() {
    window.location.href = '/BackOffice';
}