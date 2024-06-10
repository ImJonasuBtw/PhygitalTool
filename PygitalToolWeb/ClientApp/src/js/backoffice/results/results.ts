import {
    getAllAnswersWithQuestions,
    getFlowDetails,
    getMainThemeDetails,
    getProjectFromFlowId,
    getProjectWithData,
    getSubThemeDetails
} from "./results-restclient";

import {
    clearCharts,
    configureChart,
    createCanvasElement,
    createContainerAndLoaderElements,
    createExportButtons,
    createOpenQuestionResultElement,
    createQuestionAndResultsContainerElements,
    createResultCountsFlowElement,
    createResultCountsMainThemeElement,
    createResultCountsSubThemeElement,
    createResultCountsTitleElement,
    expandOpenQuestionResultTables,
    getDataProjectId,
    hideLoader,
    showLoader
} from "./results-ui";

import {generateSummary} from "../gemini/gemini";

// Displays result counts, creates container and loader elements, shows the loader, clears existing charts, generates new data and charts, creates export buttons, and hides the loader.
export async function showResults() {
    try {
        await showResultCounts();
        createContainerAndLoaderElements();
        showLoader();
        clearCharts()
        // @ts-ignore
        createExportButtons(await generateDataAndCharts());
        hideLoader();
    } catch (error) {
        console.error('Error fetching answers with questions:', error);
        hideLoader();
    } finally {
        hideLoader();
    }
}

// Generates data and charts for displaying project results based on fetched answers.
async function generateDataAndCharts() {
    let projectIdPage = parseInt(getDataProjectId());
    const data = await getAllAnswersWithQuestions();

    if (!Array.isArray(data)) {
        console.error('Data is not in the expected format');
        return;
    }

    const questionAnswers: { [questionText: string]: Set<string> } = {};
    const answerCounts: { [answer: string]: number } = {};
    const questionTypes: { [questionText: string]: number } = {};
    const projectFlowIds = new Map<number, number>();

    for (const answer of data) {
        const flowId = answer.question.flowId;

        if (!projectFlowIds.has(flowId)) {
            const project = await getProjectFromFlowId(flowId);
            projectFlowIds.set(flowId, project.projectId);
        }

        const projectId = projectFlowIds.get(flowId);

        if (projectId === projectIdPage) {
            const questionText = answer.question.questionText;
            const answerText = answer.answerText;
            const questionType = answer.question.questionType;

            if (!questionAnswers[questionText]) {
                questionAnswers[questionText] = new Set();
            }

            questionAnswers[questionText].add(answerText);
            questionTypes[questionText] = questionType;
            answerCounts[answerText] = (answerCounts[answerText] || 0) + 1;
        }
    }

    let counter = 0;
    const summaryPromises: Promise<void>[] = [];

    for (const questionText in questionAnswers) {
        if (questionTypes.hasOwnProperty(questionText)) {
            const uniqueAnswers = Array.from(questionAnswers[questionText]);
            const answerData: { answer: string, count: number }[] = uniqueAnswers.map(answer => ({
                answer: answer,
                count: answerCounts[answer]
            }));

            if (questionTypes[questionText] >= 0 && questionTypes[questionText] <= 2) {
                createQuestionAndResultsContainerElements(counter, questionTypes[questionText], questionText);

                if (questionTypes[questionText] >= 0 && questionTypes[questionText] <= 1) {
                    answerData.sort((a, b) => b.count - a.count);
                }

                createCanvasElement(counter);
                configureChart(counter, answerData);
            } else {
                createQuestionAndResultsContainerElements(counter, questionTypes[questionText], questionText);

                const uniqueAnswers = Array.from(questionAnswers[questionText]);
                const aiSummary = await generateSummary(uniqueAnswers.toString());
                createOpenQuestionResultElement(aiSummary, counter, uniqueAnswers);
            }
            counter++;
        }
    }

    await Promise.all(summaryPromises);
    expandOpenQuestionResultTables();

    if (data === undefined) {
        console.error('Data is undefined');
    } else {
        return data;
    }
}


