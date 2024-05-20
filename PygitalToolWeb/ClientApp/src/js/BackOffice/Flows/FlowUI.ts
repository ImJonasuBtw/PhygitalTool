import {Flow, FlowTypeEnum, Language, QuestionType} from "./Flow";
import {deleteAnswerPossibility, deleteQuestion, updateFlow} from "./FlowRestClient";

 export function ShowForm(FlowContainer: { innerHTML: string; }): void {
    FlowContainer.innerHTML = `
            <h2 class="mt-4">Add New Flow</h2>
            <form id="new-flow-form">
                <div class="mb-3">
                    <label for="flowName" class="form-label">Flow name</label>
                    <input type="text" class="form-control" id="flowName" required>
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" required></textarea>
                </div>
                <div class="mb-3">
                     <label class="form-label">Flow Type</label>
                         <div class="form-check">
                              <input class="form-check-input" type="radio" name="flowType" id="circularFlow" value="Circular">
                              <label class="form-check-label" for="circularFlow"> Circulair </label>
                         </div>
                         <div class="form-check">
                              <input class="form-check-input" type="radio" name="flowType" id="linearFlow" value="Linear">
                              <label class="form-check-label" for="linearFlow"> Lineair</label>
                         </div>
                         
                </div>
                <div class="mb-3">
                    <label class="form-label">Language</label>
                        <select class="form-select form-control" id="flowLanguage" required>
                                 <option value="${Language.English}">English</option>
                                 <option value="${Language.Dutch}">Dutch</option>
                        </select>
                </div>
                <div class="mb-3">
                          <div id="questions-container">
                                     <!-- Here question rows will be added -->
                          </div>
                          <button type="button" id="add-question-button" class="add-question-button btn btn-primary me-2 mt-3">Add Question</button>
                </div>
                <button type="submit" class="btn btn-primary">Add Flow</button>
                <button type="button" class="btn btn-secondary" id="cancel-button">Cancel</button>
            </form>
        `;
}

 export function addQuestionForm() {
    const questionList = document.getElementById('questions-container');
    if (questionList) {
        const newQuestionContainer = document.createElement('div');
        newQuestionContainer.className = 'question-container';

        const questionIndex = questionList.getElementsByClassName('question-container').length;

        const imageInputLabel = document.createElement("label");
        imageInputLabel.setAttribute("for", QuestionType + "File" + questionIndex);
        imageInputLabel.textContent = "Flow image:";

        const imageInput = document.createElement("input");
        imageInput.type = "file";
        imageInput.className = "form-control";
        imageInput.id = QuestionType + "File" + questionIndex;
        imageInput.name = "file" + questionIndex;
        imageInput.accept = ".jpg,.jpeg,.png";
        imageInputLabel.appendChild(imageInput);

        newQuestionContainer.appendChild(imageInputLabel);

        const newQuestionInput = document.createElement('input');
        newQuestionInput.type = 'text';
        newQuestionInput.placeholder = 'Enter your question here';
        newQuestionInput.className = 'question-input mb-3 mt-3 input-styling col-md-10';

        const newQuestionTypeSelect = document.createElement('select');
        newQuestionTypeSelect.name = 'new-question-type';
        newQuestionTypeSelect.className = 'form-select form-control';
        for (let type in QuestionType) {
            if (!isNaN(Number(QuestionType[type]))) {
                const option = document.createElement('option');
                option.value = QuestionType[type].toString();
                option.text = type;
                option.className = ' ';
                newQuestionTypeSelect.appendChild(option);
            }
        }

        const newAnswerPossibilityContainer = document.createElement('div');
        newAnswerPossibilityContainer.className = 'answer-possibilities-container';

        const addAnswerPossibilityButton = document.createElement('button');
        addAnswerPossibilityButton.textContent = 'Add Answer Possibility';
        addAnswerPossibilityButton.className = 'btn btn-primary add-answerposs-button col-md-4 mt-3';
        addAnswerPossibilityButton.addEventListener('click', (event) => {
            event.preventDefault();
            addAnswerPossibility(newQuestionContainer);
        });


        const deleteButtonQuestion = document.createElement('button');
        deleteButtonQuestion.className = 'btn btn-outline-danger delete-question-button col-md-1';
        const iconElement = document.createElement('i');
        iconElement.className = 'bi-trash';
        deleteButtonQuestion.appendChild(iconElement);
        deleteButtonQuestion.addEventListener('click', () => {
            newQuestionContainer.remove();
        });

        newQuestionContainer.appendChild(newQuestionInput);
        newQuestionContainer.appendChild(deleteButtonQuestion);
        newQuestionContainer.appendChild(newQuestionTypeSelect);
        newQuestionContainer.appendChild(newAnswerPossibilityContainer);
        newQuestionContainer.appendChild(addAnswerPossibilityButton);
        newQuestionContainer.setAttribute('data-question-id', '0');
        questionList.appendChild(newQuestionContainer);
    }
}

