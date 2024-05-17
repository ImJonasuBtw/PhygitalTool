const key1U1: string = "w";
const key2U1: string = "a";
const key3U1: string = "s";
const key4U1: string = "d";
const key5U1: string = "f";
const keySubmitU1: string = " ";

const key1U2: string = "w";
const key2U2: string = "a";
const key3U2: string = "s";
const key4U2: string = "d";
const key5U2: string = "f";
const keySubmitU2: string = " ";

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

export function linkKeyPressesToButtons() {
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
        addEventListenerToKeyPressSlider(slider, key1U1, 0);
        addEventListenerToKeyPressSlider(slider, key2U1, 1);
        addEventListenerToKeyPressSlider(slider, key3U1, 2);
        addEventListenerToKeyPressSlider(slider, key4U1, 3);
        addEventListenerToKeyPressSlider(slider, key5U1, 4);
    } else {
        addEventListenerToKeyPress(button1, key1U1);
        addEventListenerToKeyPress(button2, key2U1);
        addEventListenerToKeyPress(button3, key3U1);
        addEventListenerToKeyPress(button4, key4U1);
        addEventListenerToKeyPress(button5, key5U1);
    }

    if (!document.getElementById('circular-timer')) {
        if (submit1) {
            addEventListenerToKeyPress(submit1, keySubmitU1)
        } else if (submit2) {
            addEventListenerToKeyPress(submit2, keySubmitU1)
        } else if (submit3) {
            addEventListenerToKeyPress(submit3, keySubmitU1)
        }
    }
}
