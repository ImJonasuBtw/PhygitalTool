import {exportChartAsPNG, exportDataAsCSV, exportDataAsXLS, getQuestionTypeName} from "./results";
import Chart, {ChartItem} from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

export function createContainerAndLoaderElements() {
    // Initial Container Elements
    const resultsContainer = document.getElementById('results-container');
    const loaderContainer = document.createElement('div');

    // Create and Insert Loader HTML
    const loader = document.createElement('div');
    if (resultsContainer) {
        loaderContainer.classList.add('row', 'justify-content-center', 'align-items-center');
        loader.id = "myloader";
        loader.classList.add('myloader');
        loaderContainer.appendChild(loader);
        resultsContainer.appendChild(loaderContainer);
    }
}

export function getDataProjectId() {
    const resultsInformationContainer = document.querySelector('#results-information-container');
    if (resultsInformationContainer) {
        let dataProjectId = resultsInformationContainer.getAttribute('data-project-id');
        if (dataProjectId !== null && dataProjectId !== undefined) {
            return dataProjectId;
        } else {
            throw new Error('data-project-id not found');
        }
    } else {
        throw new Error('results-information-container not found')
    }
}

export function clearCharts() {
    const existingCharts = document.querySelectorAll('.chart-container');
    existingCharts.forEach(chart => chart.remove());
}

export function createQuestionAndResultsContainerElements(counter: number, questionTypeId: number, questionText: string) {
    const resultsContainer = document.getElementById('results-container');
    const questionContainerElement = document.createElement('div');
    questionContainerElement.className = 'question-result-container';
    questionContainerElement.id = `question-result-${counter}`;
    if (resultsContainer) {
        resultsContainer.appendChild(questionContainerElement);
    }

    const questionElement = document.createElement('div');
    questionElement.className = 'results-question-container';
    questionElement.innerHTML = `<h3><strong>${getQuestionTypeName(questionTypeId)}: </strong>${questionText}</h3>`;
    questionContainerElement.appendChild(questionElement);
}

export function createCanvasElement(counter: number) {
    const canvasId = `chart-${counter}`;
    const chartContainer = document.createElement('div');
    const questionContainerElement = document.getElementById(`question-result-${counter}`);
    chartContainer.className = 'chart-container';
    chartContainer.innerHTML = `
                            <canvas id="${canvasId}"></canvas>
                            <button class="export-chart btn btn-primary mt-3 mb-3" data-canvas-id="${canvasId}">Exporteer als PNG</button>
                        `;
    if (questionContainerElement) {
        questionContainerElement.appendChild(chartContainer);
    }
}

export function configureChart(counter: number, chartData: { answer: string, count: number }[]) {
    setTimeout(() => {
        const ctx = document.getElementById(`chart-${counter}`) as ChartItem;
        if (ctx) {
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chartData.map(a => a.answer),
                    datasets: [{
                        label: 'Answers',
                        data: chartData.map(a => a.count),
                        backgroundColor: 'rgb(178,84,231)',
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'y',
                    plugins: {
                        legend: {
                            display: false
                        },
                        datalabels: {
                            anchor: 'end',
                            align: 'start',
                            color: '#fff',
                            formatter: (value) => {
                                return value;
                            }
                        }
                    }
                },
                plugins: [ChartDataLabels]
            });
        }
    }, 0);
}

export function expandOpenQuestionResultTables() {
    const expandButtons = document.querySelectorAll('.expand-table-button');

    if (expandButtons) {
        expandButtons.forEach(button => {
            button.addEventListener('click', () => {
                const table = button.closest('.chart-container')?.querySelector('.open-question-table') as HTMLButtonElement;
                const expandableRows = table.querySelectorAll('.expandable-row');
                const dotRow = table.querySelector('.dot-row');

                expandableRows.forEach(row => {
                    row.classList.toggle('row-hidden');
                });
                if (dotRow) {
                    dotRow.classList.toggle('row-hidden');
                }
                button.innerHTML = button.innerHTML === 'expand' ? 'fold' : 'expand';
            });
        });
    }
}

