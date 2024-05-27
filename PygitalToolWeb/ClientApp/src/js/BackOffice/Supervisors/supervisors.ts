import { loadSupervisors } from "./supervisorsRestClient";

console.log("Supervisor script loaded");
const scriptElement = document.getElementById('backOfficeHomePage-script');
export const backOfficeId = scriptElement?.dataset.backofficeId;

export interface Supervisor {
    id: number;
    email: string;
    imageUrl: string;
}

export function initializeDOMListenerSupervisor(): void {
    console.log(backOfficeId)
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











