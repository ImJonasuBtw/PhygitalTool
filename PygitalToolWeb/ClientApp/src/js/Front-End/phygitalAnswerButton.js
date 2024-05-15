"use strict";
const key1U1 = "w";
const key2U1 = "a";
const key3U1 = "s";
const key4U1 = "d";
const key5U1 = "f";
const keySubmitU1 = " ";
const key1U2 = "w";
const key2U2 = "a";
const key3U2 = "s";
const key4U2 = "d";
const key5U2 = "f";
const keySubmitU2 = " ";
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
        addEventListenerToKeyPressSlider(slider, key1U1, 0);
        addEventListenerToKeyPressSlider(slider, key2U1, 1);
        addEventListenerToKeyPressSlider(slider, key3U1, 2);
        addEventListenerToKeyPressSlider(slider, key4U1, 3);
        addEventListenerToKeyPressSlider(slider, key5U1, 4);
    }
    else {
        addEventListenerToKeyPress(button1, key1U1);
        addEventListenerToKeyPress(button2, key2U1);
        addEventListenerToKeyPress(button3, key3U1);
        addEventListenerToKeyPress(button4, key4U1);
        addEventListenerToKeyPress(button5, key5U1);
    }
    if (!document.getElementById('circular-timer')) {
        if (submit1) {
            addEventListenerToKeyPress(submit1, keySubmitU1);
        }
        else if (submit2) {
            addEventListenerToKeyPress(submit2, keySubmitU1);
        }
        else if (submit3) {
            addEventListenerToKeyPress(submit3, keySubmitU1);
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    linkKeyPressesToButtons();
});
