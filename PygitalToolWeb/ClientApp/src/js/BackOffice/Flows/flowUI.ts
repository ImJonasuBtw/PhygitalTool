import {Flow, FlowTypeEnum, Language, QuestionType} from "./flow";
import {deleteAnswerPossibility, deleteQuestion} from "./flowRestClient";

// Renders a form to add a new flow to the specified container.
 export function ShowForm(FlowContainer: { innerHTML: string; }): void {
    FlowContainer.innerHTML = `
            <h2 class="mt-4">Nieuwe stroom toevoegen</h2>
            <form id="new-flow-form">
                <div class="mb-3">
                    <label for="flowName" class="form-label">Flow naam</label>
                    <input type="text" class="form-control" id="flowName" required>
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Beschrijving</label>
                    <textarea class="form-control" id="description" required></textarea>
                </div>
                 <div class="mb-3">
                    <label for="flowLogo" class="form-label">Flow Logo</label>
                    <input type="file" class="form-control" id="flowLogo" accept="image/*">
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
                    <label class="form-label">Taal</label>
                        <select class="form-select form-control" id="flowLanguage" required>
                                 <option value="${Language.English}">English</option>
                                 <option value="${Language.Dutch}">Dutch</option>
                                 <option value="${Language.French}">French</option>
                                 <option value="${Language.German}">German</option>
                        </select>
                </div>
                <div class="mb-3">
                          <div id="question-list">
                                    
                          </div>
                          <button type="button" id="add-question-button" class="add-question-button btn btn-primary me-2 mt-3">Add Question</button>
                </div>
                <button type="submit" class="btn btn-primary">Add Flow</button>
                <button type="button" class="btn btn-secondary" id="cancel-button">Cancel</button>
            </form>
        `;
}

// Renders a form to add a new question to the question list.
 export function QuestionForm() {
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
            AnswerPossibility(newQuestionContainer);
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

// Adds a new answer possibility to the specified question container.
function AnswerPossibility(questionContainer: HTMLElement): void {
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
        answerPossibilityContainer.setAttribute("data-AnswerPoss-id", '0');

        const addAnswerPossButton = answerPossibilityContainer.querySelector('.add-answerposs-button');
        if (addAnswerPossButton) {
            answerPossibilityContainer.insertBefore(newAnswerPossibilityContainer, addAnswerPossButton);
        } else {
            answerPossibilityContainer.appendChild(newAnswerPossibilityContainer);
        }
    } else {
        alert('Maximum number of answer possibilities reached (5)');
    }
}

// Renders an edit form for a flow, populating it with existing data from a flow for editing.
export function editForm(FlowContainer: { innerHTML: string; }, flow: Flow):void{
    FlowContainer.innerHTML = `
                    <h2 class="mt-4">Flow bewerken</h2>
                    <form id="edit-flow-form">
                        <div class="mb-3">
                            <label for="flowName" class="form-label">Flow naam</label>
                             <input type="text" class="form-control" id="flowName" required value="${flow.flowName}">
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Beschrijvind</label>
                            <textarea class="form-control" id="description" required>${flow.flowDescription}</textarea>
                        </div>
                        
                         <div class="mb-3">
                            <label for="flowLogo" class="form-label">Flow Logo</label>
                            <img id="existingFlowImage" src="${flow.flowImage}" alt="foto">
                            <input type="file" class="form-control" id="flowLogo" accept="image/*">
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
                            <label class="form-label">Taal</label>
                            <select class="form-select form-control" id="flowLanguage" required>
                                <option value="${Language.English}" ${flow.language === Language.English ? 'selected' : ''}>English</option>
                                <option value="${Language.Dutch}" ${flow.language === Language.Dutch ? 'selected' : ''}>Dutch</option>
                                   <option value="${Language.French}"${flow.language === Language.French ? 'selected' : ''}>French</option>
                                 <option value="${Language.German}"${flow.language === Language.German ? 'selected' : ''}>German</option>
                            </select>
                        </div>
                           
                   
                            <h3>Questions</h3>
                              <div class="mb-3">
                            <div id="question-list">
                                    
                          </div>
                          <div id="QuestionButton">
                          </div>
                     
                        </div>
                        
                                
                        <button type="submit" class="btn btn-primary">Update flow</button>
                        <button type="button" class="btn btn-secondary" id="cancel-button">Cancel</button>
                    </form>
                `;
}


//Creates and appends a button for adding a new question to a form. When clicked, it triggers the display of a question input form.
export function addQuestionButton(QuestionButton: HTMLElement | null ): void{
    const addQuestionButton = document.createElement('button');
    addQuestionButton.textContent = 'Add Question';
    addQuestionButton.className = 'add-question-button btn btn-primary me-2 mt-3';
    addQuestionButton.addEventListener('click', (event) => {
        event.preventDefault();
        QuestionForm();
    });
    QuestionButton?.appendChild(addQuestionButton);
}

// Creates and appends a delete button for a question. When clicked, it removes the question container from the DOM and triggers the deletion of the corresponding question from the database.
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

// Creates a delete button for an answer possibility in a form. When clicked, it removes the corresponding answer possibility container from the DOM and triggers the deletion of the corresponding answer possibility from the database.
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

