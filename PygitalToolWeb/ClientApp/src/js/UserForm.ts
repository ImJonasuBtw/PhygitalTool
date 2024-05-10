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

    const commentButtons = document.querySelectorAll('.commentButton');
    commentButtons.forEach(button => {
        button.addEventListener('click', function (this: HTMLElement) {
            const isAuthenticated = document.getElementById('Form-script')?.getAttribute('data-is-authenticated');

            if (isAuthenticated === 'false') {
                window.location.href = '/Identity/Account/Login';
                return;
            }
            const ideaId = this.getAttribute('data-ideaId');
            const commentForm = document.getElementById('commentForm-' + ideaId);
            if (commentForm) {
                commentForm.style.display = 'block';
            }
        });
    });

    const addCommentButtons = document.querySelectorAll('.addCommentButton');
    addCommentButtons.forEach(button => {
        button.addEventListener('click', async function (this: HTMLElement) {
          
          
            const ideaIdString = this.getAttribute('data-ideaId');
            if (ideaIdString) {
                const ideaId = parseInt(ideaIdString);
                const commentTextElement = document.getElementById('commentText-' + ideaId) as HTMLInputElement | null;
                const commentText = commentTextElement?.value;
                const scriptElement = document.getElementById('Form-script');
                const UserId = scriptElement?.getAttribute('data-User-id');

                try {
                    const response = await fetch('/api/Comment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ideaId: ideaId,
                            description: commentText,
                            userId: UserId
                        })
                    });

                    if (response.ok) {
                        window.location.reload();
                        
                    } else {
                        console.error('Failed to add comment');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        });
    });
});

