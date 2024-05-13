var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import { QuestionType } from "../js/addQuestion";
export const FlowTypeEnum = {
    Circular: 0,
    Linear: 1
};
export const Language = {
    English: 0,
    Dutch: 1
};
export class Flow {
    constructor(description, flowName, flowType, language, questions) {
        this.flowDescription = description;
        this.flowName = flowName;
        this.flowType = flowType;
        this.language = language;
        this.questions = questions || [];
    }
}
console.log('The addFLow.ts script bundle has been loaded!');
function ShowForm(FlowContainer) {
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
(_a = document.getElementById('add-Flow-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    var _a, _b, _c;
    console.log('Add button has been pressed!');
    const FlowContainer = document.getElementById('flow-container');
    if (FlowContainer) {
        ShowForm(FlowContainer);
        const scriptElement = document.getElementById('Flow-script');
        const subthemeId = scriptElement === null || scriptElement === void 0 ? void 0 : scriptElement.getAttribute('data-subtheme-id');
        (_a = document.getElementById('add-question-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', addQuestionForm);
        (_b = document.getElementById('cancel-button')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', loadFlows);
        (_c = document.getElementById('new-flow-form')) === null || _c === void 0 ? void 0 : _c.addEventListener('submit', function (event) {
            return __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                const flowNameInput = document.getElementById('flowName');
                const descriptionInput = document.getElementById('description');
                const flowTypeRadio = document.querySelector('input[name="flowType"]:checked');
                const flowType = flowTypeRadio.value === 'Circular' ? FlowTypeEnum.Circular : FlowTypeEnum.Linear;
                const questionContainers = document.querySelectorAll('.question-container');
                const questions = Array.from(questionContainers).map((container) => {
                    const questionContainer = container;
                    const questionInput = questionContainer.querySelector('.question-input');
                    const questionId = questionContainer.getAttribute('data-question-id');
                    const questionTypeSelect = questionContainer.querySelector('select');
                    const selectedQuestionType = parseInt(questionTypeSelect.value);
                    if (questionInput.value.trim() === '') {
                        return null;
                    }
                    const answerPossibilityInputs = questionContainer.querySelectorAll('.answer-possibility-input');
                    const filteredAnswerPossibilities = Array.from(answerPossibilityInputs).filter(input => input.value.trim() !== '');
                    const answerPossibilities = Array.from(filteredAnswerPossibilities).map(input => {
                        const answerPossibilityId = input.getAttribute('data-AnswerPoss-id');
                        return {
                            answerPossibilityId: answerPossibilityId,
                            description: input.value
                        };
                    });
                    return {
                        questionId: questionId,
                        questionText: questionInput.value,
                        questionType: selectedQuestionType,
                        answerPossibilities: answerPossibilities
                    };
                }).filter(question => question !== null);
                const flowLanguageSelect = document.getElementById('flowLanguage');
                const flowLanguage = parseInt(flowLanguageSelect.value);
                if (!flowNameInput || !descriptionInput || !flowTypeRadio)
                    return;
                const flowName = flowNameInput.value;
                const description = descriptionInput.value;
                // Create a new flow instance
                const newFlow = new Flow(description, flowName, flowType, flowLanguage, questions);
                const response = yield fetch('/api/FlowCreation/AddFlowToSubtheme', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        FlowName: newFlow.flowName,
                        FlowDescription: newFlow.flowDescription,
                        FlowType: newFlow.flowType,
                        SubthemeId: subthemeId,
                        Questions: questions,
                        Language: flowLanguage
                    })
                });
                if (response.ok) {
                    loadFlows();
                }
                else {
                    let errorMessage = 'Failed to add flow';
                    if (response.status === 400) {
                        errorMessage = 'Fill all data!';
                    }
                    else if (response.status === 404) {
                        errorMessage = 'Not Found';
                    }
                    else if (response.status === 409) {
                        errorMessage = 'Conflict - Key exists already';
                    }
                    else if (response.status === 500) {
                        errorMessage = 'Internal Server Error';
                    }
                    alert(errorMessage);
                }
            });
        });
    }
});
function addQuestionForm() {
    const questionList = document.getElementById('questions-container');
    if (questionList) {
        const newQuestionContainer = document.createElement('div');
        newQuestionContainer.className = 'question-container';
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
function addAnswerPossibility(questionContainer) {
    const answerPossibilityContainer = questionContainer.querySelector('.answer-possibilities-container');
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
    }
    else {
        alert('Maximum number of answer possibilities reached (5)');
    }
}
export function loadFlows() {
    window.location.href = window.location.href;
}
