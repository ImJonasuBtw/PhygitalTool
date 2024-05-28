// Handles error responses when adding a flow. It displays appropriate error messages based on the response status.
export async function handleErrorResponseAdd(response: Response) {
    let errorMessage = 'Failed to add flow';
    if (response.status === 400) {
        const errorData = await response.json();
        if (errorData && errorData.errors) {
            for (const key in errorData.errors) {
                if (errorData.errors.hasOwnProperty(key)) {
                    errorMessage = errorData.errors[key];
                }
            }
        } else {
            alert('Validation error occurred.');
        }
    } else if (response.status === 404) {
        errorMessage = 'Not Found';
    } else if (response.status === 409) {
        errorMessage = 'Conflict - Key exists already';
    } else if (response.status === 500) {
        const errorData = await response.json();
        errorMessage = errorData.message ?? 'Internal Server Error';
    }
    alert(errorMessage);
}

// Handles error responses when editing a flow. It displays appropriate error messages based on the response status.
export async function handleErrorResponseEdit(response: Response) {
    console.error('Failed to update flow');
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
            alert('Validation error occurred.');
        }
    } else {
        response.text().then(text => alert('Failed to update flow: ' + text));
    }

}