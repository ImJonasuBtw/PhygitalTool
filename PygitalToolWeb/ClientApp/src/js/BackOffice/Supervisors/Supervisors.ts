import { loadSupervisors } from "./SupervisorsRestClient";

console.log("Supervisor script loaded");
export const scriptElement = document.getElementById('backOfficeHomePage-script');
export const backOfficeId = scriptElement?.dataset.backofficeId;

export interface Supervisor {
    id: number;
    email: string;
    imageUrl: string;
}

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.textContent && link.textContent.trim() === "Begeleiders") {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                loadSupervisors(Number(backOfficeId));
            });
        }
    });
});









