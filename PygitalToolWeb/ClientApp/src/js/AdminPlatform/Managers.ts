import {loadManagers} from "./ManagerRestClient";

console.log("Managers script loaded");
export interface Managers {
    id: number;
    email: string;
    imageUrl: string;
}

export function initializeDOMListenersManager(): void {
        const navLinks = document.querySelectorAll('.nav-link');
        console.log("navLinks:", navLinks);
        navLinks.forEach(link => {
            console.log("Attaching click event listener to link:", link);
            if (link.textContent && link.textContent.trim() === "Beheerders") {
                link.addEventListener('click', async (event) => {
                    console.log("Beheerders link clicked.");
                    event.preventDefault();
                    await loadManagers();
                });
            }
        });
}
