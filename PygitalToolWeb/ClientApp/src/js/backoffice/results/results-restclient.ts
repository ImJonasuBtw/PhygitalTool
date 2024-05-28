// This asynchronous function fetches project data along with associated results using the provided project ID.
export async function getProjectWithData(projectId: number) {
    try {
        const response = await fetch(`/api/Results/GetProjectWithData/${projectId}`);
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error fetching Project data:', error);
        throw error;
    }
}

// This asynchronous function fetches all answers along with their associated questions.
export async function getAllAnswersWithQuestions() {
    try {
        const response = await fetch(`/api/Results/GetAllAnswersWithQuestions`);
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error fetching Answers with Questions:', error);
        throw error;
    }
}

// This async function fetches a project using a flow ID from the server and handles network errors.
export async function getProjectFromFlowId(flowId: string) {
    try {
        const projectResponse = await fetch(`/api/Results/GetProjectFromFlowId/${flowId}`);
        if (projectResponse.ok) {
            return await projectResponse.json();
        } else {
            console.error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error fetching Project from flowId:', error);
        throw error;
    }
}

// Retrieves details of a main theme using its ID from the server and handles network errors.
export async function getMainThemeDetails(mainThemeId: number): Promise<any> {
    try {
        const response = await fetch(`/api/ThemeCreation/GetMainThemeDetails/${mainThemeId}`);
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error fetching MainTheme details:', error);
        throw error;
    }
}

// Retrieves details of a subtheme using its ID from the server and handles network errors.
export async function getSubThemeDetails(subThemeId: number): Promise<any> {
    try {
        const response = await fetch(`/api/SubThemeCreation/GetSubThemeDetails/${subThemeId}`);
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error fetching SubTheme details:', error);
        throw error;
    }
}

// Fetches details of a flow using its ID from the server and handles network errors.
export async function getFlowDetails(flowId: number): Promise<any> {
    try {
        const response = await fetch(`/api/FlowCreation/GetFlowDetails/${flowId}`);
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error fetching Flow details:', error);
        throw error;
    }
}
