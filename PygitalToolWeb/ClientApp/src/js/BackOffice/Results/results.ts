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

import {generateSummary} from "../Gemini/gemini";

export async function showResults() {
    try {
        await showResultCounts();
        createContainerAndLoaderElements();
        showLoader();
        clearCharts()
        createExportButtons(await generateDataAndCharts());
        hideLoader();
    } catch (error) {
        console.error('Error fetching answers with questions:', error);
        hideLoader();
    } finally {
        hideLoader();
    }
}

async function generateDataAndCharts() {
    let projectIdPage = parseInt(getDataProjectId());
    const data = await getAllAnswersWithQuestions();

    if (Array.isArray(data)) {
        const questionAnswers: { [questionText: string]: Set<string> } = {};
        const answerCounts: { [answer: string]: number } = {};
        const questionTypes: { [questionText: string]: number } = {};

        for (const answer of data) {
            const flowId = answer.question.flowId;
            const project = await getProjectFromFlowId(flowId);
            const projectId = project.projectId;

            if (projectId == projectIdPage) {
                const questionText = answer.question.questionText;
                const answerText = answer.answerText;
                const questionType = answer.question.questionType;

                if (!questionAnswers[questionText]) {
                    questionAnswers[questionText] = new Set();
                }

                questionAnswers[questionText].add(answerText);
                questionTypes[questionText] = (questionType);
                answerCounts[answerText] = (answerCounts[answerText] || 0) + 1;
            }
        }

        let counter = 0;
        for (const questionText in questionAnswers) {
            if (questionTypes[questionText] >= 0 && questionTypes[questionText] <= 2) {
                if (Object.hasOwnProperty.call(questionAnswers, questionText)) {
                    const uniqueAnswers = Array.from(questionAnswers[questionText]);
                    const answerData: { answer: string, count: number }[] = [];

                    createQuestionAndResultsContainerElements(counter, questionTypes[questionText], questionText);

                    uniqueAnswers.forEach(answer => {
                        const count = answerCounts[answer];
                        answerData.push({answer: answer, count: count});
                    });

                    if (questionTypes[questionText] >= 0 && questionTypes[questionText] <= 1) {
                        answerData.sort((a, b) => b.count - a.count);
                    }

                    createCanvasElement(counter);
                    configureChart(counter, answerData);
                }
            } else {
                createQuestionAndResultsContainerElements(counter, questionTypes[questionText], questionText);

                const uniqueAnswers = Array.from(questionAnswers[questionText]);
                const aiSummary = await generateSummary(uniqueAnswers.toString());
                createOpenQuestionResultElement(aiSummary, counter, uniqueAnswers);
            }
            counter++;
        }
        expandOpenQuestionResultTables();
    } else {
        console.error('Data is not in the expected format');
    }
    return data;
}

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

        for (const mainThemeIdStr in mainThemeCounts) {
            const mainThemeId = parseInt(mainThemeIdStr);
            const count = mainThemeCounts[mainThemeId];
            const mainThemeDetails = await getMainThemeDetails(mainThemeId);
            createResultCountsMainThemeElement(mainThemeDetails.themeName, count);
        }

        for (const subThemeIdStr in subThemeCounts) {
            const subThemeId = parseInt(subThemeIdStr);
            const count = subThemeCounts[subThemeId];
            const subThemeDetails = await getSubThemeDetails(subThemeId);
            createResultCountsSubThemeElement(subThemeDetails.subThemeName, count);
        }

        for (const flowIdStr in flowCounts) {
            const flowId = parseInt(flowIdStr);
            const count = flowCounts[flowId];
            const flowDetails = await getFlowDetails(flowId);
            createResultCountsFlowElement(flowDetails.flowName, count);
        }
    } else {
        console.error('Data is niet in het verwachte formaat');
    }
}

document.addEventListener('DOMContentLoaded', function (this: Document) {
    var clickableCards = document.querySelectorAll('.clickable');
    clickableCards.forEach(function (card) {
        card.addEventListener('click', function (this: HTMLElement) {
            var url = this.getAttribute('data-href');
            if (url !== null) {
                window.location.href = url;
            } else {
                console.error("Data-href attribute is null");
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.results-btn');
    // Add a click event listener to each button
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if(this){
                // @ts-ignore
                var url = this.getAttribute('data-href');
                if (url !== null) {
                    window.location.href = url;
                } else {
                    console.error("Data-href attribute is null");
                }
            }
        });
    });
});

document.addEventListener('click', function (event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('export-chart')) {
        const canvasId = target.getAttribute('data-canvas-id');
        // @ts-ignore
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement; // Typecasting naar HTMLCanvasElement
        if (canvas) {
            exportChartAsPNG(canvas, 'chart_export');
        } else {
            console.error('Canvas not found');
        }
    }
});


export function exportChartAsPNG(canvas: HTMLCanvasElement, filename: string) {
    // Genereer een dataURL voor het canvas
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = filename + '.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

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


export function getQuestionTypeName(questionType: number): string {
    switch (questionType) {
        case 0:
            return 'Single Choice';
        case 1:
            return 'Multiple Choice';
        case 2:
            return 'Range';
        case 3:

        default:
            return 'Unknown';
    }
}
