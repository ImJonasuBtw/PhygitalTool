console.log("Supervisor script loaded");
const scriptElement = document.getElementById('supervisor-script');
const backOfficeId = scriptElement?.getAttribute('data-backoffice-id');

interface Supervisor {
    id: number;
    email: string;
    imageUrl: string;
}

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.textContent && link.textContent.trim() === "Begeleiders") {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                loadSupervisors(Number(backOfficeId));
            });
        }
    });
});


function loadSupervisors(backofficeId: number) {
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


function addSupervisor() {
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        projectsContainer.innerHTML = `
            <h3>Add New Supervisor</h3>
            <form id="supervisorForm" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="userName">Name:</label>
                    <input type="text" class="form-control" id="userName" name="userName" required>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" class="form-control" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" class="form-control" id="password" name="password" required>
                </div>
            <div class="form-group">
                  <label for="file">Profile Image:</label>
                  <input type="file" class="form-control" id="file" name="file" accept=".jpg,.jpeg,.png">
            </div>

                
                <button type="submit" class="btn btn-primary">Add Supervisor</button>
                <button type="button" class="btn btn-secondary" id="cancelButton">Cancel</button>
            </form>
        `;

        const form = document.getElementById("supervisorForm");
        if (form) {
            form.onsubmit = async function (event) {
                event.preventDefault();
                await submitSupervisorForm();
            };
        } else {
            console.error('The form element was not found in the DOM.');
        }

        const cancelButton = document.getElementById("cancelButton");
        if (cancelButton) {
            cancelButton.onclick = function () {
                if (backOfficeId) {
                    loadSupervisors(Number(backOfficeId));
                } else {
                    console.error('backOfficeId is not found or is invalid.');
                }
            };
        } else {
            console.error('The cancel button was not found in the DOM.');
        }
    } else {
        console.error('The projects container was not found in the DOM.');
    }
}

async function submitSupervisorForm() {
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


