import {loadManagers} from "./manager-restclient";
export interface Managers {
    id: number;
    email: string;
    imageUrl: string;
}

// Initializes DOM listeners for manager-related navigation links.
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