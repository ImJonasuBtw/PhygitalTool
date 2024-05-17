import {loadManagers} from "./ManagerUI";

export async function submitManagersForm() {
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