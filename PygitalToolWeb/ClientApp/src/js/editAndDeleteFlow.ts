import {Modal} from "bootstrap";
import {loadFlows, Flow, FlowTypeEnum, Language} from "./addFlow";
import { QuestionType} from "../js/addQuestion"

//To add a screen to remove a flow
document.addEventListener('DOMContentLoaded', () => {
    const confirmationModal = document.getElementById('confirmationModal');
    confirmationModal?.addEventListener('show.bs.modal', (event: any) => {
        const button = event.relatedTarget as HTMLElement;
        const FlowId = button.getAttribute('data-flow-id');
        const confirmDeleteButton = document.getElementById('delete-confirm') as HTMLButtonElement;

        console.log("Modal shown, flow ID:", FlowId);

        confirmDeleteButton.onclick = () => {
            if (FlowId) {
               deleteFlow(parseInt(FlowId));
                const modalInstance = Modal.getInstance(confirmationModal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }
        };
    });
});
function deleteFlow(FlowId: number) {
    fetch(`/api/FlowCreation/DeleteFlow/${FlowId}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            console.log('Flow deleted successfully');
            loadFlows();
        } else {
            console.error('Failed to delete Flow');
            return response.text().then(text => Promise.reject(text));
        }
    })
}

//give a click event to display the edit view 
document.addEventListener('DOMContentLoaded', () => {
    const FlowContainer = document.getElementById('flow-container');
    if (FlowContainer) {
        FlowContainer.addEventListener('click', event => {
            const target = event.target as HTMLElement;
            const isEditButton = target.closest('.edit-flow-button');
            if (isEditButton) {
                const flowId = isEditButton.getAttribute('data-flow-id');
                if (flowId) {
                    showEditFlowForm(parseInt(flowId));
                }
            }
        });
    }
});
//HTML From the edit form
function editForm(FlowContainer: { innerHTML: string; }, flow: Flow):void{
    FlowContainer.innerHTML = `
                    <h2 class="mt-4">Edit Flows</h2>
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
                            <select class="form-select" id="flowLanguage" required>
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
function addQuestionButton(questionList: { appendChild: (arg0: HTMLButtonElement) => void; }): void{
    const addQuestionButton = document.createElement('button');
    addQuestionButton.textContent = 'Add Question';
    addQuestionButton.className = 'btn btn-success add-question-button';
    addQuestionButton.addEventListener('click', (event) => {
        event.preventDefault();
        addQuestionForm();

    });
    questionList?.appendChild(addQuestionButton);
}

function deleteQuestionButton(questionContainer: { remove: () => void; appendChild: (arg0: HTMLButtonElement) => void; }, question: any): void{
    const deleteButtonQuestion = document.createElement('button');
    deleteButtonQuestion.textContent = 'Delete';
    deleteButtonQuestion.className = 'btn btn-danger delete-question-button';
    deleteButtonQuestion.addEventListener('click', () => {
        questionContainer.remove();
        deleteQuestion(question.questionId)
    });
    questionContainer.appendChild(deleteButtonQuestion);
    
}function deleteAnswerpossibilitiesButton(answerPossibilityContainer: { remove: () => void; appendChild: (arg0: HTMLButtonElement) => void; }, possibility: any): void{
    const deleteButtonPossibility = document.createElement('button');
    deleteButtonPossibility.textContent = 'Delete';
    deleteButtonPossibility.className = 'btn btn-danger delete-answerposs-button';
    deleteButtonPossibility.addEventListener('click' , (event) => {
        event.preventDefault();
        answerPossibilityContainer.remove();
        deleteAnswerPossibility(possibility.answerPossibilityId);
    });

    answerPossibilityContainer.appendChild(deleteButtonPossibility);
}

function showQuestionAndAnswerPossibilities(question:any, index: any, questionList: { appendChild: (arg0: HTMLDivElement) => void; }): void{
    const questionContainer = document.createElement('div');
    questionContainer.className = 'question-container';
    questionContainer.setAttribute('data-question-id', question.questionId.toString());
    
    const questionInput = document.createElement('input');
    questionInput.type = 'text';
    questionInput.value = question.questionText;
    questionInput.name = `question-${index}`;
    questionInput.className = 'question-input';
    questionContainer.appendChild(questionInput);

    const questionTypeSelect = document.createElement('select');
    questionTypeSelect.name = `question-type-${index}`;
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
    answerPossibilitiesContainer.className = 'answer-possibilities-container';
    
    question.answerPossibilities.forEach((possibility: { answerPossibilityId: number; description: string; }, possibilityIndex: any) => {
        const answerPossibilityContainer = document.createElement('div');
        answerPossibilityContainer.className = 'answer-possibility-container'
        const possibilityInput = document.createElement('input');
        possibilityInput.setAttribute('data-AnswerPoss-id',possibility.answerPossibilityId.toString());
        possibilityInput.type = 'text';
        possibilityInput.value = possibility.description;
        possibilityInput.name = `question-${index}-possibility-${possibilityIndex}`;
        possibilityInput.className = 'answer-possibility-input';

        answerPossibilityContainer.appendChild(possibilityInput);
        deleteAnswerpossibilitiesButton(answerPossibilityContainer,possibility);
        
        answerPossibilitiesContainer.appendChild(answerPossibilityContainer);
    });
    const selectedQuestionType = parseInt(questionTypeSelect.value);
    if (selectedQuestionType !== QuestionType.Open) { // Alleen toevoegen als het geen open vraag is
        const addAnswerPossibilityButton = document.createElement('button');
        addAnswerPossibilityButton.textContent = 'Add Answer Possibility';
        addAnswerPossibilityButton.className = 'btn btn-success add-answerposs-button';
        addAnswerPossibilityButton.addEventListener('click', (event) => {
            event.preventDefault();
            addAnswerPossibility(questionContainer);
        });
        answerPossibilitiesContainer.appendChild(addAnswerPossibilityButton);
    }
    questionContainer.appendChild(answerPossibilitiesContainer);
    deleteQuestionButton(questionContainer,question);
    questionList.appendChild(questionContainer);
}

//shows the edit form
function showEditFlowForm(flowId: number): void {
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
                    addQuestionButton(questionList);
                    flow.questions.forEach((question, index) => {
                        showQuestionAndAnswerPossibilities(question,index,questionList);
                    });
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


function updateFlow(flowId: number): void {
    const flowNameInput = document.getElementById('flowName') as HTMLInputElement;
    const informationInput = document.getElementById('description') as HTMLTextAreaElement;
    const flowTypeRadio = document.querySelector('input[name="flowType"]:checked') as HTMLInputElement;
    const flowType = flowTypeRadio.value === 'Circular' ? FlowTypeEnum.Circular : FlowTypeEnum.Linear;
    const questionContainers = document.querySelectorAll('.question-container');
    const questions: any[] = Array.from(questionContainers).map((container: Element) => {
        const questionContainer = container as HTMLElement;
        const questionInput = questionContainer.querySelector('.question-input') as HTMLInputElement;
        const questionId = questionContainer.getAttribute('data-question-id');
        const questionTypeSelect = questionContainer.querySelector('select') as HTMLSelectElement;
        const selectedQuestionType = parseInt(questionTypeSelect.value);
        if (questionInput.value.trim() === '') {
            return null;
        }
        const answerPossibilityInputs = questionContainer.querySelectorAll('.answer-possibility-input') as NodeListOf<HTMLInputElement>;
        const filteredAnswerPossibilities = Array.from(answerPossibilityInputs).filter(input => input.value.trim() !== '');
        const answerPossibilities: any[] = Array.from(filteredAnswerPossibilities).map(input => {
            const answerPossibilityId = input.getAttribute('data-AnswerPoss-id');
            return {
                answerPossibilityId: answerPossibilityId,
                description: input.value
            };
        });
        return {
            questionId: questionId,
            questionText: questionInput.value,
            questionType:selectedQuestionType ,
            answerPossibilities: answerPossibilities
        };
    }).filter(question => question !== null);

    fetch(`/api/FlowCreation/UpdateFlow/${flowId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            FlowName: flowNameInput.value,
            FlowDescription: informationInput.value,
            FlowType: flowType,
            Questions: questions
        })
    })
        .then(response => {
            if (response.ok) {
                console.log('Flow updated successfully');
                loadFlows();
            } else {
                console.error('Failed to update flow');
                response.text().then(text => alert('Failed to update flow: ' + text));
            }
        })
        .catch(error => {
            console.error('Error updating flow:', error);
            alert('Error updating flow: ' + error);
        });
}

function deleteQuestion(questionId :number) {
    fetch(`/api/FlowCreation/DeleteQuestion/${questionId}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            console.log('Question deleted successfully');
        } else {
            console.error('Failed to delete question');
            return response.text().then(text => Promise.reject(text));
        }
    })
}
function deleteAnswerPossibility(AnswerPossibilityId :number) {
    fetch(`/api/FlowCreation/DeleteAnswerPossibility/${AnswerPossibilityId}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            console.log('AnswerPossibility deleted successfully');
        } else {
            console.error('Failed to AnswerPossibility');
            return response.text().then(text => Promise.reject(text));
        }
    })
}

function addQuestionForm() {
    const questionList = document.getElementById('question-list');
    if (questionList) {
        const newQuestionContainer = document.createElement('div');
        newQuestionContainer.className = 'question-container';

        const newQuestionInput = document.createElement('input');
        newQuestionInput.type = 'text';
        newQuestionInput.placeholder = 'Enter your question here';
        newQuestionInput.className = 'question-input';

        const newQuestionTypeSelect = document.createElement('select');
        newQuestionTypeSelect.name = 'new-question-type';
        for (let type in QuestionType) {
            if (!isNaN(Number(QuestionType[type]))) {
                const option = document.createElement('option');
                option.value = QuestionType[type].toString();
                option.text = type;

                newQuestionTypeSelect.appendChild(option);
            }
        }

        const newAnswerPossibilityContainer = document.createElement('div');
        newAnswerPossibilityContainer.className = 'answer-possibilities-container';
        
            const addAnswerPossibilityButton = document.createElement('button');
            addAnswerPossibilityButton.textContent = 'Add Answer Possibility';
            addAnswerPossibilityButton.className = 'btn btn-success add-answerposs-button';
            addAnswerPossibilityButton.addEventListener('click', (event) => {
                event.preventDefault();
                addAnswerPossibility(newQuestionContainer);
            });

            
        const deleteButtonQuestion = document.createElement('button');
        deleteButtonQuestion.textContent = 'Delete';
        deleteButtonQuestion.className = 'btn btn-danger delete-question-button';
        deleteButtonQuestion.addEventListener('click', () => {
            newQuestionContainer.remove();
        });

        newQuestionContainer.appendChild(newQuestionInput);
        newQuestionContainer.appendChild(newQuestionTypeSelect);
        newQuestionContainer.appendChild(newAnswerPossibilityContainer);
        newQuestionContainer.appendChild(addAnswerPossibilityButton);
        newQuestionContainer.appendChild(deleteButtonQuestion);
        newQuestionContainer.setAttribute('data-question-id', '0');
        questionList.appendChild(newQuestionContainer);
    }
}

function addAnswerPossibility(questionContainer: HTMLElement): void {
    const answerPossibilityContainer = questionContainer.querySelector('.answer-possibilities-container') as HTMLElement;
    const answerPossibilityInputs = answerPossibilityContainer.querySelectorAll('.answer-possibility-input');
    
    if (answerPossibilityInputs.length < 5) {
        const newAnswerPossibilityContainer = document.createElement('div');
        newAnswerPossibilityContainer.className = 'answer-possibility-container';

        const newPossibilityInput = document.createElement('input');
        newPossibilityInput.type = 'text';
        newPossibilityInput.placeholder = 'Enter answer possibility';
        newPossibilityInput.className = 'answer-possibility-input';
        newPossibilityInput.setAttribute('data-AnswerPoss-id', '0');

        const deleteButtonPossibility = document.createElement('button');
        deleteButtonPossibility.textContent = 'Delete';
        deleteButtonPossibility.className = 'btn btn-danger delete-answerposs-button';
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



