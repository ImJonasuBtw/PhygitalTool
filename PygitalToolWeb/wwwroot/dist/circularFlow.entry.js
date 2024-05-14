/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!********************************!*\
  !*** ./src/js/circularFlow.ts ***!
  \********************************/

// Length of the timer for each question in a circular flow
const timerLength = 10;
const progressBar = document.querySelector('.progress-bar');
// Timer that clicks the submit button when time runs out
function timer() {
    let button;
    button = document.getElementById('submitButton');
    if (button == null) {
        button = document.getElementById('submitButtonCircular');
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
function setTimerText() {
    const timerElement = document.getElementById('circular-timer');
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
document.addEventListener('DOMContentLoaded', () => {
    timer();
    setTimerText();
});

/******/ })()
;
//# sourceMappingURL=circularFlow.entry.js.map