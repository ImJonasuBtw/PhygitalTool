import {initializeEventListenersBackoffice} from "../AdminPlatform/backOfficeCreation";
import {initializeDOMListenersManager} from "../AdminPlatform/Managers"
//import "../AdminPlatform/Managers"

function initializeAllEventListeners() {
    initializeEventListenersBackoffice();
   initializeDOMListenersManager();
}

document.addEventListener('DOMContentLoaded', initializeAllEventListeners);