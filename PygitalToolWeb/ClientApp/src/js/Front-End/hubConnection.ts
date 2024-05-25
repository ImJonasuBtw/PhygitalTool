import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import { get } from "jquery";
import {Flow} from "../BackOffice/Flows/Flow";

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


const pauseButton = document.getElementById('pauseFlow') as HTMLButtonElement;
const resumeButton = document.getElementById('resumeFlow') as HTMLButtonElement;
const stopButton = document.getElementById('stopFlow') as HTMLButtonElement;

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

async function fetchCurrentIds() {
    try {
        const initialQuestionId = await hubConnection.invoke("GetCurrentQuestionId");
        //console.log("Current question ID:", initialQuestionId);
        currentQuestionId = initialQuestionId;
        const questionText = document.getElementById("questionText") as HTMLButtonElement;
        const questionIdInfo = document.getElementById('currentQuestionId');
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
        const flowIdInfo = document.getElementById('current_flow');
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
    const flowStateInfo = document.getElementById('current_flow_state');
    if (flowStateInfo) {
        flowStateInfo.innerText = flowState;
    }
}

// Listen for updates to the question ID
hubConnection.on("CurrentQuestionIdUpdated", newQuestionId => {
    //console.log("Current question ID updated:", newQuestionId);
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
        const flowIdInfo = document.getElementById('current_flow');
        if (flowIdInfo) {
            flowIdInfo.innerText = newFlowId;
        }
        const flowNameNotes = document.getElementById('notesFlowName');
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
    // Additional error handling or logging...
});

async function updateQuestionIdFromHTML() {
    if (window.location.pathname.startsWith("/CircularFlow")) {
        const questionIdElement = document.getElementById('QuestionId');
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



function refreshPageIfMatchingURL(url: string, newQuestionId: string) {
    if (window.location.pathname === url) {
        //console.log("Question ID changed, refreshing page.", newQuestionId);
        const questionIdInfo = document.getElementById('currentQuestionId');
        if (questionIdInfo && newQuestionId !== questionIdInfo.innerText) {
            setTimeout(() => {
                location.reload();
            }, 2000); // 2000 milliseconds = 2 seconds
        }
    }
}

async function getQuestion(questionId: any) {
    if (window.location.pathname.startsWith("/api/Notes") || window.location.pathname.startsWith("/api/Supervisors/show-supervisor-control-screen")) {
        try {
            const response = await fetch(`/GetQuestion/${questionId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const question = await response.json();
            const questionText = document.getElementById('questionText');
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
                const flowIdInfo = document.getElementById('current_flow');
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

document.querySelector('#pauseFlow')?.addEventListener('click', async () => {
    try {
        await hubConnection.invoke("PauseFlow");
        console.log("Flow paused successfully");
    } catch (error) {
        console.error("Error pausing flow:", error);
    }
});

document.querySelector('#resumeFlow')?.addEventListener('click', async () => {
    try {
        await hubConnection.invoke("StartFlow");
        console.log("Flow started successfully");
    } catch (error) {
        console.error("Error pausing flow:", error);
    }
});

document.querySelector('#stopFlow')?.addEventListener('click', async () => {
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

document.querySelector('#backToSupervisorScreen')?.addEventListener('click', async () => {
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