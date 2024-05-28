using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using PhygitalTool.BL.Flows;
using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.Web.Controllers.Flows;

public class CircularFlowController : Controller
{
    private readonly IFlowManager _flowManager;
    private readonly IHubContext<QuestionHub> _hubContext;


    public CircularFlowController(IFlowManager flowManager, IHubContext<QuestionHub> hubContext)
    {
        _flowManager = flowManager;
        _hubContext = hubContext;
    }

    // Launches a Flow after a user/supervisor selects it. Returns a SubThemView to select the subtheme.
    // GET
    public IActionResult StartFLow(int flowId)
    {
        Flow flow = _flowManager.GetFlow(flowId);
        return View("~/Views/SubTheme/SubThemeInformationBeginView.cshtml", flow);
    }

    // Returns the first question view of a flow after a user/supervisor selects the subtheme.
    public IActionResult GetFirstQuestion(int flowId, int subThemeId)
    {
        Question question = _flowManager.GetFirstFlowQuestion(flowId);
        TempData["subThemeId"] = subThemeId;
        return View("~/Views/LinearFlow/QuestionView.cshtml", question);
    }

    // Returns the view of the next question after the timer has ran out on the previous one.
    // Shows the subtheme information view after each x-amount of questions.
    public IActionResult GetNextQuestion(int flowId, int questionId, int subThemeId)
    {
        int x = 3;

     
        int questionCount = HttpContext.Session.GetInt32("QuestionCount") ?? 0;
        questionCount++;
        HttpContext.Session.SetInt32("QuestionCount", questionCount);

      
        Question nextQuestion = _flowManager.GetNextQuestionInFlow(flowId, questionId);

        if (nextQuestion == null)
        {
            Question question = _flowManager.GetFirstFlowQuestion(flowId);
            TempData["subThemeId"] = subThemeId;
            return View("~/Views/LinearFlow/QuestionView.cshtml", question);
        }


        if (questionCount == x)
        {
         
            HttpContext.Session.SetInt32("QuestionCount", 0);
            var flow = _flowManager.GetFlow(flowId);
            TempData["questionId"] = questionId;
            return View("~/Views/SubTheme/SubThemeInformationCircularView.cshtml", flow);
        }
        
        TempData["subThemeId"] = subThemeId;
        return View("~/Views/LinearFlow/QuestionView.cshtml", nextQuestion);
    }
    
    // Stops the flow when the "stop" button is pressed.
    public IActionResult EndFlow(int flowId)
    {
        Flow flow = _flowManager.GetFlow(flowId);
        return View("CircularFlowEndView", flow);
    }
    
    [HttpPost]
    public async Task<IActionResult> StartFlow()
    {
        await _hubContext.Clients.All.SendAsync("FlowStarted");
        return Ok();
    }
}