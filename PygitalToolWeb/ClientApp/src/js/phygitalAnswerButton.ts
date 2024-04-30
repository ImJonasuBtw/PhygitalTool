function addEventListenerToKeyPress(button: HTMLButtonElement, key: string) {
    if (button) {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === key) {
                button.click();
            }
        });
    }
}

function addEventListenerToKeyPressSlider(slider: HTMLInputElement, key: number) {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === key.toString()) {
            slider.value = (key - 1).toString();
            const event = new Event('input', {bubbles: true});
            slider.dispatchEvent(event);
        }
    });
}

function linkKeyPressesToButtons() {
    const button1 = document.getElementById('button-1') as HTMLButtonElement;
    const button2 = document.getElementById('button-2') as HTMLButtonElement;
    const button3 = document.getElementById('button-3') as HTMLButtonElement;
    const button4 = document.getElementById('button-4') as HTMLButtonElement;
    const button5 = document.getElementById('button-5') as HTMLButtonElement;
    const submit1 = document.getElementById('Submit') as HTMLButtonElement;
    const submit2 = document.getElementById('submitButton') as HTMLButtonElement;
    const submit3 = document.getElementById('submitButtonCircular') as HTMLButtonElement;
    const slider = document.getElementById('myRange') as HTMLInputElement;

    const buttons: HTMLButtonElement[] = [button1, button2, button3, button4, button5];

    for (let i = 1; i < 6; i++) {
        if (slider) {
            addEventListenerToKeyPressSlider(slider, i)
        } else {
            addEventListenerToKeyPress(buttons[i - 1], i.toString());
        }
    }

    if (!document.getElementById('circular-timer')) {
        if (submit1) {
            addEventListenerToKeyPress(submit1, "6")
        } else if (submit2) {
            addEventListenerToKeyPress(submit2, "6")
        } else if (submit3) {
            addEventListenerToKeyPress(submit3, "6")
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    linkKeyPressesToButtons();
});