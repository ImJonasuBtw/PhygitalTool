import {loadManagers} from "../../AdminPlatform/managerRestClient";
import {loadSupervisors} from "./supervisorsRestClient";
import {backOfficeId} from "./supervisors";

export function validatePassword(password:string) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNonAlphabetic = /[^A-Za-z]/.test(password);
    return hasUpperCase && hasLowerCase && hasNonAlphabetic;
}
export async function handleResponseSupervisor(response: Response): Promise<void> {
    if (!response.ok) {
        if (response.status === 400 || response.status === 409) {
            const errorMessage = await response.text();
            alert(`Supervisor niet toegevoegd: Email  bestaat al}`);
        } else {
            const errorMessage = await response.text();
            console.error('Server error:', errorMessage);
            alert('Er is een serverfout opgetreden.');
        }
        return;
    }
    const data = await response.json();
    console.log('Success:', data);
    alert('Supervisor succesvol toegevoegd!');
    await loadSupervisors(Number(backOfficeId))
}