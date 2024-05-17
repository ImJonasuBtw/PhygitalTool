import {backOfficeId, Supervisor} from "./Supervisors";
import {addSupervisor} from "./SuperVisorsUI";

export function loadSupervisors(backofficeId: number) {
    console.log(backofficeId);
    fetch('/api/supervisors/Getsupervisors/' + backofficeId)
        .then(response => response.json())
        .then((supervisors: Supervisor[]) => {
                const projectsContainer = document.getElementById('projects-container');
                if (projectsContainer) {
                    projectsContainer.innerHTML = `
                <h2>Begeleiders</h2>
                <div class="list-group">
                    ${supervisors.map(sup => `
                        <div href="#" class="list-group-item list-group-item-action">
                            <img src="${sup.imageUrl}" alt="${sup.email}" class="img-thumbnail">
                            ${sup.email} 
                        </div>
                    `).join('')}
                </div>
                <button id="add-supervisor-button" class="btn btn-primary">Add Begeleider</button>
                `;

                    document.getElementById('add-supervisor-button')?.addEventListener('click', addSupervisor);
                }
            }
        )
        .catch(error => console.error('Error loading supervisors:', error));
}

export async function submitSupervisorForm() {
    const form = document.getElementById('supervisorForm') as HTMLFormElement;
    const formData = new FormData(form);
    try {
        const fileResponse = await fetch('/api/files/uploadFile', {
            method: 'POST',
            body: formData
        });
        const fileResult = await fileResponse.json();
        const imageUrl = fileResult.url;

        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        const userName = (document.getElementById('userName') as HTMLInputElement).value;
        const supervisorResponse = await fetch('/api/supervisors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, password, imageUrl, userName,
                BackOfficeId: Number(backOfficeId)
            })
        });
        const data = await supervisorResponse.json();
        console.log('Success:', data);
        alert('Supervisor added successfully!');
        loadSupervisors(Number(backOfficeId));
    } catch (error) {
        console.error('Error:', error);
    }
}