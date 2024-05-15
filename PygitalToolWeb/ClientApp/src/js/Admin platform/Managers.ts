console.log("Managers script loaded");
interface Managers {
    id: number;
    email: string;
    imageUrl: string;
}

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.textContent && link.textContent.trim() === "Beheerders") {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                loadManagers();
            });
        }
    });
});



function loadManagers() {
    fetch('/api/Managers/GetManagers/' )
        .then(response => response.json())
        .then((managers: Managers[]) => {
                const backOfficeContainer = document.getElementById('backoffice-container');
                if (backOfficeContainer) {
                    backOfficeContainer.innerHTML = `
                <h2>Beheerders</h2>
                <div class="list-group">
                    ${managers.map(sup => `
                        <div href="#" class="list-group-item list-group-item-action">
                            <img src="${sup.imageUrl}" alt="${sup.email}" class="img-thumbnail">
                            ${sup.email} 
                        </div>
                    `).join('')}
                </div>
                <button id="add-Manager-button" class="btn btn-primary">Beheerder Toevoegen</button>
                `;
                    document.getElementById('add-Manager-button')?.addEventListener('click', addManager);
                }
            }
        )
        .catch(error => console.error('Error loading managers:', error));
}

function addManager() {
    const backOfficeContainer = document.getElementById('backoffice-container');
    if (backOfficeContainer) {
        
        backOfficeContainer.innerHTML = `
            <h3>Voeg nieuwe begeleider toe</h3>
            <form id="managersForm" enctype="multipart/form-data">
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
                    <label for="backoffice">Backoffice:</label>
                     <select class="form-control" id="backoffice" name="backoffice" required>
                       
                    </select>
                </div>
            <div class="form-group">
                  <label for="file">Profile Image:</label>
                  <input type="file" class="form-control" id="file" name="file" accept=".jpg,.jpeg,.png">
            </div>

                
                <button type="submit" class="btn btn-primary">Beheerder toevoegen</button>
                <button type="button" class="btn btn-secondary" id="cancelButton">Annuleer</button>
            </form>
        `;
        fetchBackOffices()
        const form = document.getElementById("managersForm");
        if (form) {
            form.onsubmit = async function (event) {
                event.preventDefault();
                await submitManagersForm();
            };
        } else {
            console.error('The form element was not found in the DOM.');
        }

        const cancelButton = document.getElementById("cancelButton");
        if (cancelButton) {
            cancelButton.onclick = function () {
                if (backOfficeId) {
                    loadManagers();
                } else {
                    console.error('managers is not found or is invalid.');
                }
            };
        } else {
            console.error('The cancel button was not found in the DOM.');
        }
    } else {
        console.error('The Backoffice container was not found in the DOM.');
    }
}


async function submitManagersForm() {
    const form = document.getElementById('managersForm') as HTMLFormElement;
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
        const backofficeId : number = Number((document.getElementById('backoffice') as HTMLSelectElement).value);
        
        
        const Response = await fetch('/api/Managers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, password, imageUrl, userName,
                backofficeId
            })
        });
        const data = await Response.json();
        console.log('Success:', data);
        alert('Managers added successfully!');
        loadManagers();
    } catch (error) {
        console.error('Error:', error);
    }
}
function fetchBackOffices() {
    
    fetch('api/Backoffice/GetBackoffices')
        .then(response => response.json())
        .then(data => {
            const backOfficeSelect = document.getElementById('backoffice');
            if (backOfficeSelect) {
                data.forEach((backOffice: { backOfficeId: number; name: string | null; }) => {
                    const option = document.createElement('option');
                    option.value = String(backOffice.backOfficeId); 
                    option.textContent = backOffice.name; 
                    backOfficeSelect.appendChild(option);
                    
                });
            } else {
                console.error('The backoffice select element was not found in the DOM.');
            }
        })
        .catch(error => console.error('Error fetching backoffices:', error));
}