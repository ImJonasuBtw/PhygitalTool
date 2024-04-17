let questionTypeWindow;
console.log('The addQ.ts script bundle has been loaded!');
export function addQuestion() {
    var _a;
    console.log('Add q button has been pressed!');
    // Open een nieuw venster om het type vraag te selecteren
    questionTypeWindow = window.open("", "Vraag Type", "width=400,height=200");
    // Bouw het HTML voor het venster
    const questionTypeHTML = `
        <html>
        <head>
        <title>Selecteer het type vraag</title>
        </head>
        <body>
        <h2>Selecteer het type vraag</h2>
        <form>
            <input type="radio" name="questionType" value="single"> Single<br>
            <input type="radio" name="questionType" value="open"> Open<br>
            <input type="radio" name="questionType" value="range"> Range<br>
            <input type="radio" name="questionType" value="multiple"> Multiple<br>
            <button type="button" id="selecteer-button"">Selecteer</button>
        </form>
        </body>
        </html>
    `;
    // Schrijf het HTML naar het venster
    if (questionTypeWindow) {
        questionTypeWindow.document.write(questionTypeHTML);
        (_a = questionTypeWindow.document.getElementById('selecteer-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', selectQuestionType);
    }
}
function selectQuestionType() {
    if (!questionTypeWindow)
        return;
    // Vind het geselecteerde type vraag
    let questionType = "";
    const radios = questionTypeWindow.document.getElementsByName('questionType');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            questionType = radios[i].value;
            break;
        }
    }
    // Sluit het venster
    questionTypeWindow.close();
    // Voeg een nieuwe strook toe voor de vraag
    addQuestionRow(questionType);
}
function addQuestionRow(questionType) {
    const questionsDiv = document.getElementById("questions");
    if (!questionsDiv)
        return;
    const row = document.createElement("div");
    row.className = "question-row";
    // Voeg een inputveld toe voor de vraag met aanduiding van het vraagtype
    const questionInput = document.createElement("input");
    questionInput.type = "text";
    questionInput.name = questionType + "Question[]";
    questionInput.placeholder = "Voeg een " + questionType + " vraag toe";
    row.appendChild(questionInput);
    // Voeg extra inputveld toe voor mogelijke antwoorden, indien nodig
    if (questionType !== "open") {
        const answerInput = document.createElement("input");
        answerInput.type = "text";
        answerInput.name = questionType + "Answer[]";
        answerInput.placeholder = "Voeg een antwoord toe";
        row.appendChild(answerInput);
        // Voeg een knop toe om extra antwoordopties toe te voegen
        const addAnswerButton = document.createElement("button");
        addAnswerButton.type = "button";
        addAnswerButton.textContent = "Voeg nog een antwoord toe";
        addAnswerButton.onclick = function () {
            const additionalAnswerInput = document.createElement("input");
            additionalAnswerInput.type = "text";
            additionalAnswerInput.name = questionType + "Answer[]";
            additionalAnswerInput.placeholder = "Voeg een antwoord toe";
            row.insertBefore(additionalAnswerInput, addAnswerButton);
        };
        row.appendChild(addAnswerButton);
    }
    questionsDiv.appendChild(row);
}
