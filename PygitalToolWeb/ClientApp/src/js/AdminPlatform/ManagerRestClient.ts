import {loadManagers} from "./ManagerUI";
import {validatePassword} from "../validation";

export async function submitManagersForm() {
    const form = document.getElementById('managersForm') as HTMLFormElement;
    const formData = new FormData(form);
    try {
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        const userName = (document.getElementById('userName') as HTMLInputElement).value;
        const backofficeId: number = Number((document.getElementById('backoffice') as HTMLSelectElement).value);

        if (!validatePassword(password)) {
            alert('Het wachtwoord moet minstens één hoofdletter, één kleine letter en één niet-alfabetisch teken bevatten.');
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

        const response = await fetch('/api/Managers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                imageUrl,
                userName,
                backofficeId
            })
        });

        if (!response.ok) {
            if (response.status === 400) {
                alert(`Supervisor niet toegevoegd: E-mail bestaat al`);
            } else if (response.status === 409) {
                alert('Supervisor niet toegevoegd: E-mail bestaat al');
            }
            return;
        }

        const data = await response.json();
        console.log('Success:', data);
        alert('Managers succesvol toegevoegd!');
        loadManagers();
    } catch (error) {
        console.error('Error:', error);
    }
}

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