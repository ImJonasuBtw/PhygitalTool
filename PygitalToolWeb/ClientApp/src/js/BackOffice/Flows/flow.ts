import {QuestionForm, loadFlows, ShowForm} from "./flowUI";
import bootstrap from "bootstrap";
import {AddFlow, deleteFlow, showEditFlowForm, uploadFile} from "./flowRestClient";


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
        German: 3
    }

export class Flow {
    public flowDescription: string;
    public flowName: string;
    public flowType: number;
    public language: number;
    public flowImage: string | null;
    public questions: {
        questionId: number;
        questionText: string;
        questionType: number;
        answerPossibilities: {
            description: string;
            answerPossibilityId: number;
            questionId: number;
        }[];
        questionImage: string | null;
    }[];

    constructor(description: string, flowName: string, flowImage: string, flowType: number, language: number, questions: any[]) {
        this.flowDescription = description;
        this.flowName = flowName;
        this.flowType = flowType;
        this.flowImage = flowImage;
        this.language = language;
        this.questions = questions || [];
    }
}

function setupAddFlowButton() {
    document.getElementById('add-Flow-button')?.addEventListener('click', () => {
        console.log('Add button has been pressed!');
        const FlowContainer = document.getElementById('flow-container');
        if (FlowContainer) {
            ShowForm(FlowContainer);

            const scriptElement = document.getElementById('flowPage-script');
            const subthemeId = scriptElement?.dataset.subthemeid;

            document.getElementById('add-question-button')?.addEventListener('click', QuestionForm);
            document.getElementById('cancel-button')?.addEventListener('click', loadFlows);
            document.getElementById('new-flow-form')?.addEventListener('submit', handleSubmit(subthemeId));
        }
    });
}

function handleSubmit(subthemeId: string | undefined) {
    return async function (event: { preventDefault: () => void; }) {
        event.preventDefault();

        const flowNameInput = document.getElementById('flowName') as HTMLInputElement;
        const descriptionInput = document.getElementById('description') as HTMLTextAreaElement;
        const flowTypeRadio = document.querySelector('input[name="flowType"]:checked') as HTMLInputElement;
        if (!flowTypeRadio) {
            alert('Please select a flow type.');
            return;
        }
        const flowType = flowTypeRadio.value === 'Circular' ? FlowTypeEnum.Circular : FlowTypeEnum.Linear;

        const questions = await gatherQuestions();

        const flowLanguageSelect = document.getElementById('flowLanguage') as HTMLSelectElement;
        const flowLanguage = parseInt(flowLanguageSelect.value);
        if (!flowNameInput || !descriptionInput || !flowTypeRadio) return;
        const flowName = flowNameInput.value;
        const description = descriptionInput.value;
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

        let flowImage = null;
        if (fileInput.files && fileInput.files.length > 0) {
            const formData = new FormData();
            formData.append('file', fileInput.files[0]);

            flowImage = await uploadFile(formData);
        }

        // Create a new flow instance
        // @ts-ignore
        const newFlow = new Flow(description, flowName,flowImage, flowType, flowLanguage, questions);

        await AddFlow(newFlow, subthemeId);
    }
}

async function gatherQuestions() {
    const questionContainers = document.querySelectorAll('.question-container');
    const questions = Array.from(questionContainers).map(async (container: Element) => {
        const questionContainer = container as HTMLElement;
        const questionInput = questionContainer.querySelector('.question-input') as HTMLInputElement;
        const questionId = questionContainer.getAttribute('data-question-id');
        const questionTypeSelect = questionContainer.querySelector('select') as HTMLSelectElement;
        const selectedQuestionType = parseInt(questionTypeSelect.value);

        const answerPossibilities = gatherAnswerPossibilities(questionContainer);

        const fileInput = questionContainer.querySelector('input[type="file"]') as HTMLInputElement;

        let questionImage = null;
        if (fileInput.files && fileInput.files.length > 0) {
            const formData = new FormData();
            formData.append('file', fileInput.files[0]);

            questionImage = await uploadFile(formData);
        }

        return {
            questionId: questionId,
            questionText: questionInput.value,
            questionType: selectedQuestionType,
            answerPossibilities: answerPossibilities,
            questionImage: questionImage
        };
    });

    return await Promise.all(questions);
}

function gatherAnswerPossibilities(questionContainer: HTMLElement) {
    const answerPossibilityInputs = questionContainer.querySelectorAll('.answer-possibility-input') as NodeListOf<HTMLInputElement>;
    const filteredAnswerPossibilities = Array.from(answerPossibilityInputs).filter(input => input.value.trim() !== '');
    return Array.from(filteredAnswerPossibilities).map(input => {
        const answerPossibilityId = input.getAttribute('data-AnswerPoss-id');
        return {
            answerPossibilityId: answerPossibilityId,
            description: input.value
        };
    });
}

function setupConfirmationModal() {
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
}

function setupEditFlowContainer() {
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
}

export function SetupDoms() {
    setupAddFlowButton();
    setupConfirmationModal();
    setupEditFlowContainer();
}