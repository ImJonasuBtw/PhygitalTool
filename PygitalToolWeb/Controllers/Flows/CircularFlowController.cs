using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL;
using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.Web.Controllers;

public class CircularFlowController : Controller
{
    private readonly IFlowManager _flowManager;
    private readonly ILogger<QuestionController> _logger;


    public CircularFlowController(IFlowManager flowManager, ILogger<QuestionController> logger)
    {
        _flowManager = flowManager;
        _logger = logger;
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

        // Increment question count stored in session. Initialize if not set.
        int questionCount = HttpContext.Session.GetInt32("QuestionCount") ?? 0;
        questionCount++;
        HttpContext.Session.SetInt32("QuestionCount", questionCount);

        // Get the next question.
        Question nextQuestion = _flowManager.GetNextQuestionInFlow(flowId, questionId);

        if (nextQuestion == null)
        {
            Question question = _flowManager.GetFirstFlowQuestion(flowId);
            TempData["subThemeId"] = subThemeId;
            return View("~/Views/LinearFlow/QuestionView.cshtml", question);
        }

        // Every "x" questions, show the subtheme information view.
        if (questionCount == x)
        {
            // Reset counter
            HttpContext.Session.SetInt32("QuestionCount", 0);
            var flow = _flowManager.GetFlow(flowId);
            TempData["questionId"] = questionId;
            return View("~/Views/SubTheme/SubThemeInformationCircularView.cshtml", flow);
        }

        // Show the standard question view.
        TempData["subThemeId"] = subThemeId;
        return View("~/Views/LinearFlow/QuestionView.cshtml", nextQuestion);
    }
    
    // Stops the flow when the "stop" button is pressed.
    public IActionResult EndFlow(int flowId)
    {
        Flow flow = _flowManager.GetFlow(flowId);
        return View("CircularFlowEndView", flow);
    }
}