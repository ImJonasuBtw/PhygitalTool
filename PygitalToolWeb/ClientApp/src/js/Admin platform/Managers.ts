import {loadManagers} from "./ManagerUI";

console.log("Managers script loaded");
export interface Managers {
    id: number;
    email: string;
    imageUrl: string;
}

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.textContent && link.textContent.trim() === "Beheerders") {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                loadManagers();
            });
        }
    });
});









