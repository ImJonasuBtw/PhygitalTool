"use strict";
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
        fetch(`/api/Results/GetProjectWithData/${projectId}`)
            .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then((data) => {
            // Controleer of data een object is en of het de verwachte eigenschap bevat
            if (typeof data === 'object' && Array.isArray(data.userInputs)) {
                // Maak variabelen om het aantal antwoorden per hoofdthema, subthema en flow ID bij te houden
                const mainThemeCounts = {};
                const subThemeCounts = {};
                const flowCounts = {};
                // Itereer over de array van UserInput-objecten
                data.userInputs.forEach((userInput) => {
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
                const resultsContainer = document.getElementById('results-container');
                if (resultsContainer) {
                    // Toon het aantal antwoorden per hoofdthema
                    Object.keys(mainThemeCounts).forEach(mainThemeId => {
                        const count = mainThemeCounts[parseInt(mainThemeId)];
                        // Voeg het aantal antwoorden per hoofdthema toe aan de HTML
                        resultsContainer.innerHTML += `<p>Aantal inputs voor hoofdthema ${mainThemeId}: ${count}</p>`;
                    });
                    // Toon het aantal antwoorden per subthema
                    Object.keys(subThemeCounts).forEach(subThemeId => {
                        const count = subThemeCounts[parseInt(subThemeId)];
                        // Voeg het aantal antwoorden per subthema toe aan de HTML
                        resultsContainer.innerHTML += `<p>Aantal inputs voor subthema ${subThemeId}: ${count}</p>`;
                    });
                    // Toon het aantal antwoorden per flow ID
                    Object.keys(flowCounts).forEach(flowId => {
                        const count = flowCounts[parseInt(flowId)];
                        // Voeg het aantal antwoorden per flow ID toe aan de HTML
                        resultsContainer.innerHTML += `<p>Aantal antwoorden voor flow ID ${flowId}: ${count}</p>`;
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
            .catch(error => {
            // Handel eventuele fouten af
            console.error('Fout bij het ophalen van gegevens:', error);
        });
    }
    else {
        console.error('Project ID is NaN');
    }
}
function getAllAnswersWithQuestions() {
    fetch(`/api/Results/GetAllAnswersWithQuestions`)
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then((data) => {
        // Controleer of de ontvangen gegevens een array zijn
        if (Array.isArray(data)) {
            // Object om vragen en hun unieke antwoorden bij te houden
            const questionAnswers = {};
            // Object om het aantal keer dat elk antwoord voorkomt bij te houden
            const answerCounts = {};
            // Itereer over de array van antwoorden met vragen
            data.forEach(answerWithQuestion => {
                const questionText = answerWithQuestion.question.questionText;
                const answerText = answerWithQuestion.answerText;
                // Voeg de vraag toe aan het object als het nog niet bestaat
                if (!questionAnswers[questionText]) {
                    questionAnswers[questionText] = new Set();
                }
                // Voeg het antwoord toe aan de set van unieke antwoorden voor deze vraag
                questionAnswers[questionText].add(answerText);
                // Tel het aantal keren dat elk antwoord voorkomt
                answerCounts[answerText] = (answerCounts[answerText] || 0) + 1;
            });
            // HTML-element om vragen en unieke antwoorden weer te geven
            const resultsContainer = document.getElementById('results-container');
            // Itereer over de vragen en hun unieke antwoorden
            for (const questionText in questionAnswers) {
                if (Object.hasOwnProperty.call(questionAnswers, questionText)) {
                    const uniqueAnswers = Array.from(questionAnswers[questionText]);
                    // Voeg de vraag toe aan de HTML
                    // @ts-ignore
                    resultsContainer.innerHTML += `<p><strong>Question:</strong> ${questionText}</p>`;
                    // Voeg de unieke antwoorden en hun aantal keer toe aan de HTML
                    uniqueAnswers.forEach(answer => {
                        const count = answerCounts[answer];
                        // @ts-ignore
                        resultsContainer.innerHTML += `<p><strong>Answer:</strong> ${answer} - Number of times answered: ${count}</p>`;
                    });
                }
            }
        }
        else {
            console.error('Data is niet in het verwachte formaat');
        }
    })
        .catch(error => {
        console.error('Fout bij het ophalen van antwoorden met vragen:', error);
    });
}
// Roep de functie aan bij het laden van de pagina
getAllAnswersWithQuestions();
showResultsForProject();
