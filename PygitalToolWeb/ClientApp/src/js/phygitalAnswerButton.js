"use strict";
function addEventListenerToKeyPress(button, key) {
    if (button) {
        document.addEventListener('keydown', (event) => {
            if (event.key === key) {
                button.click();
            }
        });
    }
}
function addEventListenerToKeyPressSlider(slider, key) {
    document.addEventListener('keydown', (event) => {
        if (event.key === key.toString()) {
            slider.value = (key - 1).toString();
            const event = new Event('input', { bubbles: true });
            slider.dispatchEvent(event);
        }
    });
}
function linkKeyPressesToButtons() {
    const button1 = document.getElementById('button-1');
    const button2 = document.getElementById('button-2');
    const button3 = document.getElementById('button-3');
    const button4 = document.getElementById('button-4');
    const button5 = document.getElementById('button-5');
    const submit1 = document.getElementById('Submit');
    const submit2 = document.getElementById('submitButton');
    const submit3 = document.getElementById('submitButtonCircular');
    const slider = document.getElementById('myRange');
    const buttons = [button1, button2, button3, button4, button5];
    for (let i = 1; i < 6; i++) {
        if (slider) {
            addEventListenerToKeyPressSlider(slider, i);
        }
        else {
            addEventListenerToKeyPress(buttons[i - 1], i.toString());
        }
    }
    if (!document.getElementById('circular-timer')) {
        if (submit1) {
            addEventListenerToKeyPress(submit1, "6");
        }
        else if (submit2) {
            addEventListenerToKeyPress(submit2, "6");
        }
        else if (submit3) {
            addEventListenerToKeyPress(submit3, "6");
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    linkKeyPressesToButtons();
});
