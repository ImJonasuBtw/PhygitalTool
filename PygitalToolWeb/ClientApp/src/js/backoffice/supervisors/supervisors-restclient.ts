import {backOfficeId, Supervisor} from "./supervisors";
import {renderSupervisors} from "./supervisors-ui";
import {validatePassword,handleResponseSupervisor} from "./supervisors-validation";

// Loads the supervisors
export async function loadSupervisors(backofficeId: number | undefined): Promise<void> {
    try {
        const response = await fetch(`/api/supervisors/Getsupervisors/${backofficeId}`);
        if (response.status === 204) {
            renderSupervisors([]);
            return;
        }
        if (!response.ok) {
            
            console.error('Error loading supervisors:', response.statusText);
            return;
        }
        const supervisors: Supervisor[] = await response.json();
        renderSupervisors(supervisors);
    } catch (error) {
        console.error('Error loading supervisors:', error);
    }
}

// Uploads a file using FormData to a specified API endpoint (/api/files/uploadFile).
async function uploadFile(formData: FormData): Promise<string | null> {
    try {
        const fileResponse = await fetch('/api/files/uploadFile', {
            method: 'POST',
            body: formData
        });
        const fileResult = await fileResponse.json();
        return fileResult && fileResult.url;
    } catch (error) {
        console.error('Error uploading file:', error);
        return null;
    }
}

// Add a supervisor to the server.
async function addSupervisor(supervisorData: any): Promise<Response> {
    try {
        return await fetch('/api/supervisors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(supervisorData)
        });
    } catch (error) {
        console.error('Error adding supervisor:', error);
        throw error;
    }
}

// Submit the add supervisor form
export async function submitSupervisorForm() {
    const form = document.getElementById('supervisor-form') as HTMLFormElement;
    const formData = new FormData(form);
    try {
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        const userName = (document.getElementById('username') as HTMLInputElement).value;

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

        const supervisorResponse = await addSupervisor({
            email,
            password,
            imageUrl,
            userName,
            BackOfficeId: Number(backOfficeId)
        });

        await handleResponseSupervisor(supervisorResponse);
       
    } catch (error) {
        console.error('Error:', error);
    }
}