function addAnswerPossibility(questionContainer: HTMLElement): void {
    const answerPossibilityContainer = questionContainer.querySelector('.answer-possibilities-container') as HTMLElement;
    const answerPossibilityInputs = answerPossibilityContainer.querySelectorAll('.answer-possibility-input');
    if (answerPossibilityInputs.length < 5) {
        const newAnswerPossibilityContainer = document.createElement('div');
        newAnswerPossibilityContainer.className = 'answer-possibility-container mt-3';

        const newPossibilityInput = document.createElement('input');
        newPossibilityInput.type = 'text';
        newPossibilityInput.placeholder = 'Enter answer possibility';
        newPossibilityInput.className = 'answer-possibility-input input-styling mb-2 col-md-10';
        newPossibilityInput.setAttribute('data-AnswerPoss-id', '0');

        const deleteButtonPossibility = document.createElement('button');
        deleteButtonPossibility.className = 'btn btn-outline-danger delete-answerposs-button col-md-1';
        const iconElement = document.createElement('i');
        iconElement.className = 'bi-trash';
        deleteButtonPossibility.appendChild(iconElement);
        deleteButtonPossibility.addEventListener('click', () => {
            newAnswerPossibilityContainer.remove();
        });

        newAnswerPossibilityContainer.appendChild(newPossibilityInput);
        newAnswerPossibilityContainer.appendChild(deleteButtonPossibility);

        answerPossibilityContainer.appendChild(newAnswerPossibilityContainer);
        answerPossibilityContainer.setAttribute("data-AnswerPoss-id", '0');
    } else {
        alert('Maximum number of answer possibilities reached (5)');
    }
}

export function editForm(FlowContainer: { innerHTML: string; }, flow: Flow):void{
    FlowContainer.innerHTML = `
                    <h2 class="mt-4">Edit Flow</h2>
                    <form id="edit-flow-form">
                        <div class="mb-3">
                            <label for="flowName" class="form-label">Flow name</label>
                             <input type="text" class="form-control" id="flowName" required value="${flow.flowName}">
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <textarea class="form-control" id="description" required>${flow.flowDescription}</textarea>
                        </div>
                        <div class="mb-3">
                        <label class="form-label">Flow Type</label>
                          <div class="form-check">
                                <input class="form-check-input" type="radio" name="flowType" id="circularFlow" value="Circular" ${flow.flowType === FlowTypeEnum.Circular ? 'checked' : ''}>
                                <label class="form-check-label" for="circularFlow"> Circulair </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flowType" id="linearFlow" value="Linear" ${flow.flowType === FlowTypeEnum.Linear ? 'checked' : ''}>
                                <label class="form-check-label" for="linearFlow"> Lineair</label>
                            </div>
                         
                        </div>
                          <div class="mb-3">
                            <label class="form-label">Language</label>
                            <select class="form-select form-control" id="flowLanguage" required>
                                <option value="${Language.English}" ${flow.language === Language.English ? 'selected' : ''}>English</option>
                                <option value="${Language.Dutch}" ${flow.language === Language.Dutch ? 'selected' : ''}>Dutch</option>
                            </select>
                        </div>
                           
                        <div class="mb-3">
                            <h3>Questions</h3>
                            <div id="question-list"></div>
                            
                            
                        </div>
                                
                        <button type="submit" class="btn btn-primary">Update flow</button>
                        <button type="button" class="btn btn-secondary" id="cancel-button">Cancel</button>
                    </form>
                `;
}

