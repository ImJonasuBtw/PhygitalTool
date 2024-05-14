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
        document.addEventListener('keydown', function (event) {
            if (event.key === key) {
                button.click();
            }
        });
    }
}
function addEventListenerToKeyPressSlider(slider, key, value) {
    document.addEventListener('keydown', function (event) {
        if (event.key === key) {
            slider.value = value.toString();
            var event_1 = new Event('input', { bubbles: true });
            slider.dispatchEvent(event_1);
        }
    });
}
function linkKeyPressesToButtons() {
    var button1 = document.getElementById('button-1');
    var button2 = document.getElementById('button-2');
    var button3 = document.getElementById('button-3');
    var button4 = document.getElementById('button-4');
    var button5 = document.getElementById('button-5');
    var submit1 = document.getElementById('Submit');
    var submit2 = document.getElementById('submitButton');
    var submit3 = document.getElementById('submitButtonCircular');
    var slider = document.getElementById('myRange');
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
document.addEventListener('DOMContentLoaded', function () {
    linkKeyPressesToButtons();
});
