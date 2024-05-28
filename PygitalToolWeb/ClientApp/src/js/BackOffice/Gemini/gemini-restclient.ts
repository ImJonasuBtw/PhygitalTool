export async function getGemini() {
    try {
        const response = await fetch('/api/gemini/gemini-api-key', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer YOUR_AUTH_TOKEN'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.apiKey;
    } catch (error) {
        console.error('Error fetching the API key:', error);
        throw error;
    }
}