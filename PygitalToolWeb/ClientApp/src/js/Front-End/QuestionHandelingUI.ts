const timerLength: number = 5;
const progressBar = document.querySelector('.progress-bar') as HTMLElement;


// Timer that clicks the submit button when time runs out
export function timer(): void {
    let button: HTMLElement | null;
    button = document.getElementById('submitButton');
    if (button == null) {
        button = document.getElementById('submitButtonCircular')
    }
    if (button == null) {
        button = document.getElementById('Submit');
    }

    if (button) {
        function clickButton() {
            if (button) {
                button.click();
            }
        }

        const timer = setTimeout(clickButton, timerLength * 1000);

        button.addEventListener('click', function () {
            clearTimeout(timer);
        });
    }
}

// HTML text updater to display the timer to the user
export function setTimerText(): void {
    const timerElement: HTMLElement | null = document.getElementById('circular-timer');
    let timeLeft = timerLength;

    if (timerElement) {
        timerElement.textContent = timeLeft.toString();

        const countdown = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft.toString();

            // Update progress bar width based on time left
            const progressWidth = (timerLength - timeLeft) / timerLength * 100;
            if (progressBar) {
                progressBar.style.width = progressWidth + "%";
            }

            if (timeLeft <= 0) {
                clearInterval(countdown);
                timerElement.textContent = "0";
            }
        }, 1000);
    }
}

export function validateForm(): boolean {
    const answer: string = (document.getElementById("selectedAnswer") as HTMLInputElement).value;
    if (answer.trim() === "") {
        alert("Please enter your answer.");
        return false; // answer is empty
    }

    return true;
}

// Logic for the slider in the range question. Makes sure the right value is returned.
export function configureSlider(): void {
    const slider: HTMLInputElement = document.getElementById("myRange") as HTMLInputElement;
    const output: HTMLElement = document.getElementById("sliderValue") as HTMLElement;
    const labels: string[] = Array.from(document.querySelectorAll('.slider-labels span')).map(span => (span as HTMLElement).textContent || '');

    if (slider) {
        slider.oninput = function (): void {
            const index: number = parseInt(slider.value, 10);
            output.innerHTML = labels[index];
        };
    }

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
export function configureAnswerButtons(): void {
    const answerButtons: NodeListOf<Element> = document.querySelectorAll('.answerButton');
    answerButtons.forEach(button => {
        button.addEventListener('click', function (): void {
            button.classList.toggle('selected');
        });
    });
}

// Configures the submit button to return the correct selected value(s) when being pressed.
export function configureSubmitButton(): void {
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
export function configureSubmitButtonSingleChoice(): void {
    const submitButton: HTMLElement | null = document.getElementById('submitButtonSingleChoice');
    if(submitButton) {
        console.log("woop woop")
    }
    submitButton?.addEventListener('click', function (): void {
        let selectedAnswer: string = "no answer";

        const answerButtons: NodeListOf<Element> = document.querySelectorAll('.answerButtonSingleChoice')
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
        document.querySelector('.answersFormSingleChoice')?.appendChild(hiddenInput);
        (document.querySelector('.answersFormSingleChoice') as HTMLFormElement)?.submit();
    });
}

// Configures the answer buttons for a single choice question in a circular flow to deselect when another is pressed.
export function configureAnswerButtonsSingleChoice(): void {
    const answerButtons: NodeListOf<Element> = document.querySelectorAll('.answerButtonSingleChoice');
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