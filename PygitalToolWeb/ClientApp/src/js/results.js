var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Chart from 'chart.js/auto';
document.addEventListener('DOMContentLoaded', function () {
    var clickableCards = document.querySelectorAll('.clickable');
    clickableCards.forEach(function (card) {
        card.addEventListener('click', function () {
            var url = this.getAttribute('data-href');
            if (url !== null) {
                window.location.href = url;
            }
            else {
                console.error("Data-href attribute is null");
            }
        });
    });
});
function getAllAnswersWithQuestions() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // @ts-ignore
            const projectIdPage = parseInt(document.querySelector('#results-information-container').getAttribute('data-project-id'));
            const response = yield fetch(`/api/Results/GetAllAnswersWithQuestions`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = yield response.json();
            if (Array.isArray(data)) {
                const questionAnswers = {};
                const answerCounts = {};
                for (const answer of data) {
                    const flowId = answer.question.flowId;
                    let projectId;
                    const projectResponse = yield fetch(`/api/Results/GetProjectFromFlowId/` + flowId);
                    if (!projectResponse.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const project = yield projectResponse.json();
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
                        const answerData = [];
                        // @ts-ignore
                        resultsContainer.innerHTML += `<p class="results-question"><strong>Question:</strong> ${questionText}</p>`;
                        uniqueAnswers.forEach(answer => {
                            const count = answerCounts[answer];
                            answerData.push({ answer: answer, count: count });
                        });
                        const canvasId = `chart-${counter}`;
                        const canvasHtml = `<div class="chart-container"><canvas id="${canvasId}"></canvas></div>`;
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
            }
            else {
                console.error('Data is not in the expected format');
            }
        }
        catch (error) {
            console.error('Error fetching answers with questions:', error);
        }
    });
}
window.addEventListener('load', () => {
    getAllAnswersWithQuestions();
});
