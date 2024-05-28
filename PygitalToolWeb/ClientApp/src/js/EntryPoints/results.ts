import {showResults} from "../BackOffice/Results/results";

async function init() {
    await showResults();
}

document.addEventListener('DOMContentLoaded', init);