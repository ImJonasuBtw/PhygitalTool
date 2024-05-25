import {addQuestionForm, loadFlows, showEditFlowForm, ShowForm} from "./FlowUI";
import bootstrap from "bootstrap";
import {deleteFlow} from "./FlowRestClient";

export enum QuestionType {
    SingleChoice,
    MultipleChoice,
    Range,
    Open
}

export const FlowTypeEnum = {
    Circular: 0,
    Linear: 1
};
export const Language =
    {
        English: 0,
        Dutch: 1,
        French: 2,
        German : 3
    }

export class Flow {
    public flowDescription: string;
    public flowName: string;
    public flowType: number;
    public language: number;
    public questions: {
        questionId: number;
        questionText: string;
        questionType: number;
        answerPossibilities: {
            description: string;
            answerPossibilityId: number;
        }[];
        questionImage: string | null;
    }[];

    constructor(description: string, flowName: string, flowType: number, language: number, questions: any[]) {
        this.flowDescription = description;
        this.flowName = flowName;
        this.flowType = flowType;
        this.language = language;
        this.questions = questions || [];
    }
}

document.getElementById('add-Flow-button')?.addEventListener('click', () => {
    console.log('Add button has been pressed!');
    const FlowContainer = document.getElementById('flow-container');
    if (FlowContainer) {
        ShowForm(FlowContainer);

        const scriptElement = document.getElementById('flowPage-script');
        const subthemeId = scriptElement?.dataset.subthemeid;
        

        document.getElementById('add-question-button')?.addEventListener('click', addQuestionForm);
        document.getElementById('cancel-button')?.addEventListener('click', loadFlows);
        document.getElementById('new-flow-form')?.addEventListener('submit', async function (event) {
            event.preventDefault();
            
            const flowNameInput = document.getElementById('flowName') as HTMLInputElement;
            const descriptionInput = document.getElementById('description') as HTMLTextAreaElement;
            const flowTypeRadio = document.querySelector('input[name="flowType"]:checked') as HTMLInputElement;
            if (!flowTypeRadio) {
                alert('Please select a flow type.');
                return;
            }
            const flowType = flowTypeRadio.value === 'Circular' ? FlowTypeEnum.Circular : FlowTypeEnum.Linear;
            const questionContainers = document.querySelectorAll('.question-container');
            const questions: any[] = Array.from(questionContainers).map(async (container: Element) => {
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
                        description: input.value
                    };
                });

                const fileInput = questionContainer.querySelector('input[type="file"]') as HTMLInputElement;
                
                let questionImage = null;
                if (fileInput.files && fileInput.files.length > 0) {
                    const formData = new FormData();
                    formData.append('file', fileInput.files[0]);


                    const response = await fetch('/api/files/uploadFile', {
                        method: 'POST',
                        body: formData

                    });

                    const fileResult = await response.json();

                    if (fileResult && fileResult.url) {
                        questionImage = fileResult.url;
                    }
                }
                    return {
                        questionId: questionId,
                        questionText: questionInput.value,
                        questionType: selectedQuestionType,
                        answerPossibilities: answerPossibilities,
                        questionImage: questionImage
                    };
                
            }).filter(question => question !== null);

            const resolvedQuestions = await Promise.all(questions);

            const flowLanguageSelect = document.getElementById('flowLanguage') as HTMLSelectElement;
            const flowLanguage = parseInt(flowLanguageSelect.value);
            if (!flowNameInput || !descriptionInput || !flowTypeRadio) return;
            const flowName = flowNameInput.value;
            const description = descriptionInput.value;

            // Create a new flow instance
            const newFlow = new Flow(description, flowName, flowType, flowLanguage, resolvedQuestions);

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
                    Questions: resolvedQuestions,
                    Language: flowLanguage
                })
            });
            if (response.ok) {
                loadFlows();

            } else {
                let errorMessage = 'Failed to add flow';
                if (response.status === 400) {
                    const errorData = await response.json();
                    if (errorData && errorData.errors) {
                        for (const key in errorData.errors) {
                            if (errorData.errors.hasOwnProperty(key)) {
                                const errorMessage = errorData.errors[key];
                                alert(errorMessage);
                            }
                        }
                    } else {
                        alert('Validation error occurred.');
                    }
                } else if (response.status === 404) {
                    errorMessage = 'Not Found';
                } else if (response.status === 409) {
                    errorMessage = 'Conflict - Key exists already';
                } else if (response.status === 500) {
                    errorMessage = 'Internal Server Error';
                    const errorData = await response.json();
                    errorMessage = errorData.message;
                }
                alert(errorMessage);
            }
        });
    }
});

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
                const modalInstance = bootstrap.Modal.getInstance(confirmationModal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }
        };
    });
});

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
