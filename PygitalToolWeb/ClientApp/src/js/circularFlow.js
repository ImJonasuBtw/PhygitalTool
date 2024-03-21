var timerLength = 2;
// timer that clicks the submit button when finished
function timer() {
    var button;
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
        var timer_1 = setTimeout(clickButton, timerLength * 1000);
        button.addEventListener('click', function () {
            clearTimeout(timer_1);
        });
    }
}
// text update for visual timer
function setTimerText() {
    var timerElement = document.getElementById('circular-timer');
    var timeLeft = timerLength;
    if (timerElement) {
        timerElement.textContent = timeLeft.toString();
        var countdown_1 = setInterval(function () {
            timeLeft--;
            timerElement.textContent = timeLeft.toString();
            if (timeLeft <= 0) {
                clearInterval(countdown_1);
                timerElement.textContent = "0";
            }
        }, 1000);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    timer();
    setTimerText();
});