export function createOpenQuestionResultElement(aiSummary: string, counter: number, uniqueAnswers: string[]) {
    const chartContainer = document.createElement('div');
    chartContainer.className = 'chart-container';
    chartContainer.innerHTML = `
                                <strong>AI Summary</strong>
                                <p class="ai-summary">${aiSummary}</p>
                                <button class="expand-table-button">expand</button>
                                <table id="table-${counter}" class="open-question-table">
                                    <tr>
                                        <th>All Answers</th>
                                    </tr>
                                    <tr class="first-row">
                                        <td>${uniqueAnswers[0]}</td>
                                    </tr>
                                    <tr class="dot-row">
                                      <td>...</td>
                                    </tr>
                                </table>`;

    const questionContainerElement = document.getElementById(`question-result-${counter}`);
    if (questionContainerElement) {
        questionContainerElement.appendChild(chartContainer);
    }

    for (let i = 1; i < uniqueAnswers.length; i++) {
        const table = document.getElementById(`table-${counter}`) as HTMLTableElement;
        const rowHtml =
            `<tr class="expandable-row row-hidden">
                                <td>${uniqueAnswers[i]}</td>
                            </tr>
                            `;
        table.insertAdjacentHTML('beforeend', rowHtml);
    }
}

export function createExportButtons(data: any[]) {
    const exportXlsButton = document.createElement('button');
    exportXlsButton.className = 'export-project btn btn-primary mb-3 mt-3 mr-3';
    exportXlsButton.id = 'export-button-xls';
    exportXlsButton.textContent = 'Exporteer gegevens als XLS';
    exportXlsButton.addEventListener('click', () => {
        exportDataAsXLS(data, 'answers_export'); // 'data' moet de array van antwoordobjecten zijn
    });

    const exportPngButton = document.createElement('button');
    exportPngButton.className = 'export-project btn btn-primary mt-3 m-3 mb-3';
    exportPngButton.textContent = 'Exporteer grafieken als PNG';
    exportPngButton.addEventListener('click', () => {
        const chartContainers = document.querySelectorAll('.chart-container canvas');
        chartContainers.forEach((canvas, index) => {
            exportChartAsPNG(canvas as HTMLCanvasElement, `chart_${index}`);
        });
    });

    const exportCsvButton = document.createElement('button');
    exportCsvButton.textContent = 'Exporteer grafieken als CSV';
    exportCsvButton.className = 'export-as-csv btn btn-primary mt-3 mb-3';
    exportCsvButton.addEventListener('click', () => {
        exportDataAsCSV(data, 'answers_export'); // 'data' moet de array van objecten met de gegevens zijn
    });

    const resultsContainer = document.getElementById('results-container');
    if (resultsContainer) {
        resultsContainer.appendChild(exportXlsButton);
        resultsContainer.appendChild(exportPngButton);
        resultsContainer.appendChild(exportCsvButton);
    }
}

export function createResultCountsTitleElement() {
    const resultsContainer = document.getElementById('results-information-container');
    const titleElement = document.createElement('h3');
    titleElement.innerText = 'Aantal Antwoorden';
    if (resultsContainer) {
        resultsContainer.appendChild(titleElement);
    }
}

export function createResultCountsMainThemeElement(mainThemeName: any, count: number) {
    const resultsContainer = document.getElementById('results-information-container');
    const pElement = document.createElement('p');
    pElement.innerHTML = `<strong>Hoofdthema</strong> ${mainThemeName}: ${count}`;
    if (resultsContainer) {
        resultsContainer.appendChild(pElement);
    }
}

export function createResultCountsSubThemeElement(subThemeName: any, count: any) {
    const resultsContainer = document.getElementById('results-information-container');
    const pElement = document.createElement('p');
    pElement.innerHTML = `<strong>Subthema</strong> ${subThemeName}: ${count}`;
    if (resultsContainer) {
        resultsContainer.appendChild(pElement);
    }
}

export function createResultCountsFlowElement(flowName: any, count: number) {
    const resultsContainer = document.getElementById('results-information-container');
    const pElement = document.createElement('p');
    pElement.innerHTML = `<strong>Flow</strong> ${flowName}: ${count}`;
    if (resultsContainer) {
        resultsContainer.appendChild(pElement);
    }
}

export function showLoader() {
    const loader = document.getElementById('myloader');
    if (loader) {
        loader.style.display = 'block';
    }
}

export function hideLoader() {
    const loader = document.getElementById('myloader');
    if (loader) {
        loader.style.display = 'none';
    }
}