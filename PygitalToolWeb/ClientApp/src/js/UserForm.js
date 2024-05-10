"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Idea {
    constructor(description, title) {
        this.description = description;
        this.title = title;
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('addIdeaButton');
    if (addButton) {
        addButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            const title = document.getElementById('newIdeaTitle').value;
            const description = document.getElementById('newIdeaDescription').value;
            const scriptElement = document.getElementById('Form-script');
            const UserId = scriptElement === null || scriptElement === void 0 ? void 0 : scriptElement.getAttribute('data-User-id');
            const newIdea = new Idea(description, title);
            console.log(UserId);
            const response = yield fetch('/api/ideas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: newIdea.title,
                    description: newIdea.description,
                    userId: UserId
                })
            });
            if (response.ok) {
                window.location.reload();
            }
            else {
                alert('Failed to add idea.');
            }
        }));
    }
    function hasCurrentUserLikedIdea(ideaId) {
        var _a, _b, _c;
        const likedIdeas = localStorage.getItem('likedIdeas');
        const currentUserId = (_a = document.getElementById('Form-script')) === null || _a === void 0 ? void 0 : _a.getAttribute('data-User-id');
        if (likedIdeas && currentUserId) {
            const likedIdeasObj = JSON.parse(likedIdeas);
            return (_c = (_b = likedIdeasObj[currentUserId]) === null || _b === void 0 ? void 0 : _b.includes(ideaId)) !== null && _c !== void 0 ? _c : false;
        }
        return false;
    }
    function markIdeaAsLikedByCurrentUser(ideaId) {
        var _a;
        const currentUserId = (_a = document.getElementById('Form-script')) === null || _a === void 0 ? void 0 : _a.getAttribute('data-User-id');
        if (currentUserId) {
            let likedIdeas = localStorage.getItem('likedIdeas');
            if (likedIdeas) {
                const likedIdeasObj = JSON.parse(likedIdeas);
                if (likedIdeasObj[currentUserId]) {
                    likedIdeasObj[currentUserId].push(ideaId);
                }
                else {
                    likedIdeasObj[currentUserId] = [ideaId];
                }
                localStorage.setItem('likedIdeas', JSON.stringify(likedIdeasObj));
            }
            else {
                const newLikedIdeasObj = { [currentUserId]: [ideaId] };
                localStorage.setItem('likedIdeas', JSON.stringify(newLikedIdeasObj));
            }
        }
    }
    const likeButtons = document.querySelectorAll('.likeButton');
    likeButtons.forEach(button => {
        button.addEventListener('click', function () {
            return __awaiter(this, void 0, void 0, function* () {
                var _a;
                const isAuthenticated = (_a = document.getElementById('Form-script')) === null || _a === void 0 ? void 0 : _a.getAttribute('data-is-authenticated');
                if (isAuthenticated === 'false') {
                    window.location.href = '/Identity/Account/Login';
                    return;
                }
                const ideaId = this.getAttribute('data-ideaId');
                if (ideaId && !hasCurrentUserLikedIdea(ideaId)) { // Check if the current user has not already liked the idea
                    try {
                        const response = yield fetch(`/api/Ideas/Like/${ideaId}`, {
                            method: 'POST',
                        });
                        if (response.ok) {
                            const likesCountElement = document.getElementById(`likesCount-${ideaId}`);
                            if (likesCountElement) {
                                const currentLikes = parseInt(likesCountElement.textContent || '0');
                                likesCountElement.textContent = (currentLikes + 1).toString();
                            }
                            markIdeaAsLikedByCurrentUser(ideaId); // Mark the idea as liked by the current user
                        }
                        else {
                            console.error('Failed to like idea');
                        }
                    }
                    catch (error) {
                        console.error('Error:', error);
                    }
                }
            });
        });
    });
    const commentButtons = document.querySelectorAll('.commentButton');
    commentButtons.forEach(button => {
        button.addEventListener('click', function () {
            var _a;
            const isAuthenticated = (_a = document.getElementById('Form-script')) === null || _a === void 0 ? void 0 : _a.getAttribute('data-is-authenticated');
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
        button.addEventListener('click', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const ideaIdString = this.getAttribute('data-ideaId');
                if (ideaIdString) {
                    const ideaId = parseInt(ideaIdString);
                    const commentTextElement = document.getElementById('commentText-' + ideaId);
                    const commentText = commentTextElement === null || commentTextElement === void 0 ? void 0 : commentTextElement.value;
                    const scriptElement = document.getElementById('Form-script');
                    const UserId = scriptElement === null || scriptElement === void 0 ? void 0 : scriptElement.getAttribute('data-User-id');
                    try {
                        const response = yield fetch('/api/Comment', {
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
                        }
                        else {
                            console.error('Failed to add comment');
                        }
                    }
                    catch (error) {
                        console.error('Error:', error);
                    }
                }
            });
        });
    });
});
