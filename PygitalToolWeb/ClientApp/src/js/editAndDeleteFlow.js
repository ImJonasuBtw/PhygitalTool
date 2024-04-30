import bootstrap from "bootstrap";
import { loadFlows, FlowTypeEnum, Language } from "./addFlow";
import { QuestionType } from "../js/addQuestion";
document.addEventListener('DOMContentLoaded', () => {
    const confirmationModal = document.getElementById('confirmationModal');
    confirmationModal === null || confirmationModal === void 0 ? void 0 : confirmationModal.addEventListener('show.bs.modal', (event) => {
        const button = event.relatedTarget;
        const FlowId = button.getAttribute('data-flow-id');
        const confirmDeleteButton = document.getElementById('delete-confirm');
        console.log("Modal shown, flow ID:", FlowId);
        confirmDeleteButton.onclick = () => {
            if (FlowId) {
                deleteFlow(parseInt(FlowId));
                const modalInstance = bootstrap.Modal.getInstance(confirmationModal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }
        };
    });
});
function deleteFlow(FlowId) {
    fetch(`/api/FlowCreation/DeleteFlow/${FlowId}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            console.log('Flow deleted successfully');
            loadFlows();
        }
        else {
            console.error('Failed to delete Flow');
            return response.text().then(text => Promise.reject(text));
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const FlowContainer = document.getElementById('flow-container');
    if (FlowContainer) {
        FlowContainer.addEventListener('click', event => {
            const target = event.target;
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
function showEditFlowForm(flowId) {
    fetch(`/api/FlowCreation/GetFlowDetails/${flowId}`)
        .then(response => response.json())
        .then((flow) => {
        var _a, _b;
        console.log(flow);
        const FlowContainer = document.getElementById('flow-container');
        if (FlowContainer) {
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
            // Render questions
            const questionList = document.getElementById('question-list');
            if (questionList) {
                const addQuestionButton = document.createElement('button');
                addQuestionButton.textContent = 'Add Question';
                addQuestionButton.className = 'btn btn-success add-question-button';
                addQuestionButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    addQuestionForm();
                });
                questionList === null || questionList === void 0 ? void 0 : questionList.appendChild(addQuestionButton);
                flow.questions.forEach((question, index) => {
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
                    question.answerPossibilities.forEach((possibility, possibilityIndex) => {
                        const answerPossibilityContainer = document.createElement('div');
                        answerPossibilityContainer.className = 'answer-possibility-container';
                        const possibilityInput = document.createElement('input');
                        possibilityInput.setAttribute('data-AnswerPoss-id', possibility.answerPossibilityId.toString());
                        possibilityInput.type = 'text';
                        possibilityInput.value = possibility.description;
                        possibilityInput.name = `question-${index}-possibility-${possibilityIndex}`;
                        possibilityInput.className = 'answer-possibility-input';
                        const deleteButtonPossibility = document.createElement('button');
                        deleteButtonPossibility.textContent = 'Delete';
                        deleteButtonPossibility.className = 'btn btn-danger delete-answerposs-button';
                        deleteButtonPossibility.addEventListener('click', (event) => {
                            event.preventDefault();
                            answerPossibilityContainer.remove();
                            deleteAnswerPossibility(possibility.answerPossibilityId);
                        });
                        answerPossibilityContainer.appendChild(possibilityInput);
                        answerPossibilityContainer.appendChild(deleteButtonPossibility);
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
                    const deleteButtonQuestion = document.createElement('button');
                    deleteButtonQuestion.textContent = 'Delete';
                    deleteButtonQuestion.className = 'btn btn-danger delete-question-button';
                    deleteButtonQuestion.addEventListener('click', () => {
                        questionContainer.remove();
                        deleteQuestion(question.questionId);
                    });
                    questionContainer.appendChild(answerPossibilitiesContainer);
                    questionContainer.appendChild(deleteButtonQuestion);
                    questionList.appendChild(questionContainer);
                });
            }
            (_a = document.getElementById('cancel-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', loadFlows);
            (_b = document.getElementById('edit-flow-form')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', function (event) {
                event.preventDefault();
                updateFlow(flowId);
            });
        }
    })
        .catch(error => console.error('Failed to fetch flow details:', error));
}
function updateFlow(flowId) {
    const flowNameInput = document.getElementById('flowName');
    const informationInput = document.getElementById('description');
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
        }
        else {
            console.error('Failed to update flow');
            response.text().then(text => alert('Failed to update flow: ' + text));
        }
    })
        .catch(error => {
        console.error('Error updating flow:', error);
        alert('Error updating flow: ' + error);
    });
}
function deleteQuestion(questionId) {
    fetch(`/api/FlowCreation/DeleteQuestion/${questionId}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            console.log('Question deleted successfully');
        }
        else {
            console.error('Failed to delete question');
            return response.text().then(text => Promise.reject(text));
        }
    });
}
function deleteAnswerPossibility(AnswerPossibilityId) {
    fetch(`/api/FlowCreation/DeleteAnswerPossibility/${AnswerPossibilityId}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            console.log('AnswerPossibility deleted successfully');
        }
        else {
            console.error('Failed to AnswerPossibility');
            return response.text().then(text => Promise.reject(text));
        }
    });
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
function addAnswerPossibility(questionContainer) {
    const answerPossibilityContainer = questionContainer.querySelector('.answer-possibilities-container');
    const answerPossibilityInputs = answerPossibilityContainer.querySelectorAll('.answer-possibility-input');
    // Controleer of er minder dan 5 antwoordmogelijkheden zijn
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
    }
    else {
        // Bereikte het maximale aantal antwoordmogelijkheden, geef een melding
        alert('Maximum number of answer possibilities reached (5)');
    }
}
