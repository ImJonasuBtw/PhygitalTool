"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
// Define a class to structure the project data
class Project {
    constructor(description, projectName) {
        this.description = description;
        this.projectName = projectName;
    }
}
console.log('The project.ts script bundle has been loaded!');
(_a = document.getElementById('add-project-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    var _a, _b;
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
        const backOfficeId = scriptElement === null || scriptElement === void 0 ? void 0 : scriptElement.getAttribute('data-backoffice-id');
        (_a = document.getElementById('cancel-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', loadProjects);
        (_b = document.getElementById('new-project-form')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', function (event) {
            return __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                const projectNameInput = document.getElementById('projectName');
                const descriptionInput = document.getElementById('description');
                if (!projectNameInput || !descriptionInput)
                    return;
                const projectName = projectNameInput.value;
                const description = descriptionInput.value;
                const newProject = new Project(description, projectName);
                const response = yield fetch('/api/ProjectCreation/AddProjectToBackoffice', {
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
                }
                else {
                    alert('Failed to add project');
                }
            });
        });
    }
});
function loadProjects() {
    window.location.href = window.location.href;
}
document.addEventListener('DOMContentLoaded', () => {
    const confirmationModal = document.getElementById('confirmationModal');
    confirmationModal === null || confirmationModal === void 0 ? void 0 : confirmationModal.addEventListener('show.bs.modal', (event) => {
        const button = event.relatedTarget;
        const projectId = button.getAttribute('data-project-id');
        const confirmDeleteButton = document.getElementById('delete-confirm');
        console.log("Modal shown, project ID:", projectId);
        confirmDeleteButton.onclick = () => {
            if (projectId) {
                deleteProject(parseInt(projectId));
                const modalInstance = bootstrap.Modal.getInstance(confirmationModal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }
        };
    });
});
function deleteProject(projectId) {
    fetch(`/api/ProjectCreation/DeleteProject/` + projectId, {
        method: 'DELETE'
    });
    loadProjects();
}
