using BL;
using Microsoft.AspNetCore.Mvc;
using Domain;
using Domain.Domain.Flow;
using Domain.Domain.Util;
using Domain.FlowPackage;

namespace PygitalToolWeb.Controllers;

public class LiniareFlowController : Controller
{
    private readonly IFlowManager _flowManager;
    private readonly ILogger<QuestionController> _logger;


    public LiniareFlowController(IFlowManager flowManager, ILogger<QuestionController> logger)
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