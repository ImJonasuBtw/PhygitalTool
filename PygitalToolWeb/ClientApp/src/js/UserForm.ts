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
            const UserId = scriptElement?.dataset.userId;


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
                    userId : UserId
                })
            });

            if (response.ok) {
                window.location.reload();
            } else {
                alert('Failed to add idea.');
            }
            window.location.reload();
        });
    }
    
    function hasCurrentUserLikedIdea(ideaId: string): boolean {
        const likedIdeas = localStorage.getItem('likedIdeas');
        const currentUserId = document.getElementById('Form-script')?.getAttribute('data-User-id');
        if (likedIdeas && currentUserId) {
            const likedIdeasObj = JSON.parse(likedIdeas) as { [userId: string]: string[] };
            return likedIdeasObj[currentUserId]?.includes(ideaId) ?? false;
        }
        return false;
    }

    function markIdeaAsLikedByCurrentUser(ideaId: string): void {
        const currentUserId = document.getElementById('Form-script')?.getAttribute('data-User-id');
        if (currentUserId) {
            let likedIdeas = localStorage.getItem('likedIdeas');
            if (likedIdeas) {
                const likedIdeasObj = JSON.parse(likedIdeas) as { [userId: string]: string[] };
                if (likedIdeasObj[currentUserId]) {
                    likedIdeasObj[currentUserId].push(ideaId);
                } else {
                    likedIdeasObj[currentUserId] = [ideaId];
                }
                localStorage.setItem('likedIdeas', JSON.stringify(likedIdeasObj));
            } else {
                const newLikedIdeasObj = { [currentUserId]: [ideaId] };
                localStorage.setItem('likedIdeas', JSON.stringify(newLikedIdeasObj));
            }
        }
    }

    const likeButtons = document.querySelectorAll('.likeButton');
    likeButtons.forEach(button => {
        button.addEventListener('click', async function (this: HTMLElement) {
            const isAuthenticated = document.getElementById('Form-script')?.getAttribute('data-is-authenticated');

            if (isAuthenticated === 'false') {
                window.location.href = '/Identity/Account/Login';
                return;
            }

            const ideaId = this.getAttribute('data-ideaId');
            if (ideaId && !hasCurrentUserLikedIdea(ideaId)) { // Check if the current user has not already liked the idea
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
                        console.error('Failed to like idea');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        });
    });

    const commentButtons = document.querySelectorAll('.commentButton');

    commentButtons.forEach(button => {
        button.addEventListener('click', function (this: HTMLElement) { // Type-annotatie toegevoegd voor 'this'
            const isAuthenticated = document.getElementById('Form-script')?.getAttribute('data-is-authenticated');

            if (isAuthenticated === 'false') {
                window.location.href = '/Identity/Account/Login';
                return;
            }
            const ideaId = this.getAttribute('data-ideaId');
            const commentForm = document.getElementById('commentForm-' + ideaId);

            if (commentForm instanceof HTMLElement) {
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
                const UserId = scriptElement?.dataset.userId;
                if(!commentText){
                    alert('Vul een commentaar in.');
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

