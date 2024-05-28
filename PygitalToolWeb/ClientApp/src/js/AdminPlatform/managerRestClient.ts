import { Managers} from "./managers";
import {validatePassword, handleResponse} from "./managerValidation";
import {renderManagers} from "./managerUI";

// Loads managers from the server and renders them.
export async function loadManagers(): Promise<void> {
    try {
        const response = await fetch('/api/Managers/GetManagers/');
        if (!response.ok) {
            new Error('Error loading managers');
        }
        const managers: Managers[] = await response.json();
        renderManagers(managers);
    } catch (error) {
        
    }
}

// Uploads a file to the server and returns the URL if successful, otherwise returns null.
async function uploadFile(formData: FormData): Promise<string | null> {
    try {
        const fileResponse = await fetch('/api/files/uploadFile', {
            method: 'POST',
            body: formData
        });
        const fileResult = await fileResponse.json();
        return fileResult && fileResult.url;
    } catch (error) {
        return null;
    }
}

// Adds a new manager to the server.
async function addManager(managerData: any): Promise<Response> {
    try {
        return await fetch('/api/Managers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(managerData)
        });
    } catch (error) {
        throw error;
    }
}


// Submits the managers form data to add a new manager.
export async function submitManagersForm(): Promise<void> {
    try {
        const form = document.getElementById('managersForm') as HTMLFormElement;
        const formData = new FormData(form);
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        const userName = (document.getElementById('userName') as HTMLInputElement).value;
        const backofficeId: number = Number((document.getElementById('backoffice') as HTMLSelectElement).value);

        if (!validatePassword(password)) {
            alert('Het wachtwoord moet minstens één hoofdletter, één kleine letter en één niet-alfabetisch teken bevatten.');
            return;
        }
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (!fileInput.files || fileInput.files.length === 0) {
            alert("Geef een profielfoto mee");
            return;
        }
        formData.append('file', fileInput.files[0]);
        const imageUrl = await uploadFile(formData);
        if (!imageUrl) {
            alert("Er is een fout opgetreden bij het uploaden van het bestand");
            return;
        }
        const response = await addManager({
            email,
            password,
            imageUrl,
            userName,
            backofficeId
        });
        await handleResponse(response);
    } catch (error) {
        console.error('Error:', error);
    }
}


// Fetches backoffices from the server and populates the backoffice select element.
export function fetchBackOffices() {
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
