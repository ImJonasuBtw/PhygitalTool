import "../Site.ts";

import {initializeDOMListenerSupervisor} from "../BackOffice/Supervisors/supervisors";
import {loadDOMs} from "../BackOffice/Projects/projectCreation";


function initializeAllEventListeners() {
    initializeDOMListenerSupervisor();
    loadDOMs()
}

document.addEventListener('DOMContentLoaded', initializeAllEventListeners);