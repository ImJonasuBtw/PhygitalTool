import {showResults} from "../backoffice/results/results";

async function init() {
    await showResults();
}

document.addEventListener('DOMContentLoaded', init);