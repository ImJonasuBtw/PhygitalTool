using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using PhygitalTool.BL;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Web.Controllers.Flows;

namespace PhygitalTool.Web.Controllers;

public class LinearFlowController : Controller
{
    private readonly  IHubContext<QuestionHub> _questionHub;
    private readonly IFlowManager _flowManager;
    private readonly ILogger<QuestionController> _logger;

    public LinearFlowController(IHubContext<QuestionHub> questionHub,IFlowManager flowManager, ILogger<QuestionController> logger)
    {
        _questionHub = questionHub;
        _flowManager = flowManager;
        _logger = logger;
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
    public async Task<IActionResult> GetNextQuestion(int flowId , int questionId)
    {
        Question nextQuestion = _flowManager.GetNextQuestionInFlow(flowId, questionId);
        if (nextQuestion == null)
        {
            Flow flow = _flowManager.GetFlow(flowId);
            return View("FlowEndView", flow );
        }
        return View("QuestionView",nextQuestion );
    }
    
    [HttpGet("GetNextQuestion/{flowId}/{questionId}/{answer}")]
    public async Task<IActionResult> GetNextQuestion(int flowId , int questionId, string answer)
    {
        Question nextQuestion = _flowManager.GetNextQuestionInFlow(flowId, questionId, answer);
        await UpdateCurrentQuestion(nextQuestion);
        if (nextQuestion == null)
        {
            Flow flow = _flowManager.GetFlow(flowId);
            return View("FlowEndView", flow );
        }
        return View("QuestionView",nextQuestion );
    }
    
    public async Task UpdateCurrentQuestion(Question question)
    {
        await _questionHub.Clients.All.SendAsync("UpdateCurrentQuestion", question);
    }
    
}