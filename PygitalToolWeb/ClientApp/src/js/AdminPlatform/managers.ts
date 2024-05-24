import {loadManagers} from "./managerRestClient";

console.log("Managers script loaded");
export interface Managers {
    id: number;
    email: string;
    imageUrl: string;
}

export function initializeDOMListenersManager(): void {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link.textContent && link.textContent.trim() === "Beheerders") {
                link.addEventListener('click', async (event) => {
                    event.preventDefault();
                    await loadManagers();
                });
            }
        });
}
