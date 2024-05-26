import {hasCurrentUserLikedIdea} from "./userFormUI";
import {AddIdea, CommentIdea, LikeIdea} from "./userFormRestClient";

export class Idea {
    public description: string;
    public title: string;

    constructor(description: string, title: string) {
        this.description = description;
        this.title = title;
    }

}
const scriptElement = document.getElementById('UserPlatform-script');
const userId = scriptElement?.dataset.userId;
function  SetupaddIdea(){
    const addButton = document.getElementById('addIdeaButton');
    if (addButton) {
        addButton.addEventListener('click', async () => {
            const title = (document.getElementById('newIdeaTitle') as HTMLInputElement).value;
            const description = (document.getElementById('newIdeaDescription') as HTMLInputElement).value;
            const newIdea = new Idea(description, title);
            if (!title || !description) {
                alert('Vul beide velden titel en beschrijving in.');
                return;
            }
            await AddIdea(newIdea, userId)
        });

    }
}
function setupLike(){
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
                    await LikeIdea(ideaId)
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        });
    });
}
function setupComment(){
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
}
function setupAddComment(){
    const addCommentButtons = document.querySelectorAll('.addCommentButton');
    addCommentButtons.forEach(button => {
        button.addEventListener('click', async function (this: HTMLElement) {


            const ideaIdString = this.getAttribute('data-ideaId');
            if (ideaIdString) {
                const ideaId = parseInt(ideaIdString);
                const commentTextElement = document.getElementById('commentText-' + ideaId) as HTMLInputElement | null;
                const commentText = commentTextElement?.value;
                if (!commentText) {
                    alert('Vul comment in');
                    return;
                }

                try {
                    await CommentIdea(ideaId, commentText, userId)
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        });
    });
}
export  function loadDoms(){
    SetupaddIdea();
    setupLike();
    setupComment();
    setupAddComment();
}

