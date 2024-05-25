var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { HubConnectionBuilder } from "@microsoft/signalr";
let currentQuestionId = null; // Variabele om de huidige vraag-ID bij te houden
const hubConnection = new HubConnectionBuilder()
    .withUrl("/questionHub")
    .build();
hubConnection.start()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Hub connection established.");
    // Roep eerst SetCurrentQuestionId aan om de ID bij te werken
    yield updateQuestionIdFromHTML();
    // Vraag de huidige ID op nadat de verbinding is opgezet en de ID is bijgewerkt
    yield hubConnection.invoke("GetCurrentQuestionId")
        .then(initialQuestionId => {
        console.log("Current question ID:", initialQuestionId);
        currentQuestionId = initialQuestionId;
        const questionIdInfo = document.getElementById('currentQuestionId');
        if (questionIdInfo) {
            questionIdInfo.innerText = initialQuestionId;
        }
        getQuestion(currentQuestionId);
    })
        .catch(error => {
        console.error("Error getting current question ID:", error);
    });
}))
    .catch(error => {
    console.error("Error establishing hub connection:", error);
});
// Luister naar updates van de ID
hubConnection.on("CurrentQuestionIdUpdated", newQuestionId => {
    console.log("Current question ID updated:", newQuestionId);
    if (newQuestionId !== currentQuestionId) {
        currentQuestionId = newQuestionId;
        refreshPageIfMatchingURL("/Question/QuestionInfo", newQuestionId);
    }
});
function updateQuestionIdFromHTML() {
    return __awaiter(this, void 0, void 0, function* () {
        const questionIdElement = document.getElementById('QuestionId');
        if (questionIdElement) {
            const newQuestionId = questionIdElement.textContent;
            yield hubConnection.invoke("SetCurrentQuestionId", newQuestionId)
                .then(() => {
                console.log("Current question ID updated successfully to:", newQuestionId);
            })
                .catch(error => {
                console.error("Failed to update current question ID:", error);
            });
        }
        else {
            console.error("HTML element with id 'QuestionId' not found.");
        }
    });
}
function refreshPageIfMatchingURL(url, newQuestionId) {
    if (window.location.pathname === url) {
        console.log("questionId veranderd");
        const questionIdInfo = document.getElementById('currentQuestionId');
        location.reload();
        if (questionIdInfo && questionIdInfo.innerText !== newQuestionId) {
            setTimeout(() => {
                location.reload();
            }, 1000); // 2000 milliseconden = 2 seconden
        }
    }
}
function getQuestion(questionId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`/GetQuestion/${questionId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const question = yield response.json();
            const questionText = document.getElementById('questionText');
            if (questionText) {
                questionText.innerText = question.questionText;
                questionText.setAttribute("questionId", questionId);
            }
        }
        catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    });
}
