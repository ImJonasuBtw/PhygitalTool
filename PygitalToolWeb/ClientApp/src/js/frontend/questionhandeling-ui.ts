﻿import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";

let currentFlowState: string | null = null;
const timerLength: number = 10;
let timeLeft: number = timerLength;
let countdown: NodeJS.Timeout | null;
let isPaused: boolean = false;
let submitTimeout: NodeJS.Timeout | null = null;
const progressBar = document.querySelector('.progress-bar') as HTMLElement;
// Timer that clicks the submit button when time runs out

// SignalR connection setup
const hubConnection: HubConnection = new HubConnectionBuilder()
    .withUrl("/questionHub")
    .withAutomaticReconnect()
    .build();

hubConnection.on("FlowStateUpdated", newFlowState => {
    console.log("Current FLOW state updated:", newFlowState);
    currentFlowState = newFlowState;
    if (newFlowState === "paused") {
        pauseTimer();
    } else if (newFlowState === "running") {
        resumeTimer();
    } else if (newFlowState === "stopped") {
        window.location.href = `/api/Supervisors/show-start-screen`;
    }
});

hubConnection.start()
    .then(async () => {
        console.log("Hub connection established.");
        if (currentFlowState === "paused") {
            pauseTimer();
        } else if (currentFlowState === "running") {
            resumeTimer();
        } else if (currentFlowState === "stopped") {
            window.location.href = `/api/Supervisors/show-start-screen`;
        }
        try {
            const initialFlowState = await hubConnection.invoke("GetFlowState");
            console.log("Current flow state:", initialFlowState);
        } catch (error) {
            console.error("Error getting current flow state:", error);
        }
    })
    .catch(error => {
        console.error("Error establishing hub connection:", error);
    });

// Pause the timer
function pauseTimer(): void {
    console.log("ik weet dat timer gepauzeerd is");
    console.log(countdown);
    if (countdown !== null) {
        clearInterval(countdown);
        countdown = null;
    }
    if (submitTimeout !== null) {
        clearTimeout(submitTimeout);
        submitTimeout = null;
    }
    isPaused = true;
}

// Resume the timer
function resumeTimer(): void {
    if (isPaused && timeLeft > 0) {
        isPaused = false;
        startCountdown();
        startSubmitTimeout();
    }
}


// Start the timeout interval
function startSubmitTimeout(): void {
    let button: HTMLElement | null;
    button = document.getElementById('submit-button') ||
        document.getElementById('submit-button-circular') ||
        document.getElementById('submit');

    if (button) {
        function clickButton() {
            if (button) {
                button.click();
            }
        }

        submitTimeout = setTimeout(clickButton, timeLeft * 1000);

        button.addEventListener('click', function () {
            if (submitTimeout !== null) {
                clearTimeout(submitTimeout);
                submitTimeout = null;
            }
        });
    }
}


// HTML text updater to display the timer to the user
function startCountdown(): void {
    const timerElement: HTMLElement | null = document.getElementById('circular-timer');
    if (timerElement) {
        timerElement.textContent = timeLeft.toString();
        countdown = setInterval(() => {
            if (!isPaused) {
                timeLeft--;
                timerElement.textContent = timeLeft.toString();

                // Update progress bar width based on time left
                const progressWidth = (timerLength - timeLeft) / timerLength * 100;
                if (progressBar) {
                    progressBar.style.width = progressWidth + "%";
                }

                if (timeLeft <= 0) {
                    // @ts-ignore
                    clearInterval(countdown);
                    timerElement.textContent = "0";
                }
            }
        }, 1000);
    }
}

export function setTimerText(): void {
    timeLeft = timerLength;
    startCountdown();
    startSubmitTimeout();
}

export function validateForm(): boolean {
    const answer: string = (document.getElementById("selected-answer") as HTMLInputElement).value;
    if (answer.trim() === "") {
        alert("Voer je antwoord in");
        return false; // answer is empty
    }

    return true;
}

// Logic for the slider in the range question.
export function configureSlider(): void {
    const slider: HTMLInputElement = document.getElementById("my-range") as HTMLInputElement;
    const output: HTMLElement = document.getElementById("slider-value") as HTMLElement;
    const labels: string[] = Array.from(document.querySelectorAll('.slider-labels span')).map(span => (span as HTMLElement).textContent || '');

    if (slider) {
        slider.oninput = function (): void {
            const index: number = parseInt(slider.value, 10);
            output.innerHTML = labels[index];
        };
    }

    const submitButton = document.getElementById('submit-button');
    if (submitButton) {
        submitButton.addEventListener('click', function (): void {
            const selectedValue: string = output.textContent || '';

            const hiddenInput: HTMLInputElement = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = 'selectedAnswer';
            hiddenInput.value = selectedValue;
            document.getElementById('answers-form')?.appendChild(hiddenInput);

            (document.getElementById('answers-form') as HTMLFormElement)?.submit();
        });
    }
}


// Toggles the buttons 'selected' class based on if the user pressed it.
export function configureAnswerButtons(): void {
    const answerButtons: NodeListOf<Element> = document.querySelectorAll('.answer-button');
    answerButtons.forEach(button => {
        button.addEventListener('click', function (): void {
            button.classList.toggle('selected');
        });
    });
}

// Configures the submit button to return the correct selected value(s) when being pressed.
export function configureSubmitButton(): void {
    const questionType = document.getElementById('questiontype-multiplechoice');
    if (questionType) {
        const submitButton: HTMLElement | null = document.getElementById('submit-button');
        submitButton?.addEventListener('click', function (): void {
            const selectedAnswers: string[] = [];

            const answerButtons: NodeListOf<Element> = document.querySelectorAll('.answer-button');
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
            document.getElementById('answers-form')?.appendChild(hiddenInput);

            (document.getElementById('answers-form') as HTMLFormElement)?.submit();
        });
    }
}

// Since the circular flow works with a timer, it's answer possibilities can't make it go to the next question immediately.
export function configureSubmitButtonSingleChoice(): void {
    const questionType = document.getElementById('questiontype-singlechoice');
    if (questionType) {
        const submitButton: HTMLElement | null = document.getElementById('submit-button');
        submitButton?.addEventListener('click', function (): void {
            let selectedAnswer: string = "no answer";

            const answerButtons: NodeListOf<Element> = document.querySelectorAll('.answer-button-single-choice')
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
            document.querySelector('.answers-form-single-choice')?.appendChild(hiddenInput);
            (document.querySelector('.answers-form-single-choice') as HTMLFormElement)?.submit();
        });
    }
}

// Configures the answer buttons for a single choice question in a circular flow to deselect when another is pressed.
export function configureAnswerButtonsSingleChoice(): void {
    const answerButtons: NodeListOf<Element> = document.querySelectorAll('.answer-button-single-choice');
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