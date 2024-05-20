import {backOfficeId, Supervisor} from "./Supervisors";
import {addSupervisor} from "./SuperVisorsUI";
import {validatePassword} from "../../validation";



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
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        const userName = (document.getElementById('userName') as HTMLInputElement).value;

        if (!validatePassword(password)) {
            alert('Password must contain at least one uppercase letter, one lowercase letter, and one non-alphabetic character.');
            return;
        }
        
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        let imageUrl = null;
        if (fileInput.files && fileInput.files.length > 0) {
           
            formData.append('file', fileInput.files[0]);
        
            const fileResponse = await fetch('/api/files/uploadFile', {
                method: 'POST',
                body: formData
             });
            const fileResult = await fileResponse.json();
            if (fileResult && fileResult.url) {
                imageUrl = fileResult.url;
            }
        } else {
            alert("Geef een profielfoto mee");
            return;
        }
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

        if (!supervisorResponse.ok) {
            if (supervisorResponse.status === 400) {
                alert(`Failed to add supervisor: Email already exists`);
            } else if (supervisorResponse.status === 409) {
                alert('Failed to add supervisor: Email already exists.');
                
            }
        
            return;
        }
        const data = await supervisorResponse.json();
        console.log('Success:', data);
        alert('Supervisor added successfully!');
        loadSupervisors(Number(backOfficeId));
    } catch (error) {
        console.error('Error:', error);
    }
}