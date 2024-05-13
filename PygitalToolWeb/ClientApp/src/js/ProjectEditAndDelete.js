import { Modal } from "bootstrap";
import { loadProjects } from "./ProjectCreation";
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
                const modalInstance = Modal.getInstance(confirmationModal);
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
    }).then(response => {
        if (response.ok) {
            console.log('Project deleted successfully');
            loadProjects();
        }
        else {
            console.error('Failed to delete project');
            return response.text().then(text => Promise.reject(text));
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        projectsContainer.addEventListener('click', event => {
            const target = event.target;
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
            const target = event.target;
            const isResultsBtn = target.closest('.results-btn');
            if (isResultsBtn) {
                var url = isResultsBtn.getAttribute('data-href');
                if (url !== null) {
                    window.location.href = url;
                }
                else {
                    console.error("Data-href attribute is null");
                }
            }
        });
    }
});
function showEditProjectForm(projectId) {
    fetch(`/api/ProjectCreation/GetProjectDetails/` + projectId)
        .then(response => response.json())
        .then((project) => {
        var _a, _b;
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
            (_a = document.getElementById('cancel-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', loadProjects);
            (_b = document.getElementById('edit-project-form')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', function (event) {
                event.preventDefault();
                updateProject(projectId);
            });
        }
    })
        .catch(error => console.error('Failed to fetch project details:', error));
}
function updateProject(projectId) {
    const projectNameInput = document.getElementById('projectName');
    const descriptionInput = document.getElementById('description');
    const statusSelect = document.getElementById('statusSelect');
    console.log("Selected status: " + statusSelect.value);
    console.log("stat select: " + statusSelect.value);
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
        }
        else {
            console.error('Failed to update project');
            response.text().then(text => alert('Failed to update project: ' + text));
        }
    })
        .catch(error => {
        console.error('Error updating project:', error);
        alert('Error updating project: ' + error);
    });
}
