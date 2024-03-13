using BL;
using Microsoft.AspNetCore.Mvc;
using Domain;
using Domain.Domain.Flow;
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
        return View("FLowView");
    }

    public IActionResult nextQuestion(int flowId)
    {
        return View("FLowView");
    }
}