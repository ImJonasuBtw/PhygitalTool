let questionTypeWindow: Window | null;
let answerButtonCount = 0;
console.log('The addQ.ts script bundle has been loaded!');
 export enum QuestionType {
    SingleChoice,
    MultipleChoice,
    Range,
    Open
}
export function addQuestion() {
    console.log('Add q button has been pressed!')
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
        questionTypeWindow.document.getElementById('selecteer-button')?.addEventListener('click', selectQuestionType);
    }
}
function addDeleteButton(row: HTMLDivElement) {
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Verwijder vraag";
    deleteButton.onclick = function () {
        row.remove(); // Verwijder de vraagrij wanneer de knop wordt geklikt
    };
    row.appendChild(deleteButton);
}
 function selectQuestionType() {
    if (!questionTypeWindow) return;

    // Vind het geselecteerde type vraag
    let questionType =  QuestionType.SingleChoice;
    const radios = questionTypeWindow.document.getElementsByName('questionType') as NodeListOf<HTMLInputElement>;
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

function addQuestionRow(questionType: QuestionType) {
    const questionsDiv = document.getElementById("questions");
    if (!questionsDiv) return;

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

    addDeleteButton(row);

    // Voeg extra inputveld toe voor mogelijke antwoorden, indien nodig
    if (questionType !== QuestionType.Open) {
        const answerInput = document.createElement("input");
        answerInput.type = "text";
        answerInput.name = questionType + "Answer";
        answerInput.placeholder = "Voeg een antwoord toe";
        row.appendChild(answerInput);

        const addAnswerButton = document.createElement("button");
        addAnswerButton.type = "button";
        addAnswerButton.textContent = "Voeg nog een antwoord toe";

        let answerButtonCount = 1; // Begin met 1, omdat er al één antwoordveld is toegevoegd
        addAnswerButton.onclick = function () {
            const additionalAnswerInput = document.createElement("input");
            additionalAnswerInput.type = "text";
            additionalAnswerInput.name = questionType + "Answer";
            additionalAnswerInput.placeholder = "Voeg een antwoord toe";
            row.appendChild(additionalAnswerInput);
            answerButtonCount++; // Verhoog de teller voor deze rij

            if (answerButtonCount >= 5) {
                addAnswerButton.disabled = true; // Schakel de knop uit na 3 keer klikken
            }
        };
        row.appendChild(addAnswerButton);
    }

    questionsDiv.appendChild(row);
}