// Creates and populates a question container with input fields for a question and its answer possibilities, along with buttons for user interactions.
export function showQuestionAndAnswerPossibilities(question:any, index: any, questionList: HTMLElement): void{
    const questionContainer = document.createElement('div');
    questionContainer.className = 'question-container';
    questionContainer.setAttribute('data-question-id', question.questionId.toString());

    const moveUpButton = document.createElement('button');
    moveUpButton.className = 'btn btn-secondary move-up-button btn-sm';
    const iconElement = document.createElement('i');
    iconElement.className = 'bi-arrow-up';
    moveUpButton.appendChild(iconElement);
    moveUpButton.addEventListener('click', (event) => {
        event.preventDefault();
        const previousQuestionContainer = questionContainer.previousElementSibling;
        if (previousQuestionContainer) {
            const currentAnswerPossibilities = questionContainer.querySelectorAll('.answer-possibility-input');
            const previousAnswerPossibilities = previousQuestionContainer.querySelectorAll('.answer-possibility-input');

            console.log('Current answer possibilities:', currentAnswerPossibilities);
            console.log('Previous answer possibilities:', previousAnswerPossibilities);

            currentAnswerPossibilities.forEach((input, index) => {
                const temp = input.getAttribute('data-question-id') || '';
                const previousQuestionId = previousAnswerPossibilities[index].getAttribute('data-question-id') || '';
                console.log(`Swapping questionId ${temp} with ${previousQuestionId}`);
                input.setAttribute('data-question-id', previousQuestionId);
                previousAnswerPossibilities[index].setAttribute('data-question-id', temp);
            });

            const currentQuestionId = questionContainer.getAttribute('data-question-id');
            const previousQuestionId = previousQuestionContainer.getAttribute('data-question-id');

            console.log('Current question ID:', currentQuestionId);
            console.log('Previous question ID:', previousQuestionId);
           
            if (currentQuestionId && previousQuestionId) {
                questionContainer.setAttribute('data-question-id', previousQuestionId);
                previousQuestionContainer.setAttribute('data-question-id', currentQuestionId);
            }

            questionList.insertBefore(questionContainer, previousQuestionContainer);
        }
    });





    const moveDownButton = document.createElement('button');
    moveDownButton.className = 'btn btn-secondary move-down-button btn-sm';
    const iconElement2 = document.createElement('i');
    iconElement2.className = 'bi-arrow-down';
    moveDownButton.appendChild(iconElement2);
    moveDownButton.addEventListener('click', (event) => {
        event.preventDefault();
        const nextQuestionContainer = questionContainer.nextElementSibling;
        if (nextQuestionContainer) {
            
            const currentAnswerPossibilities = questionContainer.querySelectorAll('.answer-possibility-input');
            const nextAnswerPossibilities = nextQuestionContainer.querySelectorAll('.answer-possibility-input');

            console.log('Current answer possibilities:', currentAnswerPossibilities);
            console.log('Next answer possibilities:', nextAnswerPossibilities);

            
            currentAnswerPossibilities.forEach((input, index) => {
                const temp = input.getAttribute('data-question-id') || '';
                const nextQuestionId = nextAnswerPossibilities[index].getAttribute('data-question-id') || '';
                console.log(`Swapping questionId ${temp} with ${nextQuestionId}`);
                input.setAttribute('data-question-id', nextQuestionId);
                nextAnswerPossibilities[index].setAttribute('data-question-id', temp);
            });

           
            const currentQuestionId = questionContainer.getAttribute('data-question-id');
            const nextQuestionId = nextQuestionContainer.getAttribute('data-question-id');

            console.log('Current question ID:', currentQuestionId);
            console.log('Next question ID:', nextQuestionId);

            
            if (currentQuestionId && nextQuestionId) {
                
                questionContainer.setAttribute('data-question-id', nextQuestionId);
                nextQuestionContainer.setAttribute('data-question-id', currentQuestionId);
            }

            
            const nextElementSibling = nextQuestionContainer.nextElementSibling;
            if (nextElementSibling) {
                questionList.insertBefore(questionContainer, nextElementSibling.nextElementSibling);
            } else {
                questionList.appendChild(questionContainer);
            }
        }
    });


 

    const questionInput = document.createElement('input');
    questionInput.type = 'text';
    questionInput.value = question.questionText;
    questionInput.name = `question-${index}`;
    questionInput.className = 'question-input input-styling mb-3 col-md-10  mt-3 bold';
    questionContainer.appendChild(questionInput);

    const upAndDOwnButtonsContainer = document.createElement('div');
    upAndDOwnButtonsContainer.appendChild(moveUpButton);
    upAndDOwnButtonsContainer.appendChild(moveDownButton);
    questionContainer.appendChild(upAndDOwnButtonsContainer);

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
        possibilityInput.setAttribute('data-question-id', question.questionId.toString());
        possibilityInput.type = 'text';
        possibilityInput.value = possibility.description;
        possibilityInput.name = `question-${index}-possibility-${possibilityIndex}`;
        possibilityInput.className = 'answer-possibility-input  input-styling col-md-9 ml-3';
        
        answerPossibilityAndButton.appendChild(possibilityInput)
        answerPossibilityContainer.appendChild(answerPossibilityAndButton);
        deleteAnswerpossibilitiesButton(answerPossibilityAndButton,possibility);

        answerPossibilitiesContainer.appendChild(answerPossibilityContainer);
    });
  
    questionContainer.appendChild(answerPossibilitiesContainer);
    const selectedQuestionType = parseInt(questionTypeSelect.value);
    if (selectedQuestionType !== QuestionType.Open) { // Alleen toevoegen als het geen open vraag is
        const addAnswerPossibilityButton = document.createElement('button');
        addAnswerPossibilityButton.textContent = 'Add Answer Possibility';
        addAnswerPossibilityButton.className = 'add-answerposs-button mt-3 btn btn-primary me-2';
        addAnswerPossibilityButton.addEventListener('click', (event) => {
            event.preventDefault();
            AnswerPossibility(questionContainer);
        });
        answerPossibilitiesContainer.appendChild(addAnswerPossibilityButton);
    }
    questionList.appendChild(questionContainer);
}

// Reloads the current page to refresh the flows.
export function loadFlows() {
    window.location.href = window.location.href
}

