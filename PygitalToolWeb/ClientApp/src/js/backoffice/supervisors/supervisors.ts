import {loadSupervisors} from "./supervisors-restclient";

const scriptElement = document.getElementById('backoffice-script');
export const backOfficeId = scriptElement?.dataset.backofficeId;

export interface Supervisor {
    id: number;
    email: string;
    imageUrl: string;
}

// Initializes a DOM listener for supervisor-related navigation links. 
export function initializeDOMListenerSupervisor(): void {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.textContent && link.textContent.trim() === "Begeleiders") {
            link.addEventListener('click', async (event) => {
                event.preventDefault();
                await loadSupervisors(Number(backOfficeId));
            });
        }
    });
}











