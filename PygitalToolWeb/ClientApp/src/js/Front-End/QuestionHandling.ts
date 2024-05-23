// Checks if form input is empty

import {linkKeyPressesToButtons} from "./QuestionHandelingPhysicalButtons";
import {
    configureAnswerButtons,
    configureAnswerButtonsSingleChoice, configureSlider,
    configureSubmitButton,
    configureSubmitButtonSingleChoice, setTimerText
} from "./QuestionHandelingUI";

document.addEventListener('DOMContentLoaded', () => {
    const scriptElement = document.getElementById('questionPage-script');
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
});




