/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!********************************!*\
  !*** ./src/js/circularFlow.ts ***!
  \********************************/

const timerLength = 5;
// timer that clicks the submit button when finished
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
// text update for visual timer
function setTimerText() {
    const timerElement = document.getElementById('circular-timer');
    let timeLeft = timerLength;
    if (timerElement) {
        timerElement.textContent = timeLeft.toString();
        const countdown = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft.toString();
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