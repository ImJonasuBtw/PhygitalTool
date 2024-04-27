const button = document.getElementById('button-1') as HTMLButtonElement;

document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        button.click();
    }
});