import {Flow} from "./addFlow";

async function getMainThemeDetails(mainThemeId: number): Promise<any> {
    try {
        const response = await fetch(`/api/ThemeCreation/GetMainThemeDetails/${mainThemeId}`);
        if (!response.ok) {
            console.log(response);
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching main theme details:', error);
        throw error;
    }
}

async function getSubThemeDetails(subThemeId: number): Promise<any> {
    try {
        const response = await fetch(`/api/SubThemeCreation/GetSubThemeDetails/` + subThemeId);
        if (!response.ok) {
            console.log(response);
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching subtheme details:', error);
        throw error;
    }
}

async function getFlowDetails(flowId: number): Promise<any> {
    try {
        const response = await fetch(`/api/FlowCreation/GetFlowDetails/` + flowId);
        if (!response.ok) {
            console.log(response);
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching flow details:', error);
        throw error;
    }
}

function showResultsForProject(): void {
    // @ts-ignore
    var projectId = parseInt(document.querySelector('#results-information-container').getAttribute('data-project-id'));
    console.log(projectId);
    // Controleren of projectId niet NaN is
    if (!isNaN(projectId)) {
        fetch(`/api/Results/GetProjectWithData/${projectId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }).then(async (data: any) => {
            // Controleer of data een object is en of het de verwachte eigenschap bevat
            if (typeof data === 'object' && Array.isArray(data.userInputs)) {
                // Maak variabelen om het aantal antwoorden per hoofdthema, subthema en flow ID bij te houden
                const mainThemeCounts: { [key: number]: number } = {};
                const subThemeCounts: { [key: number]: number } = {};
                const flowCounts: { [key: number]: number } = {};

                // Itereer over de array van UserInput-objecten
                data.userInputs.forEach((userInput: any) => {
                    // Toegang krijgen tot de eigenschappen van elk UserInput-object
                    const mainThemeId = userInput.mainThemeId;
                    const subThemeId = userInput.subThemeId;
                    const flowId = userInput.flowId;

                    // Incrementeer het aantal antwoorden voor het hoofdthema
                    mainThemeCounts[mainThemeId] = (mainThemeCounts[mainThemeId] || 0) + 1;

                    // Incrementeer het aantal antwoorden voor het subthema
                    subThemeCounts[subThemeId] = (subThemeCounts[subThemeId] || 0) + 1;

                    // Incrementeer het aantal antwoorden voor het flow ID
                    flowCounts[flowId] = (flowCounts[flowId] || 0) + 1;
                });

                // Zoek de container
                const resultsContainer = document.getElementById('results-information-container');
                if (resultsContainer) {
                    // Toon het aantal antwoorden per hoofdthema
                    for (const mainThemeIdStr in mainThemeCounts) {
                        try {
                            const mainThemeId = parseInt(mainThemeIdStr);
                            const count = mainThemeCounts[mainThemeId];
                            const mainThemeDetails = await getMainThemeDetails(mainThemeId);
                            console.log(mainThemeDetails);
                            resultsContainer.innerHTML += `<p> <strong> Details voor hoodfd thema</strong> ${mainThemeDetails.themeName}: ${count}</p>`;
                        } catch (error) {
                            console.error('Error getting main theme details:', error);
                        }
                    }


                    for (const subThemeIdStr in subThemeCounts) {
                        try {
                            const subThemeId = parseInt(subThemeIdStr);
                            const count = subThemeCounts[subThemeId];
                            const subThemeDetails = await getSubThemeDetails(subThemeId);
                            console.log(subThemeDetails);
                            resultsContainer.innerHTML += `<p> <strong> Details voor subthema</strong> ${subThemeDetails.subThemeName}: ${count}</p>`;
                        } catch (error) {
                            console.error('Error getting main theme details:', error);
                        }
                    }
                    for (const flowIdStr in flowCounts) {
                        try {
                            const flowId = parseInt(flowIdStr);
                            const count = flowCounts[flowId];
                            const flowDetails = await getFlowDetails(flowId);
                            console.log(flowDetails);
                            resultsContainer.innerHTML += `<p> <strong> Details voor flow</strong> ${flowDetails.flowName}: ${count}</p>`;
                        } catch (error) {
                            console.error('Error getting main theme details:', error);
                        }
                    }
                } else {
                    console.error('Results container niet gevonden');
                }
            } else {
                console.error('Data is niet in het verwachte formaat');
            }
        })

            .catch(error => {
                // Handel eventuele fouten af
                console.error('Fout bij het ophalen van gegevens:', error);
            });
    } else {
        console.error('Project ID is NaN');
    }
}

showResultsForProject();