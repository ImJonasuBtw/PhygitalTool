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
            alert('error in de validatie');
        }
    } else {
        response.text().then(text => alert('kon Thema niet toevoegen/updaten ' + text));
    }
}