// Fetches and displays counts of main themes, sub themes, and flows associated with a project's user inputs.
async function showResultCounts() {
    let projectId = parseInt(getDataProjectId());
    const data = await getProjectWithData(projectId);

    if (typeof data === 'object' && Array.isArray(data.userInputs)) {
        const mainThemeCounts: { [key: number]: number } = {};
        const subThemeCounts: { [key: number]: number } = {};
        const flowCounts: { [key: number]: number } = {};

        data.userInputs.forEach((userInput: any) => {
            const mainThemeId = userInput.mainThemeId;
            const subThemeId = userInput.subThemeId;
            const flowId = userInput.flowId;

            mainThemeCounts[mainThemeId] = (mainThemeCounts[mainThemeId] || 0) + 1;
            subThemeCounts[subThemeId] = (subThemeCounts[subThemeId] || 0) + 1;
            flowCounts[flowId] = (flowCounts[flowId] || 0) + 1;
        });

        createResultCountsTitleElement();

        const mainThemeIds = Object.keys(mainThemeCounts).map(Number);
        const subThemeIds = Object.keys(subThemeCounts).map(Number);
        const flowIds = Object.keys(flowCounts).map(Number);

        const mainThemeDetails = await Promise.all(mainThemeIds.map(id => getMainThemeDetails(id)));
        const subThemeDetails = await Promise.all(subThemeIds.map(id => getSubThemeDetails(id)));
        const flowDetails = await Promise.all(flowIds.map(id => getFlowDetails(id)));

        mainThemeDetails.forEach((details, index) => {
            createResultCountsMainThemeElement(details.themeName, mainThemeCounts[mainThemeIds[index]]);
        });

        subThemeDetails.forEach((details, index) => {
            createResultCountsSubThemeElement(details.subThemeName, subThemeCounts[subThemeIds[index]]);
        });

        flowDetails.forEach((details, index) => {
            createResultCountsFlowElement(details.flowName, flowCounts[flowIds[index]]);
        });
    } else {
        console.error('Data is niet in het verwachte formaat');
    }
}

// Sets up click functionality for elements with the 'clickable' class to navigate to the URL specified in their 'data-href' attribute upon click.
function setupCardClickable(){
    document.addEventListener('DOMContentLoaded', function (this: Document) {
        const clickableCards = document.querySelectorAll('.clickable');
        clickableCards.forEach(function (card) {
            card.addEventListener('click', function (this: HTMLElement) {
                const url = this.getAttribute('data-href');
                if (url !== null) {
                    window.location.href = url;
                } else {
                    console.error("Data-href attribute is null");
                }
            });
        });
    });
}

// Sets up click functionality for elements with the 'results-btn' class to navigate to the URL specified in their 'data-href' attribute upon click.
function setupResultsButton(): void {
    document.addEventListener('DOMContentLoaded', () => {
        const buttons = document.querySelectorAll('.results-btn');
        // Add a click event listener to each button
        buttons.forEach(button => {
            button.addEventListener('click', function(this: HTMLElement) {
                const url = this.getAttribute('data-href');
                if (url !== null) {
                    window.location.href = url;
                } else {
                    console.error("Data-href attribute is null");
                }
            });
        });
    });
}


document.addEventListener('click', function (event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('export-chart')) {
        const canvasId = target.getAttribute('data-canvas-id');
        if (canvasId !== null) {
            const canvas = document.getElementById(canvasId) as HTMLCanvasElement; // Typecasting naar HTMLCanvasElement
            if (canvas) {
                exportChartAsPNG(canvas, 'chart_export');
            } else {
                console.error('Canvas not found');
            }
        }
    }
});

// Exports the content of an HTML canvas element as a PNG image with the specified filename.
export function exportChartAsPNG(canvas: HTMLCanvasElement, filename: string) {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = filename + '.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Exports the provided data as an XLS (Excel) file with the specified filename. The data is formatted into an HTML table and then converted into an Excel file for download.
export function exportDataAsXLS(data: any[], filename: string) {
    let html = '<table>';
    html += '<tr>';
    html += '<th>Answer ID</th><th>Answer Text</th><th>Question ID</th><th>Question Text</th><th>Question Type</th>'; // Koppen toevoegen
    html += '</tr>';
    data.forEach((row) => {
        html += '<tr>';
        html += `<td>${row.answerId}</td><td>${row.answerText}</td><td>${row.questionId}</td>`; // Voeg antwoordgegevens toe
        html += `<td>${row.question.questionText}</td><td>${getQuestionTypeName(row.question.questionType)}</td>`; // Voeg vraaggegevens toe
        html += '</tr>';
    });
    html += '</table>';
    const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${filename}.xls`);document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Exports the given data as a CSV file with the specified filename.
export function exportDataAsCSV(data: any[], filename: string) {
    let csv = 'Answer ID,Answer Text,Question ID,Question,Question Text,Question Type\n';
    data.forEach((row) => {
        csv += `${row.answerId},${row.answerText},${row.question.questionId},${row.question.questionText},${getQuestionTypeName(row.question.questionType)}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Returns the name corresponding to the given question type number.
export function getQuestionTypeName(questionType: number): string {
    switch (questionType) {
        case 0:
            return 'Single Choice';
        case 1:
            return 'Multiple Choice';
        case 2:
            return 'Range';
        case 3:
            return 'Open';
        default:
            return 'Unknown';
    }
}

// Loads the necessary DOM elements and functionality for displaying results.
export function loadDOMResults(): void {
    setupCardClickable();
    setupResultsButton()
}