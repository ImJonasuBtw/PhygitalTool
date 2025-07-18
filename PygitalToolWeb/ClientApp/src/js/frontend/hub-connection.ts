﻿import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";


let currentQuestionId: string | null = null;
let currentFlowId: string | null = null;
let currentFlowState: string | null = null;

const hubConnection: HubConnection = new HubConnectionBuilder()
    .withUrl("/questionHub")
    .withAutomaticReconnect()
    .build();

hubConnection.onreconnecting(error => {
    console.error("Connection lost due to error. Reconnecting...", error);
});

hubConnection.onreconnected(connectionId => {
    console.log("Connection reestablished. Connected with connectionId", connectionId);
    fetchCurrentIds(); 
});

hubConnection.start()
    .then(async () => {
        console.log("Hub connection established.");
        await updateQuestionIdFromHTML();
        await fetchCurrentIds();
        updateButtonVisibility();
    })
    .catch(error => {
        //console.error("Error establishing hub connection:", error);
    });


const pauseButton = document.getElementById('pause-flow') as HTMLButtonElement;
const resumeButton = document.getElementById('resume-flow') as HTMLButtonElement;
const stopButton = document.getElementById('stop-flow') as HTMLButtonElement;

function updateButtonVisibility() {
    if (currentFlowState === "running") {
        console.log("style buttons");
        pauseButton.style.display = "inline-block";
        stopButton.style.display = "inline-block";
        resumeButton.style.display = "none";
    } else if (currentFlowState === "paused") {
        resumeButton.style.display = "inline-block";
        pauseButton.style.display = "none";
        stopButton.style.display = "inline-block";
    }
    else if (currentFlowState === "stopped") {
        resumeButton.style.display = "none";
        pauseButton.style.display = "inline-block";
        stopButton.style.display = "inline-block";
    }
}

// Fetch current data for question, flow and flow state.
async function fetchCurrentIds() {
    try {
        const initialQuestionId = await hubConnection.invoke("GetCurrentQuestionId");
        console.log("Current question ID:", initialQuestionId);
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
        console.log("Current flow ID:", initialFlowId);
        currentFlowId = initialFlowId;
        const flowIdInfo = document.getElementById('current-flow');
    } catch (error) {
        console.error("Error getting current flow ID:", error);
    }
    try {
        const initialFlowState = await hubConnection.invoke("GetFlowState");
        console.log("Current FLOW state:", initialFlowState);
        currentFlowState = initialFlowState;
        updateFlowStateElement(initialFlowState);
        if(currentFlowState == "stopped" && window.location.pathname.startsWith("/CircularFlow")){
            const newUrl = `/api/Supervisors/show-start-screen`;
            window.location.href = newUrl;
        }
    } catch (error) {
        console.error("Error getting current flow state:", error);
    }
}


function updateFlowStateElement(flowState: string) {
    const flowStateInfo = document.getElementById('current-flow-state');
    if (flowStateInfo) {
        flowStateInfo.innerText = flowState;
    }
}

// Listen for updates to the question ID
hubConnection.on("CurrentQuestionIdUpdated", newQuestionId => {
    if (newQuestionId !== currentQuestionId) {
        currentQuestionId = newQuestionId;
        refreshPageIfMatchingURL("/api/Notes", newQuestionId);
        refreshPageIfMatchingURL("/api/Supervisors/show-supervisor-control-screen", newQuestionId);
    }
});

// Listen for updates to the flow ID
hubConnection.on("CurrentFlowIdUpdated", newFlowId => {
    if (newFlowId !== currentFlowId) {
        currentFlowId = newFlowId;
        const flowIdInfo = document.getElementById('current-flow');
        if (flowIdInfo) {
            flowIdInfo.innerText = newFlowId;
        }
        const flowNameNotes = document.getElementById('notes-flow-name');
        if (flowNameNotes) {
            flowNameNotes.innerText = newFlowId;
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

// Update the current question id by using data from the HTML.
async function updateQuestionIdFromHTML() {
    if (window.location.pathname.startsWith("/CircularFlow") || window.location.pathname.startsWith("/LinearFlow")) {
        const questionIdElement = document.getElementById('question-id');
        if (questionIdElement) {
            const newQuestionId = questionIdElement.textContent;
            if (newQuestionId) {
                try {
                    await hubConnection.invoke("SetCurrentQuestionId", newQuestionId);
                } catch (error) {
                    console.error("Failed to update current question ID:", error);
                }
            } else {
                console.error("Question ID element is empty.");
            }
        } else {
            console.error("HTML element with id 'QuestionId' not found.");
        }
    }
}


// Refresh a page if it matches a certain url.
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

// Get the question from the server with a question ID.
async function getQuestion(questionId: any) {
    if (window.location.pathname.startsWith("/api/Notes") || window.location.pathname.startsWith("/api/Supervisors/show-supervisor-control-screen")) {
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
                //console.log(`Flow started with ID: ${flowId}`);
                currentFlowId = flowId;
                const flowIdInfo = document.getElementById('current-flow');
                if (flowIdInfo) {
                    flowIdInfo.innerText = flowId;
                }
            } catch (err) {
                console.error("Error starting flow: ", err);
            }
        }
        const newUrl = `/api/Supervisors/show-supervisor-control-screen`;
        window.location.href = newUrl;
    });
});

if (window.location.pathname === "/api/Supervisors/show-start-screen") {
    console.log("Flow ID changed, refreshing supervisor start screen.");
    fetchCurrentIds();
}

document.querySelector('#pause-flow')?.addEventListener('click', async () => {
    try {
        await hubConnection.invoke("PauseFlow");
        console.log("Flow paused successfully");
    } catch (error) {
        console.error("Error pausing flow:", error);
    }
});

document.querySelector('#resume-flow')?.addEventListener('click', async () => {
    try {
        await hubConnection.invoke("StartFlow");
        console.log("Flow started successfully");
    } catch (error) {
        console.error("Error pausing flow:", error);
    }
});

document.querySelector('#stop-flow')?.addEventListener('click', async () => {
    try {
        await hubConnection.invoke("StopFlow");
        console.log("Flow stopped successfully");
        window.history.back();
    } catch (error) {
        console.error("Error pausing flow:", error);
    }
    try {
        await hubConnection.invoke("StartFlow");
        console.log("Flow started successfully");
    } catch (error) {
        console.error("Error pausing flow:", error);
    }
});




hubConnection.on("FlowStateUpdated", newFlowState => {
    //console.log("Current flow state updated:", newFlowState);
    currentFlowState = newFlowState;
    updateFlowStateElement(newFlowState);
    updateButtonVisibility();
    if (currentFlowState == "stopped" && window.location.pathname.startsWith("/CircularFlow")){
        console.log("flowsate is stopped");
        const newUrl = `/api/Supervisors/show-start-screen`;
        window.location.href = newUrl;
    }
});

document.querySelector('#back-to-supervisor-screen')?.addEventListener('click', async () => {
    try {
        await hubConnection.invoke("StopFlow");
        console.log("Flow stopped successfully");
        window.history.back();
    } catch (error) {
        console.error("Error pausing flow:", error);
    }
    try {
        await hubConnection.invoke("StartFlow");
        console.log("Flow started successfully");
    } catch (error) {
        console.error("Error pausing flow:", error);
    }
    history.back()
});