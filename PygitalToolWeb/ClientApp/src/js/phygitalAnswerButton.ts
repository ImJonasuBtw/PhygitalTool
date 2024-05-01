const key1: string = "w";
const key2: string = "a";
const key3: string = "s";
const key4: string = "d";
const key5: string = "f";
const keySubmit: string = " ";

function addEventListenerToKeyPress(button: HTMLButtonElement, key: string) {
    if (button) {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === key) {
                button.click();
            }
        });
    }
}

function addEventListenerToKeyPressSlider(slider: HTMLInputElement, key: string, value: number) {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === key) {
            slider.value = value.toString();
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
    
    if(slider) {
        addEventListenerToKeyPressSlider(slider, key1, 0);
        addEventListenerToKeyPressSlider(slider, key2, 1);
        addEventListenerToKeyPressSlider(slider, key3, 2);
        addEventListenerToKeyPressSlider(slider, key4, 3);
        addEventListenerToKeyPressSlider(slider, key5, 4);
    } else {
        addEventListenerToKeyPress(button1, key1);
        addEventListenerToKeyPress(button2, key2);
        addEventListenerToKeyPress(button3, key3);
        addEventListenerToKeyPress(button4, key4);
        addEventListenerToKeyPress(button5, key5);
    }

    if (!document.getElementById('circular-timer')) {
        if (submit1) {
            addEventListenerToKeyPress(submit1, keySubmit)
        } else if (submit2) {
            addEventListenerToKeyPress(submit2, keySubmit)
        } else if (submit3) {
            addEventListenerToKeyPress(submit3, keySubmit)
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    linkKeyPressesToButtons();
});