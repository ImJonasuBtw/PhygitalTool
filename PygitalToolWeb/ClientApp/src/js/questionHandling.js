"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Checks if form input is empty
function validateForm() {
    var answer = document.getElementById("selectedAnswer").value;
    if (answer.trim() === "") {
        alert("Please enter your answer.");
        return false; // answer is empty
    }
    return true;
}
// Logic for the slider in the range question. Makes sure the right value is returned.
function configureSlider() {
    var slider = document.getElementById("myRange");
    var output = document.getElementById("sliderValue");
    var labels = Array.from(document.querySelectorAll('.slider-labels span')).map(function (span) { return span.textContent || ''; });
    if (slider) {
        slider.oninput = function () {
            var index = parseInt(slider.value, 10);
            output.innerHTML = labels[index];
        };
    }
    var submitButton = document.getElementById('submitButton');
    if (submitButton) {
        submitButton.addEventListener('click', function () {
            var _a, _b;
            var selectedValue = output.textContent || '';
            var hiddenInput = document.createElement('input');
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
    var answerButtons = document.querySelectorAll('.answerButton');
    answerButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            button.classList.toggle('selected');
        });
    });
}
// Configures the submit button to return the correct selected value(s) when being pressed.
function configureSubmitButton() {
    var submitButton = document.getElementById('submitButton');
    submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener('click', function () {
        var _a, _b;
        var selectedAnswers = [];
        var answerButtons = document.querySelectorAll('.answerButton');
        answerButtons.forEach(function (button) {
            if (button.classList.contains('selected')) {
                var value = button.getAttribute('value');
                if (value !== null) { // Check for `null` before pushing
                    selectedAnswers.push(value);
                }
            }
        });
        var hiddenInput = document.createElement('input');
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
    var submitButton = document.getElementById('submitButtonSingleChoice');
    if (submitButton) {
        console.log("woop woop");
    }
    submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener('click', function () {
        var _a, _b;
        var selectedAnswer = "no answer";
        var answerButtons = document.querySelectorAll('.answerButtonSingleChoice');
        answerButtons.forEach(function (button) {
            if (button.classList.contains('selected')) {
                var value = button.getAttribute('value');
                if (value) {
                    selectedAnswer = value;
                }
            }
        });
        var hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'selectedAnswer';
        hiddenInput.value = selectedAnswer;
        (_a = document.querySelector('.answersFormSingleChoice')) === null || _a === void 0 ? void 0 : _a.appendChild(hiddenInput);
        (_b = document.querySelector('.answersFormSingleChoice')) === null || _b === void 0 ? void 0 : _b.submit();
    });
}
// Configures the answer buttons for a single choice question in a circular flow to deselect when another is pressed.
function configureAnswerButtonsSingleChoice() {
    var answerButtons = document.querySelectorAll('.answerButtonSingleChoice');
    answerButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            answerButtons.forEach(function (button) {
                if (button.classList.contains('selected')) {
                    button.classList.toggle('selected');
                }
            });
            button.classList.toggle('selected');
        });
    });
}
// Initialize configurations
document.addEventListener('DOMContentLoaded', function () {
    configureAnswerButtons();
    configureAnswerButtonsSingleChoice();
    configureSubmitButton();
    configureSubmitButtonSingleChoice();
    configureSlider();
});
