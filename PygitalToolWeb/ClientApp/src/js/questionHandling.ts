import {Value} from "sass";

// Checks if form input is empty
function validateForm(): boolean {
    const answer: string = (document.getElementById("selectedAnswer") as HTMLInputElement).value;
    if (answer.trim() === "") {
        alert("Please enter your answer.");
        return false; // answer is empty
    }

    return true;
}

// Logic for the slider in the range question. Makes sure the right value is returned.
function configureSlider(): void {
    const slider: HTMLInputElement = document.getElementById("myRange") as HTMLInputElement;
    const output: HTMLElement = document.getElementById("sliderValue") as HTMLElement;
    const labels: string[] = Array.from(document.querySelectorAll('.slider-labels span')).map(span => (span as HTMLElement).textContent || '');

    slider.oninput = function (): void {
        const index: number = parseInt(slider.value, 10);
        output.innerHTML = labels[index];
    };

    const submitButton = document.getElementById('submitButton');
    if (submitButton) {
        submitButton.addEventListener('click', function (): void {
            const selectedValue: string = output.textContent || '';

            const hiddenInput: HTMLInputElement = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = 'selectedAnswer';
            hiddenInput.value = selectedValue;
            document.getElementById('answersForm')?.appendChild(hiddenInput);

            (document.getElementById('answersForm') as HTMLFormElement)?.submit();
        });
    }
}


// Toggles the buttons 'selected' class based on if the user pressed it.
function configureAnswerButtons(): void {
    const answerButtons: NodeListOf<Element> = document.querySelectorAll('.answerButton');
    answerButtons.forEach(button => {
        button.addEventListener('click', function (): void {
            button.classList.toggle('selected');
        });
    });
}

// Configures the submit button to return the correct selected value(s) when being pressed.
function configureSubmitButton(): void {
    const submitButton: HTMLElement | null = document.getElementById('submitButton');
    submitButton?.addEventListener('click', function (): void {
        const selectedAnswers: string[] = [];

        const answerButtons: NodeListOf<Element> = document.querySelectorAll('.answerButton');
        answerButtons.forEach(button => {
            if (button.classList.contains('selected')) {
                const value = button.getAttribute('value');
                if (value !== null) { // Check for `null` before pushing
                    selectedAnswers.push(value);
                }
            }
        });

        const hiddenInput: HTMLInputElement = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'selectedAnswers';
        hiddenInput.value = JSON.stringify(selectedAnswers);
        document.getElementById('answersForm')?.appendChild(hiddenInput);

        (document.getElementById('answersForm') as HTMLFormElement)?.submit();
    });
}

// Since the circular flow works with a timer, it's answer possibilities can't make it go to the next question immediately.
// Uses the logic of the muliple choice question, but slightly altered so that it can only select one.
function configureSubmitButtonSingleChoiceCircular(): void {
    const submitButton: HTMLElement | null = document.getElementById('submitButtonCircular');
    submitButton?.addEventListener('click', function (): void {
        let selectedAnswer: string = "no answer";

        const answerButtons: NodeListOf<Element> = document.querySelectorAll('.answerButtonCircular')
        answerButtons.forEach(button => {
            if (button.classList.contains('selected')) {
                const value = button.getAttribute('value');
                if (value) {
                    selectedAnswer = value;
                }
            }
        });

        const hiddenInput: HTMLInputElement = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'selectedAnswer';
        hiddenInput.value = selectedAnswer;
        document.getElementById('answersFormCircular')?.appendChild(hiddenInput);
        (document.getElementById('answersFormCircular') as HTMLFormElement)?.submit();
    });
}

// Configures the answer buttons for a single choice question in a circular flow to deselect when another is pressed.
function configureAnswerButtonsSingleChoiceCircular(): void {
    const answerButtons: NodeListOf<Element> = document.querySelectorAll('.answerButtonCircular');
    answerButtons.forEach(button => {
        button.addEventListener('click', function (): void {
            answerButtons.forEach(button => {
                if (button.classList.contains('selected')) {
                    button.classList.toggle('selected');
                }
            });
            button.classList.toggle('selected');
        });
    });
}


// Initialize configurations
document.addEventListener('DOMContentLoaded', () => {
    configureAnswerButtons();
    configureAnswerButtonsSingleChoiceCircular();
    configureSubmitButton();
    configureSubmitButtonSingleChoiceCircular();
    configureSlider();
});


