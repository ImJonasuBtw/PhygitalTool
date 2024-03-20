"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateForm() {
    var answer = document.getElementById("selectedAnswer").value;
    console.log(answer);
    if (answer.trim() === "") {
        alert("Please enter your answer.");
        return false; // answer is empty
    }
    return true;
}
function configureSlider() {
    var slider = document.getElementById("myRange");
    var output = document.getElementById("sliderValue");
    var labels = Array.from(document.querySelectorAll('.slider-labels span')).map(function (span) { return span.textContent || ''; });
    slider.oninput = function () {
        var index = parseInt(slider.value, 10);
        output.innerHTML = labels[index];
    };
    var submitButton = document.getElementById('submitButton');
    if (submitButton) {
        submitButton.addEventListener('click', function () {
            var _a, _b;
            var selectedValue = output.textContent || '';
            var hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = 'selectedAnswer';
            hiddenInput.value = selectedValue;
            console.log(hiddenInput.value);
            (_a = document.getElementById('answersForm')) === null || _a === void 0 ? void 0 : _a.appendChild(hiddenInput);
            (_b = document.getElementById('answersForm')) === null || _b === void 0 ? void 0 : _b.submit();
        });
    }
}
function configureAnswerButtons() {
    var answerButtons = document.querySelectorAll('.answerButton');
    answerButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            console.log("Clicked");
            button.classList.toggle('selected');
        });
    });
}
function configureSubmitButton() {
    var submitButton = document.getElementById('submitButton');
    submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener('click', function () {
        var _a, _b;
        console.log("true");
        var selectedAnswers = ["no answers selected"];
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
function configureSubmitButtonSingleChoiceCircular() {
    var submitButton = document.getElementById('submitButtonCircular');
    submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener('click', function () {
        var _a, _b;
        var selectedAnswer = "no answer selected";
        var answerButtons = document.querySelectorAll('.answerButtonCircular');
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
        (_a = document.getElementById('answersFormCircular')) === null || _a === void 0 ? void 0 : _a.appendChild(hiddenInput);
        (_b = document.getElementById('answersFormCircular')) === null || _b === void 0 ? void 0 : _b.submit();
    });
}
function configureAnswerButtonsSingleChoiceCircular() {
    var answerButtons = document.querySelectorAll('.answerButtonCircular');
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
    configureAnswerButtonsSingleChoiceCircular();
    configureSubmitButton();
    configureSubmitButtonSingleChoiceCircular();
    configureSlider();
});
