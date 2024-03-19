var timerLength = 5;
function timer() {
    var button;
    button = document.getElementById('submitButton');
    if (!button) {
        button = document.getElementById('Submit');
    }
    if (button) {
        function clickButton() {
            if (button) {
                button.click();
            }
        }
        var timer_1 = setTimeout(clickButton, timerLength * 1000);
        console.log("timer started");
        button.addEventListener('click', function () {
            clearTimeout(timer_1);
            console.log("timer interrupted");
            console.log("submitted");
        });
    }
}
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
