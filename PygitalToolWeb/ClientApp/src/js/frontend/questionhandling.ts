// Checks if form input is empty

import {linkKeyPressesToButtons} from "./questionhandeling-physical-buttons";
import {
    configureAnswerButtons,
    configureAnswerButtonsSingleChoice, configureSlider,
    configureSubmitButton,
    configureSubmitButtonSingleChoice, setTimerText
} from "./questionhandeling-ui";

// Initialize the flow page.
export function initializePage() { 
    const scriptElement = document.getElementById('question-page-script');
    console.log('Script Element:', scriptElement);
    const flowType = scriptElement?.dataset.flowtype;
    console.log('Flow type:', flowType);
    
    configureAnswerButtons();
    configureAnswerButtonsSingleChoice();
    configureSubmitButton();
    configureSubmitButtonSingleChoice();
    configureSlider();
    linkKeyPressesToButtons();

    if (flowType === 'circular') {
        setTimerText();
    }
}