export function addQuestionButton(questionList: { appendChild: (arg0: HTMLButtonElement) => void; }): void{
    const addQuestionButton = document.createElement('button');
    addQuestionButton.textContent = 'Add Question';
    addQuestionButton.className = 'add-question-button btn btn-primary me-2 mt-3';
    addQuestionButton.addEventListener('click', (event) => {
        event.preventDefault();
        addQuestionForm2();

    });
    questionList?.appendChild(addQuestionButton);
}

export function deleteQuestionButton(questionContainer: { remove: () => void; appendChild: (arg0: HTMLButtonElement) => void; }, question: any): void{
    const deleteButtonQuestion = document.createElement('button');
    deleteButtonQuestion.textContent = '';
    deleteButtonQuestion.className = 'btn btn-outline-danger delete-question-button col-md-1';
    const iconElement = document.createElement('i');
    iconElement.className = 'bi-trash';
    deleteButtonQuestion.appendChild(iconElement);
    deleteButtonQuestion.addEventListener('click', () => {
        questionContainer.remove();
        deleteQuestion(question.questionId)
    });
    questionContainer.appendChild(deleteButtonQuestion);

}

export function deleteAnswerpossibilitiesButton(answerPossibilityAndButton: { remove: () => void; appendChild: (arg0: HTMLButtonElement) => void; }, possibility: any): void{
    const deleteButtonPossibility = document.createElement('button');
    deleteButtonPossibility.className = 'btn  btn-outline-danger delete-answerposs-button col-md-2';
    const iconElement = document.createElement('i');
    iconElement.className = 'bi-trash';
    deleteButtonPossibility.appendChild(iconElement);
    deleteButtonPossibility.addEventListener('click' , (event) => {
        event.preventDefault();
        answerPossibilityAndButton.remove();
        deleteAnswerPossibility(possibility.answerPossibilityId);
    });

    answerPossibilityAndButton.appendChild(deleteButtonPossibility);
}

