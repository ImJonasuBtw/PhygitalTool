import {Project} from "./projectCreation";


export function renderEditProjectForm(container: { innerHTML: string; }, project: Project) {
    container.innerHTML = `
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
}

export function renderAddProjectForm(container: { innerHTML: string; }) {
    container.innerHTML = `
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
}
export function loadProjects() {
    window.location.href = '/BackOffice';
}