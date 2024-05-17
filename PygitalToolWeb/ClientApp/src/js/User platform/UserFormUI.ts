export function hasCurrentUserLikedIdea(ideaId: string): boolean {
    const likedIdeas = localStorage.getItem('likedIdeas');
    const currentUserId = document.getElementById('UserPlatform-script')?.dataset.userId;
    if (likedIdeas && currentUserId) {
        const likedIdeasObj = JSON.parse(likedIdeas) as { [userId: string]: string[] };
        return likedIdeasObj[currentUserId]?.includes(ideaId) ?? false;
    }
    return false;
}

export function markIdeaAsLikedByCurrentUser(ideaId: string): void {
    const currentUserId = document.getElementById('UserPlatform-script')?.dataset.userId;
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