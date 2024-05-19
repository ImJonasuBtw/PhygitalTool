import {loadProjects} from "./ProjectUI";



export   function updateProject(projectId: number): void {
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
        .then(async response => {
            if (response.ok) {
                console.log('Project updated successfully');
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
                        alert('Validation error occurred.');
                    }
                } else {
                    response.text().then(text => alert('Failed to update Project: ' + text));
                }
            }
        })
        .catch(error => {
            console.error('Error updating project:', error);
            alert('Error updating project: ' + error);
        });
}



export function deleteProject(projectId: number) {
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