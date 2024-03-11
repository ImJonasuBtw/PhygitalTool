
using BL;
using Domain.Flow;
using Microsoft.AspNetCore.Mvc;

namespace PygitalToolWeb.Controllers;

public class QuestionController : Controller
{
    private readonly IFlowManager _flowManager;
    private readonly ILogger<QuestionController> _logger;

    public QuestionController(ILogger<QuestionController> logger, IFlowManager iflowManager)
    {
        _logger = logger;
        _flowManager = iflowManager;
    }

    public IActionResult SingleChoice(int id)
    {
        Question question = _flowManager.getQuestion(id);
        return View(question);
        
    }
}