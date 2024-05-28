using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using PhygitalTool.BL.Flows;
using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.Web.Controllers.Flows;

public class LinearFlowController : Controller
{
    private readonly  IHubContext<QuestionHub> _questionHub;
    private readonly IFlowManager _flowManager;

    public LinearFlowController(IHubContext<QuestionHub> questionHub,IFlowManager flowManager)
    {
        _questionHub = questionHub;
        _flowManager = flowManager;
    }

    // Launches a flow using the flowId, this action is called after the user/supervisor selects the flow.
    // Returns SubThemeView for the user/supervisor to select the subtheme.
    // GET
    public IActionResult StartFLow(int flowId)
    {
        Flow flow = _flowManager.GetFlow(flowId);
        return View("~/Views/SubTheme/SubThemeInformationBeginView.cshtml",flow);
    }

    // Launches the first question of a flow, using the GetFirstFlowQuestion method
    public IActionResult GetFirstQuestion(int flowId)
    {
        Question question = _flowManager.GetFirstFlowQuestion(flowId);
        return View("QuestionView", question);
    }
  

    // Returns the View of the next question after the user submitted the last one.
    public Task<IActionResult> GetNextQuestion(int flowId , int questionId)
    {
        Question nextQuestion = _flowManager.GetNextQuestionInFlow(flowId, questionId);
        if (nextQuestion == null)
        {
            Flow flow = _flowManager.GetFlow(flowId);
            return Task.FromResult<IActionResult>(View("FlowEndView", flow ));
        }
        return Task.FromResult<IActionResult>(View("QuestionView",nextQuestion ));
    }
    
    
    public async Task UpdateCurrentQuestion(Question question)
    {
        await _questionHub.Clients.All.SendAsync("UpdateCurrentQuestion", question);
    }
    
}