
class Idea {
    public description: string;
    public title: string;

    constructor(description: string, title: string) {
        this.description = description;
        this.title = title;
    }

}
document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('addIdeaButton');
    if (addButton) {
        addButton.addEventListener('click', async () => {
            const title = (document.getElementById('newIdeaTitle') as HTMLInputElement).value;
            const description = (document.getElementById('newIdeaDescription') as HTMLInputElement).value;
            const scriptElement = document.getElementById('Form-script');
            const UserId = scriptElement?.getAttribute('data-User-id');
            
            const newIdea = new Idea(description, title);
        console.log(UserId)
            const response = await fetch('/api/ideas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: newIdea.title,
                    description: newIdea.description,
                    userId : UserId
                })
            });

            if (response.ok) {
                window.location.reload();
            } else {
                alert('Failed to add idea.');
            }
        });
    }
});

