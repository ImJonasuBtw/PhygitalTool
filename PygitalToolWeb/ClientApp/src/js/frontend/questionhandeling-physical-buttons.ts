const key1U1: string = "1";
const key2U1: string = "2";
const key3U1: string = "3";
const key4U1: string = "4";
const key5U1: string = "5";
const keySubmitU1: string = "6";

const key1U2: string = "q";
const key2U2: string = "w";
const key3U2: string = "e";
const key4U2: string = "r";
const key5U2: string = "t";
const keySubmitU2: string = "y";

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
    const slider = document.getElementById('my-range') as HTMLInputElement;
    
    const buttons: Array<HTMLButtonElement> = [
        document.getElementById('button-1') as HTMLButtonElement,
        document.getElementById('button-2') as HTMLButtonElement,
        document.getElementById('button-3') as HTMLButtonElement,
        document.getElementById('button-4') as HTMLButtonElement,
        document.getElementById('button-5') as HTMLButtonElement];
    
    const submitButtons: Array<HTMLButtonElement> = [
        document.getElementById('submit') as HTMLButtonElement,
        document.getElementById('submit-button') as HTMLButtonElement,
        document.getElementById('submit-button-single-choice') as HTMLButtonElement,
        document.getElementById('submit-button-circular') as HTMLButtonElement];
    
    const keysUser1: Array<string> = [key1U1, key2U1, key3U1, key4U1, key5U1];
    const keysUser2: Array<string> = [key1U2, key2U2, key3U2, key4U2, key5U2];
    
    if(slider) {
        for (let i = 0; i < keysUser1.length; i++) {
            addEventListenerToKeyPressSlider(slider, keysUser1[i], i)
            addEventListenerToKeyPressSlider(slider, keysUser2[i], i)
        }
    } else {
        for (let i = 0; i < keysUser1.length; i++) {
            addEventListenerToKeyPress(buttons[i], keysUser1[i])
            addEventListenerToKeyPress(buttons[i], keysUser2[i])
        }
    }

    if (!document.getElementById('circular-timer')) {
        for (let i = 0; i < submitButtons.length; i++) {
            if(submitButtons[i]) {
                addEventListenerToKeyPress(submitButtons[i], keySubmitU1);
                addEventListenerToKeyPress(submitButtons[i], keySubmitU2);
            }
        }
    }
}



