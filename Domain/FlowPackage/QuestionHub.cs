namespace PhygitalTool.Domain.FlowPackage;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

public class QuestionHub : Hub
{
    private static string currentQuestionId = "initial_id";
    private static string currentFlowId = "initial_flow_id";
    private static string flowState = "running";

    public async Task SetCurrentQuestionId(string questionId)
    {
        currentQuestionId = questionId;
        await Clients.All.SendAsync("CurrentQuestionIdUpdated", currentQuestionId);
    }

    public async Task<string> GetCurrentQuestionId()
    {
        return currentQuestionId;
    }
    public async Task SetCurrentFlowId(string flowId)
    {
        currentFlowId = flowId;
        await Clients.All.SendAsync("CurrentFlowIdUpdated", currentFlowId);
    }

    public async Task<string> GetCurrentFlowId()
    {
        return currentFlowId;
    }
    
    public async Task StartFlow()
    {
        if (flowState == "stopped" || flowState == "paused")
        {
            flowState = "running";
            await Clients.All.SendAsync("FlowStateUpdated", flowState);
        }
    }

    public async Task PauseFlow()
    {
        if (flowState == "running" || flowState == "stopped")
        {
            flowState = "paused";
            await Clients.All.SendAsync("FlowStateUpdated", flowState);
        }
    }

    public async Task StopFlow()
    {
        if (flowState != "stopped")
        {
            flowState = "stopped";
            await Clients.All.SendAsync("FlowStateUpdated", flowState);
        }
    }

    public async Task<string> GetFlowState()
    {
        return flowState;
    }
}