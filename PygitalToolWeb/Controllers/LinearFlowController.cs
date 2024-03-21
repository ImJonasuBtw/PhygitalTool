using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL;
using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.Web.Controllers;

public class LinearFlowController : Controller
{
    private readonly IFlowManager _flowManager;
    private readonly ILogger<QuestionController> _logger;


    public LinearFlowController(IFlowManager flowManager, ILogger<QuestionController> logger)
    {
        _flowManager = flowManager;
        _logger = logger;
    }

    // GET
    public IActionResult StartFLow(int flowId)
    {
        Flow flow = _flowManager.GetFlow(flowId);
        return View("~/Views/SubTheme/SubThemeView.cshtml",flow);
    }

    public IActionResult GetFirstQuestion(int flowId)
    {
        Question question = _flowManager.GetFirstFlowQuestion(flowId);
        return View("QuestionView", question);
    }
    
    public IActionResult GetNextQuestion(int flowId , int questionId)
    {
        Question nextQuestion = _flowManager.GetNextQuestionInFlow(flowId, questionId);
        if (nextQuestion == null)
        {
            Flow flow = _flowManager.GetFlow(flowId);
            return View("FlowEndView", flow );
        }
        return View("QuestionView",nextQuestion );
    }
    
    
}