export function showQuestionAndAnswerPossibilities(question:any, index: any, questionList: { appendChild: (arg0: HTMLDivElement) => void; }): void{
    const questionContainer = document.createElement('div');
    questionContainer.className = 'question-container';
    questionContainer.setAttribute('data-question-id', question.questionId.toString());

    const questionInput = document.createElement('input');
    questionInput.type = 'text';
    questionInput.value = question.questionText;
    questionInput.name = `question-${index}`;
    questionInput.className = 'question-input input-styling mb-3 col-md-10  mt-3 bold';
    questionContainer.appendChild(questionInput);

    const imageInputLabel = document.createElement("label");
    imageInputLabel.setAttribute("for", question.questionType + "File");
    imageInputLabel.textContent = "Flow image:";

    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.className = "form-control";
    imageInput.id = question.questionType + "File";
    imageInput.name = "file";
    imageInput.accept = ".jpg,.jpeg,.png";
    imageInputLabel.appendChild(imageInput);


    const existingImage = document.createElement("img");
    existingImage.id = "existingImage";
    existingImage.style.maxWidth = "200px";
    existingImage.style.display = "none";


    if (question.questionImage) {
        existingImage.src = question.questionImage;
        existingImage.style.display = "block";
    }
    questionContainer.appendChild(existingImage);
    questionContainer.appendChild(imageInputLabel);


    deleteQuestionButton(questionContainer,question);

    const questionTypeSelect = document.createElement('select');
    questionTypeSelect.name = `question-type-${index}`;
    questionTypeSelect.className = 'form-select form-control mt-3';
    for (let type in QuestionType) {
        if (!isNaN(Number(QuestionType[type]))) {
            const option = document.createElement('option');
            option.value = QuestionType[type].toString();
            option.text = type;
            if (QuestionType[type].toString() === question.questionType.toString()) {
                option.selected = true;
            }
            questionTypeSelect.appendChild(option);
        }
    }
    questionContainer.appendChild(questionTypeSelect);

    const answerPossibilitiesContainer = document.createElement('div');
    answerPossibilitiesContainer.className = 'answer-possibilities-container row';

    question.answerPossibilities.forEach((possibility: { answerPossibilityId: number; description: string; }, possibilityIndex: any) => {
        const answerPossibilityContainer = document.createElement('div');
        answerPossibilityContainer.className = 'answer-possibility-container col-md-4 pt-3'
        const answerPossibilityAndButton = document.createElement('div');
        answerPossibilityAndButton.className = 'buttonAndPossibility row'
        const possibilityInput = document.createElement('input');
        possibilityInput.setAttribute('data-AnswerPoss-id',possibility.answerPossibilityId.toString());
        possibilityInput.type = 'text';
        possibilityInput.value = possibility.description;
        possibilityInput.name = `question-${index}-possibility-${possibilityIndex}`;
        possibilityInput.className = 'answer-possibility-input  input-styling col-md-9 ml-3';


        answerPossibilityContainer.appendChild(answerPossibilityAndButton);
        answerPossibilityAndButton.appendChild(possibilityInput)
        deleteAnswerpossibilitiesButton(answerPossibilityAndButton,possibility);

        answerPossibilitiesContainer.appendChild(answerPossibilityContainer);
    });
    const selectedQuestionType = parseInt(questionTypeSelect.value);
    if (selectedQuestionType !== QuestionType.Open) { // Alleen toevoegen als het geen open vraag is
        const addAnswerPossibilityButton = document.createElement('button');
        addAnswerPossibilityButton.textContent = 'Add Answer Possibility';
        addAnswerPossibilityButton.className = 'add-answerposs-button mt-3 btn btn-primary me-2';
        addAnswerPossibilityButton.addEventListener('click', (event) => {
            event.preventDefault();
            addAnswerPossibility(questionContainer);
        });
        answerPossibilitiesContainer.appendChild(addAnswerPossibilityButton);
    }
    questionContainer.appendChild(answerPossibilitiesContainer);
    questionList.appendChild(questionContainer);
}


export function showEditFlowForm(flowId: number): void {
    fetch(`/api/FlowCreation/GetFlowDetails/${flowId}`)
        .then(response => response.json())
        .then((flow: Flow) => {
            console.log(flow)
            const FlowContainer = document.getElementById('flow-container');
            if (FlowContainer) {
                editForm(FlowContainer, flow)
                // Render questions
                const questionList = document.getElementById('question-list');
                if (questionList) {
                    flow.questions.forEach((question, index) => {
                        showQuestionAndAnswerPossibilities(question,index,questionList);
                    });
                    addQuestionButton(questionList);
                }
                document.getElementById('cancel-button')?.addEventListener('click', loadFlows);
                document.getElementById('edit-flow-form')?.addEventListener('submit', function (event) {
                    event.preventDefault();
                    updateFlow(flowId);
                });

            }
        })
        .catch(error => console.error('Failed to fetch flow details:', error));
}

