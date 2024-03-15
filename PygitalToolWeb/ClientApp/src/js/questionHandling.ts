import {Value} from "sass";

function validateForm(): boolean {
    const answer: string = (document.getElementById("selectedAnswer") as HTMLInputElement).value;
    console.log(answer);
    if (answer.trim() === "") {
        alert("Please enter your answer.");
        return false; // answer is empty
    }

    return true;
}

function configureSlider(): void {
    const slider: HTMLInputElement = document.getElementById("myRange") as HTMLInputElement;
    const output: HTMLElement = document.getElementById("sliderValue") as HTMLElement;
    const labels: string[] = Array.from(document.querySelectorAll('.slider-labels span')).map(span => (span as HTMLElement).textContent || '');

    slider.oninput = function(): void {
        const index: number = parseInt(slider.value, 10);
        output.innerHTML = labels[index];
    };

    const submitButton = document.getElementById('submitButton');
    if (submitButton) {
        submitButton.addEventListener('click', function(): void {
            const selectedValue: string = output.textContent || '';

            const hiddenInput: HTMLInputElement = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = 'selectedAnswer';
            hiddenInput.value = selectedValue;
            console.log(hiddenInput.value);
            document.getElementById('answersForm')?.appendChild(hiddenInput);

            (document.getElementById('answersForm') as HTMLFormElement)?.submit();
        });
    }
}

function configureAnswerButtons(): void {
    const answerButtons: NodeListOf<Element> = document.querySelectorAll('.answerButton');
    answerButtons.forEach(button => {
        button.addEventListener('click', function(): void {
            console.log("Clicked");
            button.classList.toggle('selected');
        });
    });
}

function configureSubmitButton(): void {
    const submitButton: HTMLElement | null = document.getElementById('submitButton');
    submitButton?.addEventListener('click', function(): void {
        console.log("true");
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

// Initialize configurations
document.addEventListener('DOMContentLoaded', () => {
    configureAnswerButtons();
    configureSubmitButton();
    configureSlider();
});
