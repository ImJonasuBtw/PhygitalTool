import {loadFlows} from "./FlowUI";
import {FlowTypeEnum} from "./Flow";

export function deleteFlow(FlowId: number) {
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

export async function updateFlow(flowId: number): Promise<void> {
    const flowNameInput = document.getElementById('flowName') as HTMLInputElement;
    const informationInput = document.getElementById('description') as HTMLTextAreaElement;
    const flowTypeRadio = document.querySelector('input[name="flowType"]:checked') as HTMLInputElement;
    const flowType = flowTypeRadio.value === 'Circular' ? FlowTypeEnum.Circular : FlowTypeEnum.Linear;
    const questionContainers = document.querySelectorAll('.question-container');

    const questions: any[] = await Promise.all(Array.from(questionContainers).map(async (container: Element) => {
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

        const fileInput = questionContainer.querySelector('input[type="file"]') as HTMLInputElement;
        let questionImage = null;

        if (fileInput.files && fileInput.files.length > 0) {
            const formData = new FormData();
            formData.append('file', fileInput.files[0]);

            const fileResponse = await fetch('/api/files/uploadFile', {
                method: 'POST',
                body: formData
            });
            const fileResult = await fileResponse.json();
            if (fileResult && fileResult.url) {
                questionImage = fileResult.url;
            }
        } else {
            const existingImage = questionContainer.querySelector('#existingImage') as HTMLImageElement;
            if (existingImage) {
                questionImage = existingImage.src;
            }
        }
        console.log('questionImage:', questionImage);

        return {
            questionId: questionId,
            questionText: questionInput.value,
            questionType: selectedQuestionType,
            answerPossibilities: answerPossibilities,
            questionImage: questionImage
        };
    }).filter(question => question !== null));

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

export function deleteQuestion(questionId: number) {
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

export function deleteAnswerPossibility(AnswerPossibilityId: number) {
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