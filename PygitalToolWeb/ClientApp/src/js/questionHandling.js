function validateForm() {
    const answer = document.getElementById("selectedAnswer").value;
    console.log(answer);
    if (answer.trim() === "") {
        alert("Please enter your answer.");
        return false; // answer is empty
    }
    return true;
}
function configureSlider() {
    const slider = document.getElementById("myRange");
    const output = document.getElementById("sliderValue");
    const labels = Array.from(document.querySelectorAll('.slider-labels span')).map(span => span.textContent || '');
    slider.oninput = function () {
        const index = parseInt(slider.value, 10);
        output.innerHTML = labels[index];
    };
    const submitButton = document.getElementById('submitButton');
    if (submitButton) {
        submitButton.addEventListener('click', function () {
            var _a, _b;
            const selectedValue = output.textContent || '';
            const hiddenInput = document.createElement('input');
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
    const answerButtons = document.querySelectorAll('.answerButton');
    answerButtons.forEach(button => {
        button.addEventListener('click', function () {
            console.log("Clicked");
            button.classList.toggle('selected');
        });
    });
}
function configureSubmitButton() {
    const submitButton = document.getElementById('submitButton');
    submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener('click', function () {
        var _a, _b;
        console.log("true");
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
// Initialize configurations
document.addEventListener('DOMContentLoaded', () => {
    configureAnswerButtons();
    configureSubmitButton();
    configureSlider();
});
export {};
