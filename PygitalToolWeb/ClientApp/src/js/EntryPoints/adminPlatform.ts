import {initializeEventListenersBackoffice} from "../AdminPlatform/backOfficeCreation";
import {initializeDOMListenersManager} from "../AdminPlatform/managers"


function initializeAllEventListeners() {
    initializeEventListenersBackoffice();
   initializeDOMListenersManager();
}

document.addEventListener('DOMContentLoaded', initializeAllEventListeners);