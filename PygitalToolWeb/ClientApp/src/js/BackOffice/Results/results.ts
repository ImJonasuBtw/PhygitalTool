import Chart from 'chart.js/auto';
import {Flow} from "../Flows/addFlow";

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

async function getAllAnswersWithQuestions() {
    const resultsContainer = document.getElementById('results-container');
    const loader = document.createElement('div');
    // @ts-ignore
    resultsContainer.appendChild(loader)
    loader.classList.add('loader');
    document.body.appendChild(loader);

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
            loader.style.display = 'none';
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
}


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

function exportChartAsPNG(canvas: HTMLCanvasElement, filename: string) {
    // Genereer een dataURL voor het canvas
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = filename + '.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function exportDataAsXLS(data: any[], filename: string) {
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

function exportDataAsCSV(data: any[], filename: string) {
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


function getQuestionTypeName(questionType: number): string {
    switch (questionType) {
        case 0:
            return 'SingleChoice';
        case 1:
            return 'MultipleChoice';
        case 2:
            return 'Range';
        case 3:
            return 'Open';
        default:
            return 'Unknown';
    }
}




window.addEventListener('load', () => {
    getAllAnswersWithQuestions();
});

