function addEventListenerToKeyPress(button, key) {
    if (button) {
        document.addEventListener('keydown', function (event) {
            if (event.key === key) {
                button.click();
            }
        });
    }
}
function addEventListenerToKeyPressSlider(slider, key) {
    document.addEventListener('keydown', function (event) {
        if (event.key === key.toString()) {
            slider.value = (key - 1).toString();
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
    var buttons = [button1, button2, button3, button4, button5];
    for (var i = 1; i < 6; i++) {
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
document.addEventListener('DOMContentLoaded', function () {
    linkKeyPressesToButtons();
});
