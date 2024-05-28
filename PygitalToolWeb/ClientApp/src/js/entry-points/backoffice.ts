import "../site.ts";
import {initializeDOMListenerSupervisor} from "../backoffice/supervisors/supervisors";
import {loadDOMs} from "../backoffice/projects/project-creation";


function initializeAllEventListeners() {
    initializeDOMListenerSupervisor();
    loadDOMs()
}

document.addEventListener('DOMContentLoaded', initializeAllEventListeners);