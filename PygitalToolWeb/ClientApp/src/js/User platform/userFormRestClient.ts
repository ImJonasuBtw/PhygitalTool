import  {Idea} from "./userForm"
import {markIdeaAsLikedByCurrentUser, reloadUserPlatform} from "./userFormUI";

// Adds an idea to the server.
export async function AddIdea(newIdea: Idea, userId: string | undefined) {
    const response = await fetch('/api/ideas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: newIdea.title,
            description: newIdea.description,
            userId: userId
        })
    });

    if (!response.ok) {
        alert('Kon het idee niet toevoegen');
    }
    alert('Idee goed toegevoegd');
    reloadUserPlatform();

}

// Likes an idea and saves the like.
export async function LikeIdea(ideaId: string) {
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
}

// Adds a comment to the server.
export async function CommentIdea(ideaId: number, commentText: string, userId: string | undefined) {
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
        reloadUserPlatform();

    } else {
        console.error('kon comment niet toevoegen');
    }
}
