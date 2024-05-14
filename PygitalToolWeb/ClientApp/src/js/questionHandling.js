// Checks if form input is empty
function validateForm() {
    const answer = document.getElementById("selectedAnswer").value;
    if (answer.trim() === "") {
        alert("Please enter your answer.");
        return false; // answer is empty
    }
    return true;
}
// Logic for the slider in the range question. Makes sure the right value is returned.
function configureSlider() {
    const slider = document.getElementById("myRange");
    const output = document.getElementById("sliderValue");
    const labels = Array.from(document.querySelectorAll('.slider-labels span')).map(span => span.textContent || '');
    if (slider) {
        slider.oninput = function () {
            const index = parseInt(slider.value, 10);
            output.innerHTML = labels[index];
        };
    }
    const submitButton = document.getElementById('submitButton');
    if (submitButton) {
        submitButton.addEventListener('click', function () {
            var _a, _b;
            const selectedValue = output.textContent || '';
            const hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = 'selectedAnswer';
            hiddenInput.value = selectedValue;
            (_a = document.getElementById('answersForm')) === null || _a === void 0 ? void 0 : _a.appendChild(hiddenInput);
            (_b = document.getElementById('answersForm')) === null || _b === void 0 ? void 0 : _b.submit();
        });
    }
}
// Toggles the buttons 'selected' class based on if the user pressed it.
function configureAnswerButtons() {
    const answerButtons = document.querySelectorAll('.answerButton');
    answerButtons.forEach(button => {
        button.addEventListener('click', function () {
            button.classList.toggle('selected');
        });
    });
}
// Configures the submit button to return the correct selected value(s) when being pressed.
function configureSubmitButton() {
    const submitButton = document.getElementById('submitButton');
    submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener('click', function () {
        var _a, _b;
        const selectedAnswers = [];
        const answerButtons = document.querySelectorAll('.answerButton');
        answerButtons.forEach(button => {
            if (button.classList.contains('selected')) {
                const value = button.getAttribute('value');
                if (value !== null) { // Check for `null` before pushing
                    selectedAnswers.push(value);
                }
            }
        });
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'selectedAnswers';
        hiddenInput.value = JSON.stringify(selectedAnswers);
        (_a = document.getElementById('answersForm')) === null || _a === void 0 ? void 0 : _a.appendChild(hiddenInput);
        (_b = document.getElementById('answersForm')) === null || _b === void 0 ? void 0 : _b.submit();
    });
}
// Since the circular flow works with a timer, it's answer possibilities can't make it go to the next question immediately.
// Uses the logic of the muliple choice question, but slightly altered so that it can only select one.
function configureSubmitButtonSingleChoice() {
    const submitButton = document.getElementById('submitButtonSingleChoice');
    if (submitButton) {
        console.log("woop woop");
    }
    submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener('click', function () {
        var _a, _b;
        let selectedAnswer = "no answer";
        const answerButtons = document.querySelectorAll('.answerButtonSingleChoice');
        answerButtons.forEach(button => {
            if (button.classList.contains('selected')) {
                const value = button.getAttribute('value');
                if (value) {
                    selectedAnswer = value;
                }
            }
        });
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'selectedAnswer';
        hiddenInput.value = selectedAnswer;
        (_a = document.querySelector('.answersFormSingleChoice')) === null || _a === void 0 ? void 0 : _a.appendChild(hiddenInput);
        (_b = document.querySelector('.answersFormSingleChoice')) === null || _b === void 0 ? void 0 : _b.submit();
    });
}
// Configures the answer buttons for a single choice question in a circular flow to deselect when another is pressed.
function configureAnswerButtonsSingleChoice() {
    const answerButtons = document.querySelectorAll('.answerButtonSingleChoice');
    answerButtons.forEach(button => {
        button.addEventListener('click', function () {
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
    configureAnswerButtonsSingleChoice();
    configureSubmitButton();
    configureSubmitButtonSingleChoice();
    configureSlider();
});
export {};
