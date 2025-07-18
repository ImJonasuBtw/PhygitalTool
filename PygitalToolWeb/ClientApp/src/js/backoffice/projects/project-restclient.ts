﻿import {loadProjects, renderEditProjectForm} from "./project-ui";
import {Project} from "./project-creation";
import {handleErrorResponse} from "../../admin-platform/backoffice-validation";

// Updates project details via PUT request, reloading projects on success or handling error responses.
export function updateProject(projectId: number): void {
    const projectNameInput = document.getElementById('project-name') as HTMLInputElement;
    const descriptionInput = document.getElementById('description') as HTMLTextAreaElement;
    const statusSelect = document.getElementById('status-select') as HTMLSelectElement;
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
        .then(async response => {
            if (response.ok) {
                console.log('Project updated successfully');
                loadProjects();
            } else {
                await handleErrorResponse(response)
            }
        })
        .catch(error => {
            console.error('Error updating project:', error);
            alert('Project kon niet worden bijgewerkt:' + error);
        });
}


// Deletes a project via DELETE request and reloads projects upon success.
export function deleteProject(projectId: number) {
    fetch(`/api/ProjectCreation/DeleteProject/` + projectId, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            loadProjects();
        } else {
            console.error('Failed to delete project');
            return response.text().then(text => Promise.reject(text));
        }
    })
}


// Fetches project details via GET, renders an edit form.
export function showEditProjectForm(projectId: number): void {
    fetch(`/api/ProjectCreation/GetProjectDetails/` + projectId)
        .then(response => response.json())
        .then((project: Project) => {
            const projectsContainer = document.getElementById('projects-container');
            if (projectsContainer) {
                renderEditProjectForm(projectsContainer, project)
                document.getElementById('cancel-button')?.addEventListener('click', loadProjects);
                document.getElementById('edit-project-form')?.addEventListener('submit', function (event) {
                    event.preventDefault();
                    updateProject(projectId);
                });
            }
        })
        .catch(error => console.error('Failed to fetch project details:', error));
}

// Handles form submission for adding a project, sending a POST request with the project details.
export async function AddFormSubmit(backOfficeId: string | null | undefined) {
    const projectNameInput = document.getElementById('project-name') as HTMLInputElement;
    const descriptionInput = document.getElementById('description') as HTMLTextAreaElement;
    if (!projectNameInput || !descriptionInput) return;

    const projectName = projectNameInput.value;
    const description = descriptionInput.value;
    const newProject = new Project(description, projectName);

    try {
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
            await handleErrorResponse(response)
        }
    } catch (error: any) {
        alert('Er is een fout opgetreden bij het toevoegen van de BackOffice: ' + error.message);
    }

}