import {loadManagers} from "./manager-restclient";

// Validates if the password contains at least one uppercase letter, one lowercase letter, and one non-alphabetic character.
export function validatePassword(password:string) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNonAlphabetic = /[^A-Za-z]/.test(password);
    return hasUpperCase && hasLowerCase && hasNonAlphabetic;
}

// Handles the response from server, displaying error messages or alerts on failure, and reloading managers on success.
export async function handleResponse(response: Response): Promise<void> {
    if (!response.ok) {
        if (response.status === 400 || response.status === 409) {
            const errorMessage = await response.text();
            alert(`Manager niet toegevoegd: ${errorMessage}`);
        } else {
            const errorMessage = await response.text();
            console.error('Server error:', errorMessage);
            alert('Er is een serverfout opgetreden.');
        }
        return;
    }
    alert('Managers succesvol toegevoegd!');
    await loadManagers();
}