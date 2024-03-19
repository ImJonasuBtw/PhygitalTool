using BL;
using Microsoft.AspNetCore.Mvc;
using Domain.FlowPackage;


namespace PygitalToolWeb.Controllers;

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
        return View("CircularFlowView", flow);
    }

    public IActionResult GetFirstQuestion(int flowId)
    {
        Question question = _flowManager.GetFirstFlowQuestion(flowId);
        return View("~/Views/LiniareFlow/QuestionView.cshtml", question);
    }

    public IActionResult GetNextQuestion(int flowId, int questionId)
    {
        Question nextQuestion = _flowManager.GetNextQuestionInFlow(flowId, questionId);
        if (nextQuestion == null)
        {
            Question question = _flowManager.GetFirstFlowQuestion(flowId);
            return View("~/Views/LiniareFlow/QuestionView.cshtml", question);
        }

        return View("~/Views/LiniareFlow/QuestionView.cshtml", nextQuestion);
    }

    public IActionResult EndFlow(int flowId)
    {
        Flow flow = _flowManager.GetFlow(flowId);
        return View("CircularFlowEndView", flow);
    }
}