function addQuestionForm2() {
    const questionList = document.getElementById('question-list');
    if (questionList) {
        const newQuestionContainer = document.createElement('div');
        newQuestionContainer.className = 'question-container';

        const questionIndex = questionList.getElementsByClassName('question-container').length;

        const imageInputLabel = document.createElement("label");
        imageInputLabel.setAttribute("for", QuestionType + "File" + questionIndex);
        imageInputLabel.textContent = "Flow image:";

        const imageInput = document.createElement("input");
        imageInput.type = "file";
        imageInput.className = "form-control";
        imageInput.id = QuestionType + "File" + questionIndex;
        imageInput.name = "file" + questionIndex;
        imageInput.accept = ".jpg,.jpeg,.png";
        imageInputLabel.appendChild(imageInput);

        newQuestionContainer.appendChild(imageInputLabel);

        const newQuestionInput = document.createElement('input');
        newQuestionInput.type = 'text';
        newQuestionInput.placeholder = 'Enter your question here';
        newQuestionInput.className = 'question-input mb-3 mt-3 input-styling col-md-10';

        const newQuestionTypeSelect = document.createElement('select');
        newQuestionTypeSelect.name = 'new-question-type';
        newQuestionTypeSelect.className = 'form-select form-control';
        for (let type in QuestionType) {
            if (!isNaN(Number(QuestionType[type]))) {
                const option = document.createElement('option');
                option.value = QuestionType[type].toString();
                option.text = type;
                option.className = ' ';
                newQuestionTypeSelect.appendChild(option);
            }
        }

        const newAnswerPossibilityContainer = document.createElement('div');
        newAnswerPossibilityContainer.className = 'answer-possibilities-container';

        const addAnswerPossibilityButton = document.createElement('button');
        addAnswerPossibilityButton.textContent = 'Add Answer Possibility';
        addAnswerPossibilityButton.className = 'btn btn-primary add-answerposs-button col-md-4 mt-3';
        addAnswerPossibilityButton.addEventListener('click', (event) => {
            event.preventDefault();
            addAnswerPossibility2(newQuestionContainer);
        });


        const deleteButtonQuestion = document.createElement('button');
        deleteButtonQuestion.className = 'btn btn-outline-danger delete-question-button col-md-1';
        const iconElement = document.createElement('i');
        iconElement.className = 'bi-trash';
        deleteButtonQuestion.appendChild(iconElement);
        deleteButtonQuestion.addEventListener('click', () => {
            newQuestionContainer.remove();
        });

        newQuestionContainer.appendChild(newQuestionInput);
        newQuestionContainer.appendChild(deleteButtonQuestion);
        newQuestionContainer.appendChild(newQuestionTypeSelect);
        newQuestionContainer.appendChild(newAnswerPossibilityContainer);
        newQuestionContainer.appendChild(addAnswerPossibilityButton);
        newQuestionContainer.setAttribute('data-question-id', '0');
        questionList.appendChild(newQuestionContainer);
    }
}

function addAnswerPossibility2(questionContainer: HTMLElement): void {
    const answerPossibilityContainer = questionContainer.querySelector('.answer-possibilities-container') as HTMLElement;
    const answerPossibilityInputs = answerPossibilityContainer.querySelectorAll('.answer-possibility-input');
    if (answerPossibilityInputs.length < 5) {
        const newAnswerPossibilityContainer = document.createElement('div');
        newAnswerPossibilityContainer.className = 'answer-possibility-container mt-3';

        const newPossibilityInput = document.createElement('input');
        newPossibilityInput.type = 'text';
        newPossibilityInput.placeholder = 'Enter answer possibility';
        newPossibilityInput.className = 'answer-possibility-input input-styling mb-2 col-md-10';
        newPossibilityInput.setAttribute('data-AnswerPoss-id', '0');

        const deleteButtonPossibility = document.createElement('button');
        deleteButtonPossibility.className = 'btn btn-outline-danger delete-answerposs-button col-md-1';
        const iconElement = document.createElement('i');
        iconElement.className = 'bi-trash';
        deleteButtonPossibility.appendChild(iconElement);
        deleteButtonPossibility.addEventListener('click', () => {
            newAnswerPossibilityContainer.remove();
        });

        newAnswerPossibilityContainer.appendChild(newPossibilityInput);
        newAnswerPossibilityContainer.appendChild(deleteButtonPossibility);

        answerPossibilityContainer.appendChild(newAnswerPossibilityContainer);
        answerPossibilityContainer.setAttribute("data-AnswerPoss-id", '0');
    } else {
        alert('Maximum number of answer possibilities reached (5)');
    }
}

export function loadFlows() {
    window.location.href = window.location.href
}

