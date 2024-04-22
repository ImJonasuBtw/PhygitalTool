let questionTypeWindow;
let answerButtonCount = 0;
console.log('The addQ.ts script bundle has been loaded!');
export var QuestionType;
(function (QuestionType) {
    QuestionType[QuestionType["SingleChoice"] = 0] = "SingleChoice";
    QuestionType[QuestionType["MultipleChoice"] = 1] = "MultipleChoice";
    QuestionType[QuestionType["Range"] = 2] = "Range";
    QuestionType[QuestionType["Open"] = 3] = "Open";
})(QuestionType || (QuestionType = {}));
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
            <input type="radio" name="questionType" value="${QuestionType.SingleChoice}"> Single<br>
            <input type="radio" name="questionType" value="${QuestionType.Open}"> Open<br>
            <input type="radio" name="questionType" value="${QuestionType.Range}"> Range<br>
            <input type="radio" name="questionType" value="${QuestionType.MultipleChoice}"> Multiple<br>
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
    let questionType = QuestionType.SingleChoice;
    const radios = questionTypeWindow.document.getElementsByName('questionType');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            questionType = parseInt(radios[i].value);
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
    questionInput.name = questionType + "Question";
    questionInput.placeholder = "Voeg een " + questionType.toString() + " vraag toe";
    row.appendChild(questionInput);
    // Voeg een inputveld toe om het vraagtype op te slaan
    const questionTypeInput = document.createElement("input");
    questionTypeInput.type = "hidden";
    questionTypeInput.name = "questionType";
    questionTypeInput.value = questionType.toString();
    row.appendChild(questionTypeInput);
    // Voeg extra inputveld toe voor mogelijke antwoorden, indien nodig
    if (questionType !== 3) {
        const answerInput = document.createElement("input");
        answerInput.type = "text";
        answerInput.name = questionType + "Answer";
        answerInput.placeholder = "Voeg een antwoord toe";
        row.appendChild(answerInput);
        if (answerButtonCount < 4) {
            const addAnswerButton = document.createElement("button");
            addAnswerButton.type = "button";
            addAnswerButton.textContent = "Voeg nog een antwoord toe";
            addAnswerButton.onclick = function () {
                if (answerButtonCount >= 3) {
                    addAnswerButton.disabled = true; // Uitschakelen knop na 5 keer klikken
                }
                const additionalAnswerInput = document.createElement("input");
                additionalAnswerInput.type = "text";
                additionalAnswerInput.name = questionType + "Answer";
                additionalAnswerInput.placeholder = "Voeg een antwoord toe";
                row.insertBefore(additionalAnswerInput, addAnswerButton);
                answerButtonCount++;
            };
            row.appendChild(addAnswerButton);
        }
    }
    questionsDiv.appendChild(row);
}
