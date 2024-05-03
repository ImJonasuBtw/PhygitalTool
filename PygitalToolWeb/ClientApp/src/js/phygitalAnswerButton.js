"use strict";
const key1 = "w";
const key2 = "a";
const key3 = "s";
const key4 = "d";
const key5 = "f";
const keySubmit = " ";
function addEventListenerToKeyPress(button, key) {
    if (button) {
        document.addEventListener('keydown', (event) => {
            if (event.key === key) {
                button.click();
            }
        });
    }
}
function addEventListenerToKeyPressSlider(slider, key, value) {
    document.addEventListener('keydown', (event) => {
        if (event.key === key) {
            slider.value = value.toString();
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
    if (slider) {
        addEventListenerToKeyPressSlider(slider, key1, 0);
        addEventListenerToKeyPressSlider(slider, key2, 1);
        addEventListenerToKeyPressSlider(slider, key3, 2);
        addEventListenerToKeyPressSlider(slider, key4, 3);
        addEventListenerToKeyPressSlider(slider, key5, 4);
    }
    else {
        addEventListenerToKeyPress(button1, key1);
        addEventListenerToKeyPress(button2, key2);
        addEventListenerToKeyPress(button3, key3);
        addEventListenerToKeyPress(button4, key4);
        addEventListenerToKeyPress(button5, key5);
    }
    if (!document.getElementById('circular-timer')) {
        if (submit1) {
            addEventListenerToKeyPress(submit1, keySubmit);
        }
        else if (submit2) {
            addEventListenerToKeyPress(submit2, keySubmit);
        }
        else if (submit3) {
            addEventListenerToKeyPress(submit3, keySubmit);
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    linkKeyPressesToButtons();
});
