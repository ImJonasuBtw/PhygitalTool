import Chart from "chart.js/auto";
import {exportChartAsPNG, exportDataAsCSV, exportDataAsXLS} from "./Results";

export async function getAllAnswersWithQuestions() {
    const resultsContainer = document.getElementById('results-container');
    const loaderContainer = document.createElement('div');
    const loader = document.createElement('div');
    if(resultsContainer){
        loaderContainer.classList.add('row', 'justify-content-center', 'align-items-center');
        loader.classList.add('myloader');
        loaderContainer.appendChild(loader);
        resultsContainer.appendChild(loaderContainer);
    }
    
    try {
        loader.style.display = 'block';
        // @ts-ignore
        const projectIdPage = parseInt(document.querySelector('#results-information-container').getAttribute('data-project-id'));
        const response = await fetch(`/api/Results/GetAllAnswersWithQuestions`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (Array.isArray(data)) {
            const questionAnswers: { [questionText: string]: Set<string> } = {};
            const answerCounts: { [answer: string]: number } = {};
            console.log(data);
            for (const answer of data) {
                const flowId = answer.question.flowId;
                let projectId;

                const projectResponse = await fetch(`/api/Results/GetProjectFromFlowId/` + flowId);
                if (!projectResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const project = await projectResponse.json();

                projectId = project.projectId;
                if (projectId == projectIdPage) {
                    console.log("gelijk");

                    const questionText = answer.question.questionText;
                    const answerText = answer.answerText;

                    if (!questionAnswers[questionText]) {
                        questionAnswers[questionText] = new Set();
                    }

                    questionAnswers[questionText].add(answerText);

                    answerCounts[answerText] = (answerCounts[answerText] || 0) + 1;
                }
            }

            loader.style.display = 'none';
            const resultsContainer = document.getElementById('results-container');
            const existingCharts = document.querySelectorAll('.chart-container');
            existingCharts.forEach(chart => chart.remove());
            let counter = 0;

            for (const questionText in questionAnswers) {
                if (Object.hasOwnProperty.call(questionAnswers, questionText)) {
                    const uniqueAnswers = Array.from(questionAnswers[questionText]);
                    const answerData: { answer: string, count: number }[] = [];

                    // @ts-ignore
                    resultsContainer.innerHTML += `<p class="results-question"><strong>Question:</strong> ${questionText}</p>`;

                    uniqueAnswers.forEach(answer => {
                        const count = answerCounts[answer];
                        answerData.push({ answer: answer, count: count });
                    });

                    const canvasId = `chart-${counter}`;
                    const canvasHtml = `<div class="chart-container"><canvas id="${canvasId}"></canvas>
                    <button class="export-chart btn btn-primary mt-3 mb-3" data-canvas-id="${canvasId}">Exporteer als PNG</button></div>`;
                    if (resultsContainer) {
                        resultsContainer.innerHTML += canvasHtml;
                    }


                    setTimeout(() => {
                        const ctx = document.getElementById(canvasId);
                        if (ctx) {
                            // @ts-ignore
                            new Chart(ctx, {
                                type: 'pie',
                                data: {
                                    labels: answerData.map(a => a.answer),
                                    datasets: [{
                                        label: 'Answers',
                                        data: answerData.map(a => a.count),
                                    }]
                                }
                            });
                        }
                    }, 0);
                    counter++;
                }
            }
            loader.style.display = 'block';
            const projectExportBtn = document.createElement('button');
            projectExportBtn.className = 'export-project btn btn-primary mb-3 mt-3 mr-3';
            projectExportBtn.textContent = 'Exporteer gegevens als XLS';
            projectExportBtn.addEventListener('click', () => {
                exportDataAsXLS(data, 'answers_export'); // 'data' moet de array van antwoordobjecten zijn
            });
            // @ts-ignore
            resultsContainer.appendChild(projectExportBtn);
            const exportChartsButton = document.createElement('button');
            exportChartsButton.textContent = 'Exporteer grafieken als PNG';
            exportChartsButton.className = 'export-project btn btn-primary mt-3 m-3 mb-3';
            exportChartsButton.addEventListener('click', () => {
                const chartContainers = document.querySelectorAll('.chart-container canvas');
                chartContainers.forEach((canvas, index) => {
                    exportChartAsPNG(canvas as HTMLCanvasElement, `chart_${index}`);
                });
            });
            // @ts-ignore
            resultsContainer.appendChild(exportChartsButton);

            const exportAsCsv = document.createElement('button');
            exportAsCsv.textContent = 'Exporteer grafieken als CSV';
            exportAsCsv.className = 'export-as-csv btn btn-primary mt-3 mb-3';
            exportAsCsv.addEventListener('click', () => {
                exportDataAsCSV(data, 'answers_export'); // 'data' moet de array van objecten met de gegevens zijn
            });

            // @ts-ignore
            resultsContainer.appendChild(exportAsCsv);

            // Verberg de loader wanneer de gegevens zijn geladen
            loader.style.display = 'none !important';
        } else {
            console.error('Data is not in the expected format');
            // Zorg ervoor dat de loader wordt verborgen in het geval van een fout
            loader.style.display = 'none';
        }
    } catch (error) {
        console.error('Error fetching answers with questions:', error);
        // Zorg ervoor dat de loader wordt verborgen in het geval van een fout
        loader.style.display = 'none';
    }
    finally {
        loader.style.display = 'none';
    }
}

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

export function showResultsForProject(): void {
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