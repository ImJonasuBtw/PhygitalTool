import {addQuestionButton, editForm, loadFlows, showQuestionAndAnswerPossibilities} from "./flow-ui";
import {backOfficeId, Flow, FlowTypeEnum} from "./flow";
import {handleErrorResponseAdd, handleErrorResponseEdit} from "./flow-validation";

// Adds a new flow to the specified subtheme.
export async function AddFlow(newFlow: Flow, subthemeId: string | undefined): Promise<void> {
    const response = await fetch('/api/FlowCreation/AddFlowToSubtheme', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            FlowName: newFlow.flowName,
            FlowDescription: newFlow.flowDescription,
            FlowType: newFlow.flowType,
            SubthemeId: subthemeId,
            Questions: newFlow.questions,
            Language: newFlow.language,
            FlowImage: newFlow.flowImage,
            BackOfficeId: backOfficeId
        })
    });
    if (response.ok) {
        loadFlows();

    } else {
        await handleErrorResponseAdd(response)
    }
}

// Updates the information of an existing flow and gets al the data from the edit form.
async function updateFlowForm(flowId: number): Promise<void> {
    const flowNameInput = document.getElementById('flow-name') as HTMLInputElement;
    const informationInput = document.getElementById('description') as HTMLTextAreaElement;
    const flowTypeRadio = document.querySelector('input[name="flowType"]:checked') as HTMLInputElement;
    const flowType = flowTypeRadio.value === 'Circular' ? FlowTypeEnum.Circular : FlowTypeEnum.Linear;
    const questionContainers = document.querySelectorAll('.question-container');
    const flowLanguageSelect = document.getElementById('flow-language') as HTMLSelectElement;
    const flowLanguage = parseInt(flowLanguageSelect.value);
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

    const questions: any[] = await Promise.all(Array.from(questionContainers).map(async (container: Element) => {
        const questionContainer = container as HTMLElement;
        const questionInput = questionContainer.querySelector('.question-input') as HTMLInputElement;
        const questionId = questionContainer.getAttribute('data-question-id');
        const questionTypeSelect = questionContainer.querySelector('select') as HTMLSelectElement;
        const selectedQuestionType = parseInt(questionTypeSelect.value);

        const answerPossibilityInputs = questionContainer.querySelectorAll('.answer-possibility-input') as NodeListOf<HTMLInputElement>;
        const filteredAnswerPossibilities = Array.from(answerPossibilityInputs).filter(input => input.value.trim() !== '');
        const answerPossibilities: any[] = Array.from(filteredAnswerPossibilities).map(input => {
            const answerPossibilityId = input.getAttribute('data-AnswerPoss-id');
            return {
                answerPossibilityId: answerPossibilityId,
                description: input.value,
                questionId: questionId
            };
        });

        const fileInput = questionContainer.querySelector('input[type="file"]') as HTMLInputElement;

        let questionImage = null;
        if (fileInput.files && fileInput.files.length > 0) {
            const formData = new FormData();
            formData.append('file', fileInput.files[0]);

            questionImage = await uploadFile(formData);
        } else {
            const existingImage = questionContainer.querySelector('#existing-image') as HTMLImageElement;
            if (existingImage) {
                questionImage = existingImage.src;
            }
        }

        return {
            questionId: questionId,
            questionText: questionInput.value,
            questionType: selectedQuestionType,
            answerPossibilities: answerPossibilities,
            questionImage: questionImage
        };
    }).filter(question => question !== null));

    let flowImage = null;
    if (fileInput.files && fileInput.files.length > 0) {
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);

        flowImage = await uploadFile(formData);
    } else {
        const existingImage = document.querySelector('#existing-flow-image') as HTMLImageElement;

        if (existingImage) {
            flowImage = existingImage.src;
        }
    }


    fetch(`/api/FlowCreation/UpdateFlow/${flowId}`, {

        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            FlowName: flowNameInput.value,
            FlowDescription: informationInput.value,
            FlowType: flowType,
            Language: flowLanguage,
            Questions: questions,
            FlowImage: flowImage
        })
    })
        .then(async response => {
            if (response.ok) {
                loadFlows();
            } else {
                await handleErrorResponseEdit(response)
            }
        })
        .catch(error => {
            console.error('Error updating flow:', error);
            alert('Error updating flow: ' + error);
        });
}

// Uploads a file to the server and returns its URL.
export async function uploadFile(formData: FormData): Promise<string | null> {
    try {
        const fileResponse = await fetch('/api/files/uploadFile', {
            method: 'POST',
            body: formData
        });
        const fileResult = await fileResponse.json();
        return fileResult && fileResult.url;
    } catch (error) {
        console.error('Error uploading file:', error);
        alert("er is een fout met de foto")
        return null;
    }
}

// Deletes a flow from the server.
export function deleteFlow(FlowId: number) {
    fetch(`/api/FlowCreation/DeleteFlow/${FlowId}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            loadFlows();
        } else {
            console.error('Failed to delete Flow');
            return response.text().then(text => Promise.reject(text));
        }
    })
}

// Deletes a question from the server.
export function deleteQuestion(questionId: number) {
    fetch(`/api/FlowCreation/DeleteQuestion/${questionId}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
        } else {
            console.error('Failed to delete question');
            return response.text().then(text => Promise.reject(text));
        }
    })
}

// Deletes an answer possibility from the server.
export function deleteAnswerPossibility(AnswerPossibilityId: number) {
    fetch(`/api/FlowCreation/DeleteAnswerPossibility/${AnswerPossibilityId}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
        } else {
            console.error('Failed to AnswerPossibility');
            return response.text().then(text => Promise.reject(text));
        }
    })
}

// Retrieves flow and displays the edit form for a specified flow.
export function showEditFlowForm(flowId: number): void {
    fetch(`/api/FlowCreation/GetFlowDetails/${flowId}`)
        .then(response => response.json())
        .then((flow: Flow) => {
            const FlowContainer = document.getElementById('flow-container');
            if (FlowContainer) {
                editForm(FlowContainer, flow)
                const questionList = document.getElementById('question-list');
                const QuestionButton = document.getElementById('question-button');

                if (questionList) {
                    flow.questions.forEach((question, index) => {
                        showQuestionAndAnswerPossibilities(question, index, questionList);
                    });
                    addQuestionButton(QuestionButton);
                }
                document.getElementById('cancel-button')?.addEventListener('click', loadFlows);
                document.getElementById('edit-flow-form')?.addEventListener('submit', async function (event) {
                    event.preventDefault();
                    await updateFlowForm(flowId);
                });

            }
        })
        .catch(error => console.error('Failed to fetch flow details:', error));
}