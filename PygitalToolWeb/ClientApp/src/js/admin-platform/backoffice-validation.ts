// Handles error response from the server, displaying error messages or alerts.
export async function handleErrorResponse(response: Response) {
    if (response.status === 400) {
        const errorData = await response.json();
        if (errorData && errorData.errors) {
            for (const key in errorData.errors) {
                if (errorData.errors.hasOwnProperty(key)) {
                    const errorMessage = errorData.errors[key];
                    alert(errorMessage);
                }
            }
        } else {
            alert('Er is een validatiefout opgetreden.');
        }
    } else {
        const text = await response.text();
        alert('Toevoeging/update van BackOffice mislukt: ' + text);
    }
}