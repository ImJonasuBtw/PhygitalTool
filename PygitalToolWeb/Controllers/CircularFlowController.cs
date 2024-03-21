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

    // GET
    public IActionResult StartFLow(int flowId)
    {
        Flow flow = _flowManager.GetFlow(flowId);
        return View("~/Views/SubTheme/SubThemeView.cshtml", flow);
    }

    public IActionResult GetFirstQuestion(int flowId, int subThemeId)
    {
        Question question = _flowManager.GetFirstFlowQuestion(flowId);
        TempData["subThemeId"] = subThemeId;
        return View("~/Views/LinearFlow/QuestionView.cshtml", question);
    }

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

        // Every "x" questions, show a different view.
        if (questionCount == x)
        {
            // Reset counter
            HttpContext.Session.SetInt32("QuestionCount", 0);
            var flowSubTheme = _flowManager.GetFlowSubTheme(flowId, subThemeId);
            TempData["questionId"] = questionId;
            return View("~/Views/SubTheme/SubThemeInformationCircularView.cshtml", flowSubTheme);
        }

        // Show the standard question view.
        TempData["subThemeId"] = subThemeId;
        return View("~/Views/LinearFlow/QuestionView.cshtml", nextQuestion);
    }
    
    public IActionResult EndFlow(int flowId)
    {
        Flow flow = _flowManager.GetFlow(flowId);
        return View("CircularFlowEndView", flow);
    }
}