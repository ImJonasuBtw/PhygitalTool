import {hasCurrentUserLikedIdea, markIdeaAsLikedByCurrentUser} from "./UserFormUI";

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
            const scriptElement = document.getElementById('UserPlatform-script');
            const userId = scriptElement?.dataset.userId;
            const newIdea = new Idea(description, title);
            if (!title || !description) {
                alert('Vul beide velden titel en beschrijving in.');
                return;
            }
            const response = await fetch('/api/ideas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: newIdea.title,
                    description: newIdea.description,
                    userId : userId
                })
            });

            if (!response.ok) {
                alert('Kon het idee niet toevoegen');
            }
            alert('Idee goed toegevoegd');
            window.location.reload(); 
        });
     
    }




    const likeButtons = document.querySelectorAll('.likeButton');
    likeButtons.forEach(button => {
        button.addEventListener('click', async function (this: HTMLElement) {
            const isAuthenticated = document.getElementById('UserPlatform-script')?.dataset.isAuthenticated === 'true';

            if (!isAuthenticated) {
                window.location.href = '/Identity/Account/Login';
                return;
            }

            const ideaId = this.getAttribute('data-ideaId');
            if (ideaId && !hasCurrentUserLikedIdea(ideaId)) { 
                try {
                    const response = await fetch(`/api/Ideas/Like/${ideaId}`, {
                        method: 'POST',
                    });

                    if (response.ok) {
                        const likesCountElement = document.getElementById(`likesCount-${ideaId}`);
                        if (likesCountElement) {
                            const currentLikes = parseInt(likesCountElement.textContent || '0');
                            likesCountElement.textContent = (currentLikes + 1).toString();
                        }
                        markIdeaAsLikedByCurrentUser(ideaId); 
                    } else {
                        console.error('Kon idee niet liken');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        });
    });

    const commentButtons = document.querySelectorAll('.commentButton');
    commentButtons.forEach(button => {
        button.addEventListener('click', function (this: HTMLElement) {
            const isAuthenticated = document.getElementById('UserPlatform-script')?.dataset.isAuthenticated === 'true';

            if (!isAuthenticated) {
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
                const scriptElement = document.getElementById('UserPlatform-script');
                const userId = scriptElement?.dataset.userId;
                if (!commentText) {
                    alert('Vul comment in');
                    return;
                }

                try {
                    const response = await fetch('/api/Comment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ideaId: ideaId,
                            description: commentText,
                            userId: userId
                        })
                    });

                    if (response.ok) {
                        window.location.reload();

                    } else {
                        console.error('kon comment niet toevoegen');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        });
    });
});
