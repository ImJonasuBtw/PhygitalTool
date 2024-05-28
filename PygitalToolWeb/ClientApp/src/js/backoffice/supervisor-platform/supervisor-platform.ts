// signalrConnection.ts
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";

let currentQuestionId: string | null = null;
let currentFlowId: string | null = null;

const hubConnection: HubConnection = new HubConnectionBuilder()
    .withUrl("/questionHub")
    .withAutomaticReconnect()
    .build();

hubConnection.onreconnecting(error => {
    console.error("Connection lost due to error. Reconnecting...", error);
});

hubConnection.onreconnected(connectionId => {
    console.log("Connection reestablished. Connected with connectionId", connectionId);
    fetchCurrentIds(); // Ensure the IDs are re-fetched on reconnection
});

hubConnection.start()
    .then(async () => {
        console.log("Hub connection established.");
        await updateQuestionIdFromHTML();
        await fetchCurrentIds();
    })
    .catch(error => {
        console.error("Error establishing hub connection:", error);
    });

// Fetch current question and flow IDs
async function fetchCurrentIds() {
    try {
        const initialQuestionId = await hubConnection.invoke("GetCurrentQuestionId");
        currentQuestionId = initialQuestionId;
        const questionText = document.getElementById("question-text") as HTMLButtonElement;
        const questionIdInfo = document.getElementById('current-question-id');
        if (questionText && questionIdInfo) {
            questionText.setAttribute("questionId", initialQuestionId);
            questionIdInfo.innerText = initialQuestionId;
        }
        getQuestion(currentQuestionId);
    } catch (error) {
        console.error("Error getting current question ID:", error);
    }
    try {
        const initialFlowId = await hubConnection.invoke("GetCurrentFlowId");
        currentFlowId = initialFlowId;
        const flowIdInfo = document.getElementById('current-flow');
        if (flowIdInfo) {
            flowIdInfo.innerText = initialFlowId;
        }
    } catch (error) {
        console.error("Error getting current flow ID:", error);
    }
}

// If question id changed refresh a certain page.
hubConnection.on("CurrentQuestionIdUpdated", newQuestionId => {
    console.log("Current question ID updated:", newQuestionId);
    if (newQuestionId !== currentQuestionId) {
        currentQuestionId = newQuestionId;
        refreshPageIfMatchingURL("/api/Notes", newQuestionId);
    }
});

// If flow id has changed refresh a certain page.
hubConnection.on("CurrentFlowIdUpdated", newFlowId => {
    if (newFlowId !== currentFlowId) {
        currentFlowId = newFlowId;
        const flowIdInfo = document.getElementById('current-flow');
        if (flowIdInfo) {
            flowIdInfo.innerText = newFlowId;
        }
    }
    if(window.location.pathname.startsWith("/api/Supervisors/show-start-screen")){
        const newUrl = `/SubTheme/ShowSubThemeInformation?flowId=${newFlowId}`;
        window.location.href = newUrl;
    }
});

hubConnection.onclose(error => {
    console.error("WebSocket connection closed:", error);
});

// Update question with id retrieved from HTML.
async function updateQuestionIdFromHTML() {
    if (window.location.pathname.startsWith("/CircularFlow")) {
        const questionIdElement = document.getElementById('question-id');
        if (questionIdElement) {
            const newQuestionId = questionIdElement.textContent;
            if (newQuestionId) {
                try {
                    await hubConnection.invoke("SetCurrentQuestionId", newQuestionId);
                } catch (error) {
                    console.error("Failed to update current question ID:", error);
                }
            } 
        } 
    }
}

// Refreshes page if it matches a certain url.
function refreshPageIfMatchingURL(url: string, newQuestionId: string) {
    if (window.location.pathname === url) {
        const questionIdInfo = document.getElementById('current-question-id');
        if (questionIdInfo && newQuestionId !== questionIdInfo.innerText) {
            setTimeout(() => {
                location.reload();
            }, 2000); 
        }
    }
}

// Fetches the question 
async function getQuestion(questionId: any) {
    if (window.location.pathname.startsWith("/api/Notes")) {
        try {
            const response = await fetch(`/GetQuestion/${questionId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const question = await response.json();
            const questionText = document.getElementById('question-text');
            if (questionText) {
                questionText.innerText = question.questionText;
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
}


document.querySelectorAll('.start-flow').forEach(button => {
    button.addEventListener('click', async (event) => {
        const flowId = (event.target as HTMLElement).getAttribute('data-flow-id');
        if (flowId) {
            try {
                await hubConnection.invoke("SetCurrentFlowId", flowId);
                console.log(`Flow started with ID: ${flowId}`);
                currentFlowId = flowId;
                const flowIdInfo = document.getElementById('current-flow');
                if (flowIdInfo) {
                    flowIdInfo.innerText = flowId;
                }
            } catch (err) {
                console.error("Error starting flow: ", err);
            }
        }
    });
});

if (window.location.pathname === "/api/Supervisors/show-start-screen") {
    console.log("Flow ID changed, refreshing supervisor start screen.");
    fetchCurrentIds();
}

export { hubConnection, currentQuestionId, currentFlowId };
