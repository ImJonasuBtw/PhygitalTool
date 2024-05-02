"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auto_1 = require("chart.js/auto");
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
function showResultsForProject() {
    // @ts-ignore
    var projectId = parseInt(document.querySelector('#results-container').getAttribute('data-project-id'));
    console.log(projectId);
    // Controleren of projectId niet NaN is
    if (!isNaN(projectId)) {
        fetch("/api/Results/GetProjectWithData/".concat(projectId))
            .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(function (data) {
            // Controleer of data een object is en of het de verwachte eigenschap bevat
            if (typeof data === 'object' && Array.isArray(data.userInputs)) {
                // Maak variabelen om het aantal antwoorden per hoofdthema, subthema en flow ID bij te houden
                var mainThemeCounts_1 = {};
                var subThemeCounts_1 = {};
                var flowCounts_1 = {};
                // Itereer over de array van UserInput-objecten
                data.userInputs.forEach(function (userInput) {
                    // Toegang krijgen tot de eigenschappen van elk UserInput-object
                    var mainThemeId = userInput.mainThemeId;
                    var subThemeId = userInput.subThemeId;
                    var flowId = userInput.flowId;
                    // Incrementeer het aantal antwoorden voor het hoofdthema
                    mainThemeCounts_1[mainThemeId] = (mainThemeCounts_1[mainThemeId] || 0) + 1;
                    // Incrementeer het aantal antwoorden voor het subthema
                    subThemeCounts_1[subThemeId] = (subThemeCounts_1[subThemeId] || 0) + 1;
                    // Incrementeer het aantal antwoorden voor het flow ID
                    flowCounts_1[flowId] = (flowCounts_1[flowId] || 0) + 1;
                });
                // Zoek de container
                var resultsContainer_1 = document.getElementById('results-container');
                if (resultsContainer_1) {
                    // Toon het aantal antwoorden per hoofdthema
                    Object.keys(mainThemeCounts_1).forEach(function (mainThemeId) {
                        var count = mainThemeCounts_1[parseInt(mainThemeId)];
                        // Voeg het aantal antwoorden per hoofdthema toe aan de HTML
                        resultsContainer_1.innerHTML += "<p>Aantal inputs voor hoofdthema ".concat(mainThemeId, ": ").concat(count, "</p>");
                    });
                    // Toon het aantal antwoorden per subthema
                    Object.keys(subThemeCounts_1).forEach(function (subThemeId) {
                        var count = subThemeCounts_1[parseInt(subThemeId)];
                        // Voeg het aantal antwoorden per subthema toe aan de HTML
                        resultsContainer_1.innerHTML += "<p>Aantal inputs voor subthema ".concat(subThemeId, ": ").concat(count, "</p>");
                    });
                    // Toon het aantal antwoorden per flow ID
                    Object.keys(flowCounts_1).forEach(function (flowId) {
                        var count = flowCounts_1[parseInt(flowId)];
                        // Voeg het aantal antwoorden per flow ID toe aan de HTML
                        resultsContainer_1.innerHTML += "<p>Aantal antwoorden voor flow ID ".concat(flowId, ": ").concat(count, "</p>");
                    });
                }
                else {
                    console.error('Results container niet gevonden');
                }
            }
            else {
                console.error('Data is niet in het verwachte formaat');
            }
        })
            .catch(function (error) {
            // Handel eventuele fouten af
            console.error('Fout bij het ophalen van gegevens:', error);
        });
    }
    else {
        console.error('Project ID is NaN');
    }
}
function getAllAnswersWithQuestions() {
    fetch("/api/Results/GetAllAnswersWithQuestions")
        .then(function (response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then(function (data) {
        // Controleer of de ontvangen gegevens een array zijn
        if (Array.isArray(data)) {
            // Object om vragen en hun unieke antwoorden bij te houden
            var questionAnswers_1 = {};
            // Object om het aantal keer dat elk antwoord voorkomt bij te houden
            var answerCounts_1 = {};
            // Itereer over de array van antwoorden met vragen
            data.forEach(function (answerWithQuestion) {
                var questionText = answerWithQuestion.question.questionText;
                var answerText = answerWithQuestion.answerText;
                // Voeg de vraag toe aan het object als het nog niet bestaat
                if (!questionAnswers_1[questionText]) {
                    questionAnswers_1[questionText] = new Set();
                }
                // Voeg het antwoord toe aan de set van unieke antwoorden voor deze vraag
                questionAnswers_1[questionText].add(answerText);
                // Tel het aantal keren dat elk antwoord voorkomt
                answerCounts_1[answerText] = (answerCounts_1[answerText] || 0) + 1;
            });
            // HTML-element om vragen en unieke antwoorden weer te geven
            var resultsContainer = document.getElementById('results-container');
            var counter = 0;
            var _loop_1 = function (questionText) {
                if (Object.hasOwnProperty.call(questionAnswers_1, questionText)) {
                    var uniqueAnswers = Array.from(questionAnswers_1[questionText]);
                    var answerData_1 = [];
                    // Voeg de vraag toe aan de HTML
                    // @ts-ignore
                    resultsContainer.innerHTML += "<p class=\"results-question\"><strong>Question:</strong> ".concat(questionText, "</p>");
                    // Voeg de unieke antwoorden en hun aantal keer toe aan de HTML
                    uniqueAnswers.forEach(function (answer) {
                        var count = answerCounts_1[answer];
                        answerData_1.push({ answer: answer, count: count });
                        // @ts-ignore
                        // resultsContainer.innerHTML += `<p class="results-answer"><strong>Answer:</strong> ${answer} - Number of times answered: ${count}</p>`;
                    });
                    console.log(answerData_1);
                    // @ts-ignore
                    var canvasId_1 = "chart-".concat(counter);
                    var canvasHtml = "<div class=\"chart-container\"><canvas id=\"".concat(canvasId_1, "\"></canvas></div>");
                    if (resultsContainer) {
                        resultsContainer.innerHTML += canvasHtml;
                    }
                    setTimeout(function () {
                        var ctx = document.getElementById(canvasId_1);
                        new auto_1.default(ctx, {
                            type: 'pie',
                            data: {
                                labels: answerData_1.map(function (a) { return a.answer; }),
                                datasets: [{
                                        label: 'Antwoorden',
                                        data: answerData_1.map(function (a) { return a.count; }),
                                    }]
                            }
                        });
                    }, 0);
                }
                counter++;
            };
            // Itereer over de vragen en hun unieke antwoorden
            for (var questionText in questionAnswers_1) {
                _loop_1(questionText);
            }
        }
        else {
            console.error('Data is niet in het verwachte formaat');
        }
    })
        .catch(function (error) {
        console.error('Fout bij het ophalen van antwoorden met vragen:', error);
    });
}
// Roep de functie aan bij het laden van de pagina
document.addEventListener('DOMContentLoaded', function () {
    showResultsForProject();
    getAllAnswersWithQuestions();
});
