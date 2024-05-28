import {initializeEventListenersBackoffice} from "../admin-platform/backoffice-creation";
import {initializeDOMListenersManager} from "../admin-platform/managers"


function initializeAllEventListeners() {
    initializeEventListenersBackoffice();
    initializeDOMListenersManager();
}

document.addEventListener('DOMContentLoaded', initializeAllEventListeners);