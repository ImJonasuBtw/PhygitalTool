var key1U1 = "w";
var key2U1 = "a";
var key3U1 = "s";
var key4U1 = "d";
var key5U1 = "f";
var keySubmitU1 = " ";
var key1U2 = "w";
var key2U2 = "a";
var key3U2 = "s";
var key4U2 = "d";
var key5U2 = "f";
var keySubmitU2 = " ";
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
