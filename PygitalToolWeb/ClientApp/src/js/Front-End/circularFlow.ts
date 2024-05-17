// Length of the timer for each question in a circular flow
const timerLength: number = 5;
const progressBar = document.querySelector('.progress-bar') as HTMLElement;
// Timer that clicks the submit button when time runs out
function timer(): void {
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
function setTimerText(): void {
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

document.addEventListener('DOMContentLoaded', () => {
    const scriptElement = document.getElementById('questionPage-script');
    console.log('Script Element:', scriptElement);
    const flowType = scriptElement?.dataset.flowtype;
    console.log('Flow type:', flowType);
    
    
    if (flowType === 'circular') {
        timer();
        setTimerText();
    }
});