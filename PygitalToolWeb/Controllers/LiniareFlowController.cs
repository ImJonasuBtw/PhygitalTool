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
        return View("FLowView",flow);
    }
    
    public IActionResult GetNextQuestion(int flowId)
    {
        ICollection<Question> questions = _flowManager.GetFlowQuestions(flowId);
        var flowLenght = questions.Count;
        var testquestion = questions.ElementAt(1);
        return View("QuestionView",testquestion );
    }
    
    
}